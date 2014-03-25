# !/bin/bash
# set up node.js.

sudo apt-get install python-software-properties
sudo apt-add-repository ppa:chris-lea/node.js
sudo apt-get update

sudo apt-get install nodejs

echo 'current version of node.js:'
node -v

echo 'current version of npm:'
npm -v
