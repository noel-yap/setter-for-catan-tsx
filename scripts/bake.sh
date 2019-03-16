#!/bin/bash

version=$1

docker \
    run -it \
    baker \
    /bin/bash -c '\
        cd ${HOME} && \
        git clone https://github.com/november-yankee/setter-for-catan-tsx.git --branch "v${version}" --single-branch && \
        cd setter-for-catan-tsx && \
        scripts/build.sh && \
        scripts/package.sh && \
        bash'

    #-v ${HOME}/.ssh:/root/.ssh:ro \
