# Bitcoin fees app

**Monitor Bitcoin network fees and set custom alerts on your phone!**

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/aea1d6a79672480dbc660fb354aa2cd0)](https://app.codacy.com/gh/reverse-hash/bitcoin-fees-app/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

![Bitcoin fees app running on phones](./.doc/assets/bitcoin-fees-app-phones.png)

## Development

### Initial setup

First of all you have to download and extract the Android SDK on your local machine. You can find how to do it in the [official Android documentation](https://developer.android.com/about/versions?hl=es-419).

Once you have it, just run the following commands on the root path of this project:

```shell
# Define `ANDROID_HOME` pointing to the Android SDK folder
$ export ANDROID_HOME=/home/<user>/Android/Sdk

# Install all dependencies
$ npm run install

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

## Debugging

```shell
# With the simulator running
$ cd $ANDROID_HOME/platform-tools
$ ./adb logcat
```
