import React, { useEffect, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Audio } from 'expo-av';
import SoundPlayer from './SoundPlayer';
import FlashingView from './FlashingView';
import MoodController from './MoodController';

const soundPlayer = new SoundPlayer(Audio);
const moodController = new MoodController("ws://192.168.1.189:5000/ws");


export default function App() {
  const [flashColor, setFlashColor] = useState('transparent');

  const toggleMode = useCallback(async () => {
    const newFlashColor = (flashColor === "transparent") ? "#f00" : "transparent";
    setFlashColor(newFlashColor);
    await soundPlayer.toggleSong();
  }, [flashColor]);

  useEffect(() => {
    const startSounds = async () => {
      await soundPlayer.init();
      await soundPlayer.start();
      moodController.connect();
    };

    startSounds();

    return async () => {
      await soundPlayer.stop();
      moodController.close();
    };
  }, []);

  useEffect(() => {
    moodController.setToggleModeCallback(toggleMode);
  }, [toggleMode])

  return (
    <View style={styles.container}>
      <FlashingView color={flashColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
});
