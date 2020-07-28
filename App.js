import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Audio } from 'expo-av';
import SoundPlayer from './SoundPlayer';
import FlashingView from './FlashingView';
import MoodController from './MoodController';

const WEBSOCKET_URI = "192.168.1.108:5000"  // Change to your server IP

const soundPlayer = new SoundPlayer(Audio);
const moodController = new MoodController(`ws://${WEBSOCKET_URI}/ws`, soundPlayer);

export default function App() {
  const [flashColor, setFlashColor] = useState('transparent');

  useEffect(() => {
    moodController.setFlashColorCb(setFlashColor);
    moodController.start();
    return () => moodController.stop();
  }, []);

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
