# Getting Started with Create ScandiPWA App

This package contains new ScandiPWA theme sources. Your parent theme is `@scandipwa/scandipwa`.

## Installation

Before you start, make sure to install package dependencies.

To do this, use `yarn` command.

### Recommended packages

For the best expirience, install `scandipwa-cli` package globally. To do this, run:

```bash
npm i -g scandipwa-cli
```

## Available Commands

### `yarn start`

Starts the development server (http://localhost:3000/).

**Features**:

- The page will automatically reload if you make any code changes.
- You will also see the build errors and lint warnings in the console.

### `yarn build`

Bundles the app into static files for production.

> **Note**: To bundle your application as a valid Magento 2 theme use `--magento` option.

**Features**:

- The build is minified and the filenames include the hashes.
- The build is optimized for the best performance

## Extensions

To install a ScandiPWA extension, run the following command:

```bash
scandipwa extension <EXTENSION NAME>
```

> **Note**: to create new extension add `--create` option after the command. This will create a new extension package under `packages` folder.

### Note

* Files need to strictly follow eslint to be able to compile (a.k.a Please use eslint)
* Change `proxy` field in `package.json` to your backend.
