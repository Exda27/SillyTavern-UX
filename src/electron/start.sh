#!/usr/bin/env bash

# Make sure pwd is the directory of the script
cd "$(dirname "$0")"

echo "Assuming bun is already installed. If you haven't installed it already, do so now"
echo "Installing Electron Wrapper's Bun Modules..."
bun install --production

echo "Starting Electron Wrapper..."
bun run start -- "$@"
