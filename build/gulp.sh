#!/bin/sh
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
gulp $@ --gulpfile $SCRIPT_DIR/build/gulpfile.js

