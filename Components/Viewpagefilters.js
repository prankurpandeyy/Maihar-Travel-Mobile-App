import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Chip, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS} from '../constants/theme';

const Viewpagefilters = ({priceRange, setPriceRange}) => {
  const priceRanges = [
    {label: 'All', min: 0, max: Infinity},
    {label: '₹0-500', min: 0, max: 500},
    {label: '₹500-1000', min: 500, max: 1000},
    {label: '₹1000-1500', min: 1000, max: 1500},
    {label: '₹1500+', min: 1500, max: Infinity},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="filter-variant" size={20} color={COLORS.primary} />
        <Text style={styles.title}>Filter by Price Range</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsContainer}>
        {priceRanges.map(range => (
          <Chip
            key={range.label}
            mode={priceRange.label === range.label ? 'flat' : 'outlined'}
            selected={priceRange.label === range.label}
            onPress={() => setPriceRange(range)}
            style={[
              styles.chip,
              priceRange.label === range.label
                ? styles.selectedChip
                : styles.unselectedChip,
            ]}
            textStyle={[
              styles.chipText,
              priceRange.label === range.label
                ? styles.selectedChipText
                : styles.unselectedChipText,
            ]}>
            {range.label}
          </Chip>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.md,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    marginTop: -SPACING['2xl'],
    ...SHADOWS.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    ...TYPOGRAPHY.heading4,
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
  },
  chipsContainer: {
    flexDirection: 'row',
    paddingVertical: SPACING.sm,
  },
  chip: {
    marginRight: SPACING.md,
    borderRadius: RADIUS.full,
  },
  selectedChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  unselectedChip: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
  },
  chipText: {
    ...TYPOGRAPHY.body2,
  },
  selectedChipText: {
    color: COLORS.textWhite,
  },
  unselectedChipText: {
    color: COLORS.textSecondary,
  },
});

export default Viewpagefilters;
