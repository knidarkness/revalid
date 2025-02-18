#!/bin/sh

# Backup package.json files
cp packages/core/package.json packages/core/package.json.bak
cp packages/respect-core/package.json packages/respect-core/package.json.bak
cp packages/cli/package.json packages/cli/package.json.bak

# Generate timestamp-based version
TIMESTAMP=$(date +%s)
VERSION="0.0.0-snapshot.$TIMESTAMP"

# Build and pack core package
cd packages/core
jq ".version = \"$VERSION\"" package.json > tmp.json && mv tmp.json package.json
core=$(npm pack | tail -n 1)
mv $core ../../openapi-core.tgz
cd ../../

# Update and pack respect-core package
cd packages/respect-core
jq ".version = \"$VERSION\"" package.json > tmp.json && mv tmp.json package.json
jq ".dependencies[\"@redocly/openapi-core\"] = \"file:./openapi-core.tgz\"" package.json > tmp.json && mv tmp.json package.json
respect_core=$(npm pack | tail -n 1)
mv $respect_core ../../respect-core.tgz
cd ../../

# Update and pack cli package
cd packages/cli
jq ".version = \"$VERSION\"" package.json > tmp.json && mv tmp.json package.json
jq ".dependencies[\"@redocly/openapi-core\"] = \"file:./openapi-core.tgz\"" package.json > tmp.json && mv tmp.json package.json
jq ".dependencies[\"@redocly/respect-core\"] = \"file:./respect-core.tgz\"" package.json > tmp.json && mv tmp.json package.json
cli=$(npm pack | tail -n 1)
mv $cli ../../redocly-cli.tgz
cd ../../

# Restore original package.json files
mv packages/core/package.json.bak packages/core/package.json
mv packages/respect-core/package.json.bak packages/respect-core/package.json
mv packages/cli/package.json.bak packages/cli/package.json
