#!/bin/bash

RELEASE_DIR=~/var/remote-heater-server-meteor/

echo "About to install npm dependencies"
npm install --production

echo "Preparing release directory: ${RELEASE_DIR}"
rm -rf ${RELEASE_DIR}
mkdir -p ${RELEASE_DIR}

echo "Building release in: ${RELEASE_DIR}"
meteor build ${RELEASE_DIR} --architecture os.linux.x86_64

echo "Extracting release"
tar -xf $RELEASE_DIR/remote-heater-server-meteor.tar.gz

echo "Cleaning up"
rm $RELEASE_DIR/remote-heater-server-meteor.tar.gz
mv $RELEASE_DIR/bundle/* $RELEASE_DIR/
rm -rf $RELEASE_DIR/bundle/