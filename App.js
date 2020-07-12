import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Audio } from 'expo-av';
import pianoHorror from './assets/mixkit-piano-horror-671.mp3';
import FlashingView from './FlashingView';

const soundObject = new Audio.Sound();


export default function App() {
  useEffect(() => {
    const playSound = async () => {
      try {
        await soundObject.loadAsync(pianoHorror);
        await soundObject.playAsync();
        // Your sound is playing!
      } catch (error) {
        // An error occurred!
        console.log(error);
      }
    };

    playSound();
  });

  return (
    <View style={styles.container}>
      <FlashingView style={styles.animated}>
      </FlashingView>
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
  animated: {
    flex: 1,
    backgroundColor: '#f00',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
