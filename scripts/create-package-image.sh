#!/bin/bash

version=$1

docker build -f Dockerfile.package --build-arg version=${version} --tag "setter-for-catan-${version}.package" .


#docker \
#    run -it \
#    baker.node \
#    /bin/bash -c "\
#        cd /home/root && \
#        git clone https://github.com/november-yankee/setter-for-catan-tsx.git --branch v${version} --single-branch && \
#        cd setter-for-catan-tsx && \
#        scripts/build.sh && \
#        scripts/package.sh && \
#        bash"

    #-v ${HOME}/.ssh:/root/.ssh:ro \
