@echo off
pushd %~dp0
call bun install --production
bun run start server.js %*
pause
popd
