import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Audio } from 'expo-av';
import pianoHorror from './assets/mixkit-piano-horror-671.mp3';
import FlashingView from './FlashingView';

const soundObject = new Audio.Sound();

const toggleColor = (prevColor, setFlashColor) => {
  setFlashColor((prevColor === "#f00") ? "transparent" : "#f00");
};

export default function App() {
  const [ flashColor, setFlashColor ] = useState('#f00');

  useEffect(() => {
    const playSound = async () => {
      await Audio.setAudioModeAsync(
        {
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        },
      );

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
      <FlashingView color={flashColor}>
        <Button
          onPress={() => toggleColor(flashColor, setFlashColor)}
          title="TOGGLE COLORS"
        />
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
});
