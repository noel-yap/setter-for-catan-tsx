#!/bin/bash -evx

umask 0022

project_name=$(basename $(git remote get-url origin) .git)
project_version=$1
if [ -z "${project_version}" ]
then
  project_version=$(git rev-parse HEAD)
fi

node_ec2_image=$(aws ec2 describe-images --filter Name=name,Values=node-10.5.3 --output text --query 'Images[].ImageId')
security_group_ids=sg-0252c5c7a1eeec1b3

node_ec2_instance=
timeout=60
while [[ -z "${node_ec2_instance}" && ${timeout} -ne 0 ]]
do
  sleep 1
  ((--timeout))

  node_ec2_instance=$(aws ec2 run-instances --image-id "${node_ec2_image}" --count 1 --instance-type t2.micro --security-group-ids "${security_group_ids}" --output text --query 'Instances[].InstanceId')
done
echo "node_ec2_instance = [${node_ec2_instance}]"

if [ -z "${node_ec2_instance}" ]
then
  echo Error: Unable to start node instance. >&2
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

  public_ip_address=$(aws ec2 describe-instances --instance-ids ${node_ec2_instance} --output text --query 'Reservations[].Instances[].PublicIpAddress')
done

echo "public_ip_address = [${public_ip_address}]"

key=~/.ssh/aws.pem
user=ec2-user
while ! scp -o 'StrictHostKeyChecking no' -i ${key} "${artifact}" ${user}@${public_ip_address}:/tmp
do
  sleep 1
done
ssh -o 'StrictHostKeyChecking no' -i ${key} ${user}@${public_ip_address} "cd / && sudo tar -x -f /tmp/${project_name}-${project_version}.tar.gz -p -v -z"

aws ec2 stop-instances --instance-ids ${node_ec2_instance}

timeout=60
while [ "${public_ip_address}" != 'null' -a ${timeout} -ne 0 ]
do
  sleep 1
  ((--timeout))

  public_ip_address=$(aws ec2 describe-instances --instance-ids ${node_ec2_instance} --output text --query 'Reservations[].Instances[].PublicIpAddress')
done

image_id=$(aws ec2 create-image --instance-id ${node_ec2_instance} --name "$(basename ${artifact} .tar.gz)" --output text --query 'ImageId')
echo "image_id = ${image_id}"

