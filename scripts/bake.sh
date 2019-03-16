#!/bin/bash

docker \
    run -it \
    baker \
    /bin/bash -c '\
        cd ${HOME} && \
        git clone https://github.com/november-yankee/setter-for-catan-tsx.git --branch v0.3.0 --single-branch && \
        cd setter-for-catan-tsx && \
        scripts/build.sh && \
        scripts/package.sh && \
        bash'

    #-v ${HOME}/.ssh:/root/.ssh:ro \
