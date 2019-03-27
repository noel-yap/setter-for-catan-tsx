#!/bin/bash -evx

if [[ "$(id -u)" != '0' || -z "$(id -u ec2-user 2>/dev/null)" || -z "${PROJECT_NAME}" || -z "${PROJECT_VERSION}" ]]
then
  project_name=$(basename $(git remote get-url origin) .git)
  project_version=$1
  if [ -z "${project_version}" ]
  then
    project_version=$(git rev-parse HEAD)
  fi

  docker run \
      -i \
      -v $(git rev-parse --show-toplevel):/home/ec2-user/${project_name} \
      -e PROJECT_NAME=${project_name} \
      -e PROJECT_VERSION=${project_version} \
      packager.node \
      /bin/bash -c "/home/ec2-user/${project_name}/scripts/package.sh"
else
  project_dir="/home/ec2-user/${PROJECT_NAME}"
  package_dir="${project_dir}/package"
  
  rm -rf ${package_dir} &&
      mkdir -p ${package_dir}
  
  mkdir -p ${package_dir}/root/{home,opt}

  cp -r ${project_dir}/root/* ${package_dir}/root
  cp -r ${project_dir}/build ${package_dir}/root/opt/${PROJECT_NAME}
  
  chown -R root:root ${package_dir}/root/*
  chmod -R o+r ${package_dir}/root
  find ${package_dir}/root -type d | xargs chmod o+x
  
  mkdir -p ${package_dir}/root/home/ec2-user/.nvm
  npm install --prefix=${package_dir}/root/home/ec2-user/.nvm/versions/node/v10.15.3/ -g serve
  
  chown -R ec2-user:ec2-user ${package_dir}/root/home/ec2-user
  
  cd ${package_dir}/root && tar -c -f ${PROJECT_NAME}-${PROJECT_VERSION}.tar.gz -p -v -z *
  echo "${package_dir}/root/${PROJECT_NAME}-${PROJECT_VERSION}.tar.gz" | sed -e "s|${project_dir}||"
fi
