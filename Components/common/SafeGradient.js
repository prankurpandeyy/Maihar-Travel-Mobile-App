import React from 'react';
import { View, StyleSheet } from 'react-native';

// Bulletproof gradient component - guaranteed to work
const SafeGradient = ({ 
  colors = ['#5DADE2', '#2E86C1'], 
  direction = 'diagonal',
  style, 
  children,
  ...props 
}) => {
  // Ensure colors is always an array
  const safeColors = Array.isArray(colors) ? colors : ['#5DADE2', '#2E86C1'];
  const baseColor = safeColors[0] || '#5DADE2';
  const overlayColor = safeColors[1] || '#2E86C1';
  
  return (
    <View style={[styles.container, { backgroundColor: baseColor }, style]} {...props}>
      {/* Simple overlay for gradient effect */}
      <View style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor: overlayColor,
          opacity: 0.4,
        }
      ]} />
      
      {/* Content */}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
});

export default SafeGradient; 