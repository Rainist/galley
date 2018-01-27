#!/usr/bin/env bash

set -e

npm run build
cd dist
zip dist.zip index.html index.js
cd ../
mv dist/dist.zip ./
git checkout gh-pages
unzip -o dist.zip -d ./

echo "if building went ok, then you can commit and release it by pushing it to 'gh-pages' branch."

