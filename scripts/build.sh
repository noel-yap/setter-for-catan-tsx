#!/bin/bash

cd $(git rev-parse --show-toplevel 2>/dev/null || echo $(dirname $0)/..)

npm install
npm run build

