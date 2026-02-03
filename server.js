#!/usr/bin/env bun
import { spawnSync } from 'node:child_process';
import { CommandLineParser } from './src/command-line.js';
import { serverDirectory } from './src/server-directory.js';

if (typeof Bun === 'undefined') {
    const bunRun = spawnSync('bun', [process.argv[1], ...process.argv.slice(2)], {
        stdio: 'inherit',
        env: process.env,
    });

    if (bunRun.error) {
        console.error('Bun is required to run this server. Please install it from https://bun.sh/.', bunRun.error);
    }

    process.exit(bunRun.status ?? 1);
}

const runtimeLabel = typeof Bun !== 'undefined' ? `Bun ${Bun.version}` : `Node ${process.version}`;
console.log(`Runtime: ${runtimeLabel}. Running in ${process.env.NODE_ENV} environment. Server directory: ${serverDirectory}`);

// config.yaml will be set when parsing command line arguments
const cliArgs = new CommandLineParser().parse(process.argv);
globalThis.DATA_ROOT = cliArgs.dataRoot;
globalThis.COMMAND_LINE_ARGS = cliArgs;
process.chdir(serverDirectory);

try {
    await import('./src/server-main.js');
} catch (error) {
    console.error('A critical error has occurred while starting the server:', error);
}
