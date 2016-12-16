#!/bin/bash

# Required env. var.:
#   MONGO_URL (example: mongodb://user:password@host:port/databasename)
#   ROOT_URL (example: http://example.com)

# Optional env. var:
#   MAIL_URL (example: smtp://user:password@mailhost:port/)

if [ -z $1 ]; then
    echo "[ERROR] Missing required parameter: release directory"
    echo "  Usage: ./build-release.sh /release/directory/path"
    exit 1
fi;

RELEASE_DIR=$1

printf "\nCreating logs directory: ${RELEASE_DIR}/logs"
mkdir -p ${RELEASE_DIR}/logs

LOG_FILE=${RELEASE_DIR}/logs/`date +%Y-%m-%d_%H:%M.log`
printf "\n\nCreating log file: ${LOG_FILE}"

printf "\n\nEntering release directory"
pushd $RELEASE_DIR
(cd programs/server && npm install)
node main.js 2>&1 | tee ${LOG_FILE}  
popd
