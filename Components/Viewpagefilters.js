import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Chip, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS} from '../constants/theme';

const Viewpagefilters = ({hotelData, setHotelData, getData}) => {
  const priceRanges = [
    {label: 'All', min: 0, max: Infinity},
    {label: 'Till ₹500', min: 0, max: 500},
    {label: '₹500 - ₹1000', min: 500, max: 1000},
    {label: '₹1000 - ₹2000', min: 1000, max: 2000},
    {label: 'Above ₹2000', min: 2000, max: Infinity},
  ];

  const [selectedRange, setSelectedRange] = useState(priceRanges[0]);

  useEffect(() => {
    applyFilter();
  }, [selectedRange]);

  const applyFilter = () => {
    if (selectedRange.label === 'All') {
      getData(); // Fetch the original data
    } else {
      const filteredHotels = hotelData.filter(hotel => {
        const hotelRentMin = parseInt(hotel.HotelRentMin, 10);
        const hotelRentMax = parseInt(hotel.HotelRentMax, 10);
        return (
          (hotelRentMin >= selectedRange.min &&
            hotelRentMin <= selectedRange.max) ||
          (hotelRentMax >= selectedRange.min &&
            hotelRentMax <= selectedRange.max)
        );
      });

      setHotelData(filteredHotels.length > 0 ? filteredHotels : []);
    }
  };

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
            mode={selectedRange.label === range.label ? 'flat' : 'outlined'}
            selected={selectedRange.label === range.label}
            onPress={() => setSelectedRange(range)}
            style={[
              styles.chip,
              selectedRange.label === range.label
                ? styles.selectedChip
                : styles.unselectedChip,
            ]}
            textStyle={[
              styles.chipText,
              selectedRange.label === range.label
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
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.text,
    marginLeft: SPACING.sm,
  },
  chipsContainer: {
    paddingRight: SPACING.lg,
  },
  chip: {
    marginRight: SPACING.sm,
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
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  selectedChipText: {
    color: COLORS.textWhite,
  },
  unselectedChipText: {
    color: COLORS.text,
  },
});

export default Viewpagefilters;
