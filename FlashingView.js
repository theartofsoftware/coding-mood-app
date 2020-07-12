import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

function FlashingView(props) {
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

FlashingView.propTypes = {
  style: PropTypes.object,
  children: PropTypes.object,
};

export default FlashingView;
