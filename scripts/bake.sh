#!/bin/bash -evx

version=$1

image_id=02485d266f742e8b2
security_group_ids=0252c5c7a1eeec1b3

instance_ids=$(aws ec2 run-instances --image-id "ami-${image_id}" --count 1 --instance-type t2.micro --security-group-ids "sg-${security_group_ids}" | jq '.Instances[].InstanceId' | sed -e 's|"||g')
echo "instance_ids = ${instance_ids}"

$(dirname $0)/build.sh
artifact=$($(dirname $0)/package.sh ${version} | tail -n 1)
echo "artifact = ${artifact}"

timeout=60
while [ -z "${public_ip_address}" -a ${timeout} -ne 0 ]
do
  sleep 1
  ((--timeout))

  public_ip_address=$(aws ec2 describe-instances --instance-ids ${instance_ids} | jq '.Reservations[].Instances[].PublicIpAddress' | sed -e 's|"||g')
done

echo "public_ip_address = ${public_ip_address}"

key=~/.ssh/aws.pem
user=ec2-user
while ! scp -o 'StrictHostKeyChecking no' -i ${key} "${artifact}" ${user}@${public_ip_address}:/tmp
do
  sleep 1
done
ssh -o 'StrictHostKeyChecking no' -i ${key} ${user}@${public_ip_address} "cd / && gzip -cdq tmp/$(basename ${artifact}) | sudo tar xfpv -"

aws ec2 stop-instances --instance-ids ${instance_ids}

timeout=60
while [ "${public_ip_address}" != 'null' -a ${timeout} -ne 0 ]
do
  sleep 1
  ((--timeout))

  public_ip_address=$(aws ec2 describe-instances --instance-ids ${instance_ids} | jq '.Reservations[].Instances[].PublicIpAddress' | sed -e 's|"||g')
done

image_id=$(aws ec2 create-image --instance-id ${instance_ids} --name "$(basename ${artifact} .tar.gz)" | jq '.ImageId' | sed -e 's|"||g')
echo "image_id = ${image_id}"

