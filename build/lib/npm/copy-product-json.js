"use strict";
const path = require('path');
const isValid = require('is-valid-path');
const fs = require('fs');


const fileName = 'product.json';

const isProd = (process.env.NODE_ENV === 'production');
const PROJECT_ROOT = path.resolve(__dirname, '../../../');

let targetFolder = path.resolve(PROJECT_ROOT, 'build', isProd ? 'prod' : 'dev');
if (!targetFolder || targetFolder === '') {
    console.error('Target folder could not be resolved.');
    return 1;
}

const resolvedSource = path.join(PROJECT_ROOT, fileName);
const resolvedTarget = path.join(targetFolder, fileName);

if (!isValid(resolvedTarget)) {
    console.error(`${resolvedTarget} is not a valid path.`);
    return 1;
}

if (!fs.existsSync(resolvedSource)) {
    console.error(`Could not find ${fileName}.`);
    return 1;
}

if (!fs.existsSync(targetFolder)) {
    console.error(`Target folder [${targetFolder}] does not exist.`);
    return 1;
}

try {
    console.log();
    console.log(`Copying file from '${resolvedSource}' to '${resolvedTarget}'.`);
    fs.copyFileSync(resolvedSource, resolvedTarget);
} catch (ex) {
    console.error(`Could not copy ${fileName}:`);
    console.error(ex);
}
console.log();
