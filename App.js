import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Audio } from 'expo-av';
import SoundPlayer from './SoundPlayer';
import FlashingView from './FlashingView';

const soundPlayer = new SoundPlayer(Audio);

const toggleSong = async () => {
  await soundPlayer.toggleSong();
  setTimeout(toggleSong, 6000);
};

export default function App() {
  useEffect(() => {
    const startSounds = async () => {
      await soundPlayer.init();
      await soundPlayer.start();
      setTimeout(toggleSong, 6000);
    };

    startSounds();
  }, []);

  return (
    <View style={styles.container}>
      <FlashingView color="#f00" />
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
