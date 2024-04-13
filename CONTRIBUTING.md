# Contributing to Bitcoin fees app

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

The following is a set of guidelines for contributing to Bitcoin fees app. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Table of contents

### Setup the development environment

First of all you have to download and extract the Android SDK on your local machine. You can find how to do it in the [official Android documentation](https://developer.android.com/about/versions?hl=es-419).

Once you have it, just run the following commands on the root path of this project:

```shell
# Define `ANDROID_HOME` pointing to the Android SDK folder
$ export ANDROID_HOME=/home/<user>/Android/Sdk

# Move to the root of this project
$ cd bitcoin-fees-app

# Install all dependencies
$ npm install

# Start the development environment
$ npm run android
```

Finally open the project with Visual Studio Code or another IDE/code editor.

### Some extra resources

- [React native](https://reactnative.dev/docs/getting-started)
- [Expo](https://docs.expo.dev/)
- [ReduxJS](https://redux.js.org/usage/)
- [Ionicons](https://ionic.io/ionicons/v4/cheatsheet.html)

```shell
$ npm run start
```

### Debugging

```shell
# With the simulator running
$ cd $ANDROID_HOME/platform-tools
$ ./adb logcat
```
