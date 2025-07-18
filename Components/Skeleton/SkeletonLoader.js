import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';

const SkeletonLoader = ({ 
  width = '100%', 
  height = 20, 
  borderRadius = RADIUS.sm,
  style,
  isCircle = false 
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    );
    animation.start();

    return () => animation.stop();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const skeletonStyle = {
    width: isCircle ? height : width,
    height,
    borderRadius: isCircle ? height / 2 : borderRadius,
    backgroundColor: COLORS.border,
  };

  return (
    <Animated.View 
      style={[
        skeletonStyle,
        { opacity },
        style
      ]} 
    />
  );
};

export default SkeletonLoader; 