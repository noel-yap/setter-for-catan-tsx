#!/bin/bash

project_name=setter-for-catan

version=$1
if [ -z "${version}" ]
then
  version=$(git rev-parse HEAD)
fi

build_dir="$(git rev-parse --show-toplevel)/tmp"

mkdir -p ${build_dir}
cd ${build_dir}

mkdir -p root/opt
cp -pr ${build_dir}/../build root/opt/${project_name}
cp -pr ${build_dir}/../root/* root

cd root && tar cfpv - * | gzip -f - > ../${project_name}-${version}.tar.gz
echo "${build_dir}/${project_name}-${version}.tar.gz"
