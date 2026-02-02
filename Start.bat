@echo off
pushd %~dp0
set NODE_ENV=production
call bun install --production
bun server.js %*
pause
popd
