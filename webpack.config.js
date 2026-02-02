import process from 'node:process';
import path from 'node:path';
import webpack from 'webpack';
import { serverDirectory } from './src/server-directory.js';

/**
 * Get the Webpack configuration for the public/lib.js file.
 * 1. Local environments use the global DATA_ROOT variable to determine the cache and output directories.
 * 2. Force-dist mode uses the repository dist folder for cache and output directories.
 * @param {boolean} forceDist Whether to force the use the /dist folder.
 * @returns {import('webpack').Configuration}
 * @throws {Error} If the DATA_ROOT variable is not set.
 * */
export default function getPublicLibConfig(forceDist = false) {
    function getCacheDirectory() {
        if (forceDist) {
            return path.resolve(process.cwd(), 'dist', '_webpack', webpack.version, 'cache');
        }

        if (typeof globalThis.DATA_ROOT === 'string') {
            return path.resolve(globalThis.DATA_ROOT, '_webpack', webpack.version, 'cache');
        }

        throw new Error('DATA_ROOT variable is not set.');
    }

    function getOutputDirectory() {
        if (forceDist) {
            return path.resolve(process.cwd(), 'dist', '_webpack', webpack.version, 'output');
        }

        if (typeof globalThis.DATA_ROOT === 'string') {
            return path.resolve(globalThis.DATA_ROOT, '_webpack', webpack.version, 'output');
        }

        throw new Error('DATA_ROOT variable is not set.');
    }

    const cacheDirectory = getCacheDirectory();
    const outputDirectory = getOutputDirectory();

    return {
        mode: 'production',
        entry: path.join(serverDirectory, 'public/lib.js'),
        cache: {
            type: 'filesystem',
            cacheDirectory: cacheDirectory,
            store: 'pack',
            compression: 'gzip',
        },
        devtool: false,
        watch: false,
        module: {},
        stats: {
            preset: 'minimal',
            assets: false,
            modules: false,
            colors: true,
            timings: true,
        },
        experiments: {
            outputModule: true,
        },
        performance: {
            hints: false,
        },
        output: {
            path: outputDirectory,
            filename: 'lib.js',
            libraryTarget: 'module',
        },
    };
}
