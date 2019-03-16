#!/bin/bash

cd $(git rev-parse --show-toplevel)

npm install
npm run build

