#!/bin/bash

RELEASE_DIR=/tmp/remote-heater-server-release/

echo "About to install npm dependencies"
npm install --production

echo "Preparing release directory: ${RELEASE_DIR}"
rm -rf ${RELEASE_DIR}
mkdir ${RELEASE_DIR}

echo "Building release in: ${RELEASE_DIR}"
meteor build ${RELEASE_DIR} --architecture os.linux.x86_64