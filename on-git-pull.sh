#!/bin/bash

function log {
    echo $1 #| tee -a ${LOG_FILE}
}

RELEASE_DIR=~/var/remote-heater-server

log "About to kill <<Mongo DB>>"
kill $(ps aux | grep -v "grep" | grep "mongod" | awk '{print $2}')

log "About to kill <<Remote Heater Server>>"
kill $(ps aux | grep -v "grep" | grep "remote-heater-server" | awk '{print $2}')

log "About to build new version of <<Remote Heater Server>> in ${RELEASE_DIR}"
./build-release.sh ${RELEASE_DIR}

log "About to run <<Mongo DB>>"
~/bin/mongod-start.sh
sleep 10

log "About to run <<Remote Heater Server>>"
PORT=3001 MONGO_URL=mongodb://localhost:27017/remote-heater-server ROOT_URL=http://blue-cloud-001.lofatsoftware.com ./run-release.sh ${RELEASE_DIR} &
