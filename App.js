import { StatusBar } from 'expo-status-bar';
import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Audio } from 'expo-av';
import pianoHorror from './assets/mixkit-piano-horror-671.mp3';

const soundObject = new Audio.Sound();

const FlashingView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const flash = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(
            fadeAnim,
            {
              toValue: 1,
              duration: 1000,
              useNativeDriver: false,
            }
          ),
          Animated.timing(
            fadeAnim,
            {
              toValue: 0,
              duration: 1000,
              useNativeDriver: false,
            }
          ),
        ])
      ).start();
    };

    flash();
  }, [fadeAnim])

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,
      }}
    >
      {props.children}
    </Animated.View>
  );
}

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
