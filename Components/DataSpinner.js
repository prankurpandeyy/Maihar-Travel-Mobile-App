import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {COLORS, TYPOGRAPHY, SPACING} from '../constants/theme';

const DataSpinner = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={COLORS.primary} />
    <Text style={styles.loadingText}>Loading...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  loadingText: {
    ...TYPOGRAPHY.body1,
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
  },
});

export default DataSpinner;
