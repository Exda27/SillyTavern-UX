#!/usr/bin/env bun
import { CommandLineParser } from './src/command-line.js';
import { serverDirectory } from './src/server-directory.js';

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
