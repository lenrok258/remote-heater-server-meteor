#!/bin/bash

#RELEASE_DIR=`echo ~`/var/remote-heater-server-meteor/

if [ -z $1 ]; then
    echo "[ERROR] Missing required parameter: release directory"
    echo "  Usage: ./build-release.sh /release/directory/path"
    exit 1
fi;

RELEASE_DIR=$1

echo "About to install npm dependencies"
npm install --production

echo "Preparing release directory: ${RELEASE_DIR}"
rm -rf ${RELEASE_DIR}
mkdir -p ${RELEASE_DIR}

echo "Building release in: ${RELEASE_DIR}"
echo "METEOR: `which meteor`"
/usr/local/bin/meteor build ${RELEASE_DIR} --architecture os.linux.x86_64 2>&1

echo "Extracting release"
tar -xf $RELEASE_DIR/remote-heater-server-meteor.tar.gz -C $RELEASE_DIR

echo "Cleaning up"
rm $RELEASE_DIR/remote-heater-server-meteor.tar.gz
mv $RELEASE_DIR/bundle/* $RELEASE_DIR/
rm -rf $RELEASE_DIR/bundle/