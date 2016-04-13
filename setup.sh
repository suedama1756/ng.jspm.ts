#!/bin/sh
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
export PATH=$PATH:$SCRIPT_DIR/node_modules/.bin

if [ "$1" = "install" ]; then
  npm install
  jspm install
  typings install
fi

exec /bin/bash
