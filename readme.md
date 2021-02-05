# Notes app

Simple notes app created with React Native. The goal of making this project was to learn React Native and Typescript, as I hadn't had any expirience with these technologies before.

Created for Android.

## Technologies used

- React Native
- Typescript

## Launch

Clone the repo:

```sh
$ git clone https://github.com/aqfgit/notes.git
$ cd notes
```

To run the app in development mode:

```sh
$ npm install
$ npm start
```

This will start Metro bundler

Now, you need to run the app on the device plugged through the USB cable or on the Android emulator (see [React Native docs](https://reactnative.dev/docs/environment-setup) for detailed setup). Run this command in a seperate console prompt:

```sh
$ npm run android
```

## Features

### Notes screen:

- List of notes synced up with AsyncStorage
- Button for adding a new note
- Hold your finger on any of the list items to trigger the deletion mode. You can delete only chosen item, or all of them, if you use the 'Select all' + 'Delete' button combination.
- By tapping any of the list items you will be navigated to the individual note page

### Note screen:

- If adding a new note, you can save it to the list or cancel the operation if the note is empty
- You can edit and delete the current note
