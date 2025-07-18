import React from 'react';
import {View, StyleSheet} from 'react-native';

const CustomGradient = ({
  colors = ['#5DADE2', '#2E86C1'],
  direction = 'diagonal', // 'horizontal', 'vertical', 'diagonal'
  style,
  children,
  ...props
}) => {
  // Create gradient effect using multiple overlapping layers
  const createGradientLayers = () => {
    const layers = [];
    const colorCount = colors.length;

    // Create base layer with first color
    layers.push(
      <View
        key="base"
        style={[StyleSheet.absoluteFillObject, {backgroundColor: colors[0]}]}
      />,
    );

    // Create overlapping layers for gradient effect
    for (let i = 1; i < colorCount; i++) {
      const opacity = 0.7 - i * 0.1; // Decreasing opacity for each layer

      let layerStyle = {
        backgroundColor: colors[i],
        opacity: opacity,
      };

      // Position layers based on direction
      switch (direction) {
        case 'horizontal':
          layerStyle = {
            ...layerStyle,
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            left: `${(i / colorCount) * 100}%`,
          };
          break;

        case 'vertical':
          layerStyle = {
            ...layerStyle,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: `${(i / colorCount) * 100}%`,
          };
          break;

        case 'diagonal':
        default:
          layerStyle = {
            ...layerStyle,
            position: 'absolute',
            right: 0,
            bottom: 0,
            left: `${(i / colorCount) * 50}%`,
            top: `${(i / colorCount) * 50}%`,
          };
          break;
      }

      layers.push(<View key={`layer-${i}`} style={layerStyle} />);
    }

    // Add a subtle overlay for premium feel
    layers.push(
      <View
        key="overlay"
        style={[
          StyleSheet.absoluteFillObject,
          {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          },
        ]}
      />,
    );

    return layers;
  };

  return (
    <View style={[styles.container, style]} {...props}>
      {createGradientLayers()}

      {/* Content container */}
      <View style={styles.contentContainer}>{children}</View>
    </View>
  );
};

// Enhanced gradient with animation effect
const PremiumGradient = ({
  colors = ['#5DADE2', '#2E86C1'],
  direction = 'diagonal',
  style,
  children,
  animated = false,
  ...props
}) => {
  if (animated) {
    // For animated gradients, we can add multiple shifting layers
    return (
      <View style={[styles.container, style]} {...props}>
        {/* Base gradient */}
        <CustomGradient
          colors={colors}
          direction={direction}
          style={StyleSheet.absoluteFillObject}
        />

        {/* Animated shimmer overlay */}
        <View style={[StyleSheet.absoluteFillObject, styles.shimmer]} />

        {/* Content */}
        <View style={styles.contentContainer}>{children}</View>
      </View>
    );
  }

  return (
    <CustomGradient
      colors={colors}
      direction={direction}
      style={style}
      {...props}>
      {children}
    </CustomGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  contentContainer: {
    flex: 1,
    zIndex: 10, // Ensure content is above gradient layers
  },
  shimmer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    opacity: 0.3,
  },
});

export default PremiumGradient;
export {CustomGradient};
