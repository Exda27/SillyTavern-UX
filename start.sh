#!/usr/bin/env bash

# Make sure pwd is the directory of the script
cd "$(dirname "$0")"

if ! command -v bun &> /dev/null
then
    echo -e "\033[0;31mbun could not be found in PATH. If the startup fails, please install bun from https://bun.sh/\033[0m"
fi

echo "Installing Bun Modules..."
export NODE_ENV=production
bun i --no-save --no-audit --no-fund --loglevel=error --no-progress --omit=dev

echo "Entering SillyTavern..."
bun "server.js" "$@"
