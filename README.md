# Getting Started with Create ScandiPWA App

This package contains new ScandiPWA theme sources. Your parent theme is `@scandipwa/scandipwa`.

## Installation

Before you start, make sure to install package dependencies.

To do this, use `yarn` command.

### Recommended packages

For the best experience, install `scandipwa-cli` package globally. To do this, run:

```bash
npm i -g scandipwa-cli
```

## Available Scripts

### `yarn start`

Starts the development server.

**Features**:

- The page will reload if you make edits.
- You will also see any lint errors in the console.

### `yarn build`

Bundles the app into static files for production.

> **Note**: To bundle your application as valid Magento 2 theme use `--magento` option.

**Features**:

- The build is minified and the filenames include the hashes.
- The build is optimized for the best performance

## Extensions

To install an extension, run following command:

```bash
scandipwa extension <EXTENSION NAME>
```

> **Note**: to create new extension add `--create` option after the command. This will create a new extension package under `packages` folder.

### Note

* Files need to ~~strictly follow eslint~~ to be able to compile (currently disable strict eslint, but you should still
  follow style rules)
* Change `proxy` field in `package.json` to your backend.
* All the code for this extension resides in __packages/scandi-smpagebuilder__, which will be used to install.
  Therefore, only add code to __packages/scandi-smpagebuilder__ folder.
* Extension works by [overriding components](https://docs.create-scandipwa-app.com/extensions/application-plugins).
