# Coding Mood Mobile App

*It plays horror music when your code breaks, and upbeat music when it works.*

Demo video here: https://youtu.be/1LKTrZamxZk

This is the code for the mobile app used in the Coding Mood solution.

Writing code is a very jarring experience. Regardless of whether or not your code works or everything is broken, the same music plays. We don't let this happen in movies, so why let it happen when we code? My app, "Coding Mood" solves this problem.

My solution is a combination of Javascript and Python, with the use of websockets!

## Setup

You'll need to have Expo installed. Use the following command:

```bash
> npm install -g expo-cli
```

You will need to manually configure a couple of things first.

1. Set `WEBSOCKET_URI` in `App.js` to be the IP and port where you will run the Coding Mood server. This is how the app will connect to receive new state whenever the state of your code changes.
2. Pick some music and put it inside the `assets` folder. You will need one track to play when everything is going well, one for when your code is broken, and another one to motivate you as you fix everything. You will need to edit `SoundPlayer.js` to import your audio files, by tweaking the following imports:

```javascript
import pianoHorror from './assets/mixkit-piano-horror-671.mp3';
import upbeatSong from './assets/ash-wednesday.mp3';
import epicMusic from './assets/epic-music.mp3';
```

## Running the App

I would recommend firing up the server before you start the app. Visit this repo for the server source: https://github.com/theartofsoftware/coding-mood-server

To start the packager:

```bash
> npm start
```

Expo will package the code and produce a QR code. Install the Expo app on your phone and scan this QR code to run the code.

The app will immediately try to connect to your server using websockets. If it fails, it will keep retrying until it succeeds.
