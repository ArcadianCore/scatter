/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const cp = require('child_process');
const path = require('path');
const fs = require('fs');
const yarn = process.platform === 'win32' ? 'yarn.cmd' : 'yarn';

// console.log('post-install:');

/**
 * @param {string} location
 * @param {*} [opts]
 */
function yarnInstall(location, opts) {
    opts = opts || {};
    opts.cwd = location;
    opts.stdio = 'inherit';

    const raw = process.env['npm_config_argv'] || '{}';
    const argv = JSON.parse(raw);
    const original = argv.original || [];
    const args = ['install'];

    if (original.indexOf('--ignore-optional') > -1) {
        args.push('--ignore-optional');
    }

    console.log('Installing dependencies in \'%s\'.', location);
    const result = cp.spawnSync(yarn, args, opts);

    if (result.error || result.status !== 0) {
        process.exit(1);
    }
}

function installExtensionBuildDependencies() {
    yarnInstall('extensions'); // node modules shared by all extensions

    const allExtensionFolders = fs.readdirSync('extensions');
    const extensions = allExtensionFolders.filter(e => {
        try {
            let packageJSON = JSON.parse(fs.readFileSync(path.join('extensions', e, 'package.json')).toString());
            return packageJSON && (packageJSON.dependencies || packageJSON.devDependencies);
        } catch (e) {
            return false;
        }
    });

    extensions.forEach(extension => yarnInstall(`extensions/${extension}`));
}

/**
 * Installs the dependencies of the build/lib/watch for the system-installed node, since that is the driver for gulp
 */
function yarnInstallBuildDependencies() {
    //@ts-ignore
    const env = Object.assign({}, process.env);
    const watchPath = path.join(path.dirname(__dirname), 'watch');
    const yarnrcPath = path.join(watchPath, '.yarnrc');

    const disturl = 'https://nodejs.org/download/release';
    const target = process.versions.node;
    const runtime = 'node';

    const yarnrc = `disturl "${disturl}"
target "${target}"
runtime "${runtime}"`;

    fs.writeFileSync(yarnrcPath, yarnrc, 'utf8');
    yarnInstall(watchPath, { env });
}

const extensionsFolder = path.join('extensions');
if (fs.existsSync(extensionsFolder)) {
    console.log('Installing common build dependencies for extensions');
    installExtensionBuildDependencies();
}

// yarnInstall(`build`); // node modules required for build
// yarnInstall('test/smoke'); // node modules required for smoketest
yarnInstallBuildDependencies(); // node modules for watching, specific to host node version, not electron

// Remove the windows process tree typings as this causes duplicate identifier errors in tsc builds
const processTreeDts = path.join('node_modules', 'windows-process-tree', 'typings', 'windows-process-tree.d.ts');
if (fs.existsSync(processTreeDts)) {
    console.log('Removing windows-process-tree.d.ts');
    fs.unlinkSync(processTreeDts);
}

// console.log('post-install: complete');
