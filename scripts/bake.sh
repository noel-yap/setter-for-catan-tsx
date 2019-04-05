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

aws s3 cp "${artifact}" s3://setter-for-catan --storage-class REDUCED_REDUNDANCY
