#!/bin/bash

version=$1
if [ -z "${version}" ]
then
  version=$(git rev-parse HEAD)
fi

build_dir="$(git rev-parse --show-toplevel)/tmp"

mkdir -p ${build_dir}
cd ${build_dir}

rm -rf setter-for-catan
mkdir -p setter-for-catan/DEBIAN

cat <<EOF >setter-for-catan/DEBIAN/control
Package: setter-for-catan
Version: ${version}
Maintainer: Noel Yap
Architecture: all
Description: Settlers of Catan board generator
EOF

mkdir -p setter-for-catan/home/ec2-user/setter-for-catan
cp -pr ${build_dir}/../build setter-for-catan/home/ec2-user/setter-for-catan
cp -pr ${build_dir}/../root/* setter-for-catan

dpkg-deb --build setter-for-catan
