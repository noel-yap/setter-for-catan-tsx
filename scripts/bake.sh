#!/bin/bash -evx

umask 0022

project_name=$(basename $(git remote get-url origin) .git)
project_version=$1
if [ -z "${project_version}" ]
then
  project_version=$(git rev-parse HEAD)
fi

image_id=02485d266f742e8b2
security_group_ids=0252c5c7a1eeec1b3

instance_ids=$(aws ec2 run-instances --image-id "ami-${image_id}" --count 1 --instance-type t2.micro --security-group-ids "sg-${security_group_ids}" | jq '.Instances[].InstanceId' | sed -e 's|"||g')
echo "instance_ids = [${instance_ids}]"

if [ -z "${instance_ids}" ]
then
  echo Error
  aws ec2 run-instances --image-id "ami-${image_id}" --count 1 --instance-type t2.micro --security-group-ids "sg-${security_group_ids}"
  exit 1
fi

$(dirname $0)/build.sh
artifact=$(git rev-parse --show-toplevel)/$($(dirname $0)/package.sh ${project_version} | tail -n 1)
echo "artifact = [${artifact}]"

if [ ! -e "${artifact}" ]
then
  echo "Packaging failed" >&2
  exit 1
fi

timeout=60
while [[ -z "${public_ip_address}" && ${timeout} -ne 0 ]]
do
  sleep 1
  ((--timeout))

  public_ip_address=$(aws ec2 describe-instances --instance-ids ${instance_ids} | jq '.Reservations[].Instances[].PublicIpAddress' | sed -e 's|"||g')
done

echo "public_ip_address = [${public_ip_address}]"

key=~/.ssh/aws.pem
user=ec2-user
while ! scp -o 'StrictHostKeyChecking no' -i ${key} "${artifact}" ${user}@${public_ip_address}:/tmp
do
  sleep 1
done
ssh -o 'StrictHostKeyChecking no' -i ${key} ${user}@${public_ip_address} "cd / && sudo tar -x -f /tmp/${project_name}-${project_version}.tar.gz -p -v -z"

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

