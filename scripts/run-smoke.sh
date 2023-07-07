#!/bin/bash


cd ../__tmp__

echo "NPM version:"
npm -v
echo

echo "Directory content:"
ls -a
echo

rm -rf node_modules package-lock.json yarn.lock

npm i redocly-cli.tgz

npm run l
npm run b
npm run d

