# Building and Testing Scatter

This document describes how to set up your development environment to build and test Scatter.
It also explains the basic mechanics of using `git`, `node`, and `npm`.

- [Building and Testing Scatter](#building-and-testing-scatter)
  - [Prerequisite Software](#prerequisite-software)
  - [Getting the Sources](#getting-the-sources)
  - [Installing NPM Modules](#installing-npm-modules)
  - [Add the Aliases to your Development Profile (optional)](#add-the-aliases-to-your-development-profile-optional)
  - [Building](#building)
  - [Packaging](#packaging)
  - [Running Tests Locally](#running-tests-locally)
  - [Linting/verifying your source code](#lintingverifying-your-source-code)
  - [Pre-Commit Requirements](#pre-commit-requirements)
    - [Validation Script](#validation-script)
      - [Overview](#overview)
      - [BUILD](#build)
      - [EXECUTE TESTS](#execute-tests)
      - [PACKAGE](#package)

See the [contribution guidelines](https://github.com/ArcadianCore/scatter/src/master/CONTRIBUTING.md)
if you'd like to contribute to Scatter.

## Prerequisite Software

Before you can build and test Scatter, you must install and configure the
following products on your development machine:

- [Git](http://git-scm.com) which is a distributed version control system.

- [Node.js](http://nodejs.org), (version specified in the engines field of [`package.json`](../package.json)) which is used to run a development web server,
  run tests, and generate distributable files.

- [Yarn](https://yarnpkg.com) (version specified in the engines field of [`package.json`](../package.json)) which is used to install dependencies.

- (optional) a nice visual interface between you and Git, like [Fork](https://fork.dev), or [SourceTree](https://www.sourcetreeapp.com/).

## Getting the Sources

Fork and clone the Scatter repository:

1. Login to your GitHub account or create one by following the instructions given
   [here](https://github.com/join).
2. [Fork](https://confluence.atlassian.com/bitbucket/forking-a-repository-221449527.html) the [main Scatter
   repository](https://github.com/ArcadianCore/scatter).
3. Clone your fork of the Scatter repository and define an `upstream` remote pointing back to
   the Scatter repository that you forked in the first place.

```shell
# Clone your Git repository:
git clone https://github.com/ArcadianCore/scatter.git

# Go to the Scatter directory:
cd scatter

# Add the main Scatter repository as an upstream remote to your repository:
git remote add upstream https://github.com/ArcadianCore/scatter.git
```

## Installing NPM Modules

Next, install the JavaScript modules needed to build and test Scatter:

```shell
# Install Scatter project dependencies (package.json)
yarn install
```

## Add the Aliases to your Development Profile (optional)

The aliases are a set of terminal shortcuts (shell aliases or batch files) to quick-start various regularly-used commands.

- macOS
  - Add `aliases.sh` to your profile script (`.bashrc`, `.zshrc`, etc.).
  
- Windows
  - The aliases exist as batch files in the root directory of the project.

>I haven't found a better way to do aliases on Windows yet.
>
>Maybe I'll make a heavy doskey script and describe adding it to the Command Processor autorun registry key.

## Building

From the project root folder, run the `build` script using either the npm script:

```shell
npm run build
```

or you can call the alias (which will call the npm script for you):

```shell
build
```

Scatter should build successfully!

## Packaging

To package Scatter, run:

```shell
npm run package
```

or you can call the alias (which will call the npm script for you):

```shell
pack
```

- The library is packaged and placed in the `./dist/` folder.

## Running Tests Locally

To run tests:

```shell
test
```

You should execute the full test suite before submitting a PR to Bitbucket.

## Linting/verifying your source code

You can check that your code is properly formatted and adheres to coding style by running:

``` shell
lint
```

## Pre-Commit Requirements

The Scatter repository is expected to be in a constantly-green state (builds always succeeding, tests always passing).
In order to facilitate this, the following exit criteria must be fulfilled before committing:

* Buid is successful
* All Tests Passing
* Packages into a single js file

### Validation Script

Before each commit, you are expected to validate your code using the following script.

Each expectation below must be met before moving on to the next step.

#### Overview

| step          | script(s) |
| ------------- | --------- |
| Build         | `build`   |
| Execute Tests | `test`    |
| Package       | `pack`    |

#### BUILD

**in a terminal window** -> `npm run build` (or just `build`)

- **EXPECTED RESULT**: Application opens.
- **EXPECTED RESULT**: Dev tools console says 'development mode'.

#### EXECUTE TESTS

**in a terminal window** -> `npm run test` (or just `test`)  

- **EXPECTED RESULT**: Unit tests execute.
- **EXPECTED RESULT**: All tests PASS.

#### PACKAGE

**in a terminal window** -> `npm run package` (or just `pack`)

- **EXPECTED RESULT**: Library is built for the correct architecture
- **EXPECTED RESULT**: Library resides in the appropriate folder
