import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {
  Chip,
  Text,
  Button,
  Modal,
  Portal,
  Surface,
  Divider,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RangeSlider} from '@react-native-assets/slider';
import {COLORS, TYPOGRAPHY, SPACING, RADIUS} from '../constants/theme';

const Viewpagefilters = ({filters, updateFilters, stats}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Price range - using slider only (no predefined buttons)

  // Hotel type options
  const hotelTypes = [
    {label: 'All Types', value: 'all', icon: 'home-variant'},
    {label: 'AC Only', value: 'ac', icon: 'air-conditioner'},
    {label: 'Non-AC', value: 'nonac', icon: 'fan'},
  ];

  // Handle range slider change
  const handleRangeSliderChange = range => {
    updateFilters({
      priceRange: range[0] === 0 && range[1] === 2000 ? 'all' : 'custom',
      customPriceMin: range[0],
      customPriceMax: range[1],
    });
  };

  // Reset price range to full range
  const resetPriceRange = () => {
    updateFilters({
      priceRange: 'all',
      customPriceMin: 0,
      customPriceMax: 2000,
    });
  };

  const handleAdvancedFilterChange = (key, value) => {
    updateFilters({[key]: value});
  };

  const clearAllFilters = () => {
    updateFilters({
      priceRange: 'all',
      customPriceMin: 0,
      customPriceMax: 2000,
      hotelType: 'all',
      foodAvailable: 'all',
      parkingAvailable: 'all',
      showFlagged: false,
      sortBy: 'name',
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    // Price range filter
    if (filters.priceRange !== 'all') {
      count++;
    }
    if (filters.hotelType !== 'all') {
      count++;
    }
    if (filters.foodAvailable !== 'all') {
      count++;
    }
    if (filters.parkingAvailable !== 'all') {
      count++;
    }
    if (filters.showFlagged) {
      count++;
    }
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <Surface style={styles.container} elevation={2}>
      {/* Stats Summary */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.total}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.available}</Text>
          <Text style={styles.statLabel}>Available</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.filtered}</Text>
          <Text style={styles.statLabel}>Filtered</Text>
        </View>
      </View>

      <Divider style={styles.divider} />

      {/* Filter Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Icon name="filter-variant" size={20} color={COLORS.primary} />
          <Text style={styles.title}>Filters</Text>
          {activeFiltersCount > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{activeFiltersCount}</Text>
            </View>
          )}
        </View>
        <View style={styles.headerRight}>
          {activeFiltersCount > 0 && (
            <Button
              mode="text"
              onPress={clearAllFilters}
              compact
              textColor={COLORS.error}>
              Clear All
            </Button>
          )}
          <Button
            mode="outlined"
            onPress={() => setShowAdvancedFilters(true)}
            compact
            icon="tune">
            Advanced
          </Button>
        </View>
      </View>

      {/* Quick Active Filters */}
      {(filters.priceRange !== 'all' || filters.hotelType !== 'all') && (
        <View style={styles.quickFiltersRow}>
          {filters.priceRange !== 'all' && (
            <Chip
              mode="flat"
              icon="currency-inr"
              onPress={resetPriceRange}
              style={styles.activeFilterChip}>
              ₹{filters.customPriceMin || 0} - ₹{filters.customPriceMax || 2000}
            </Chip>
          )}
          {filters.hotelType !== 'all' && (
            <Chip
              mode="flat"
              icon={hotelTypes.find(t => t.value === filters.hotelType)?.icon}
              onPress={() => handleAdvancedFilterChange('hotelType', 'all')}
              style={styles.activeFilterChip}>
              {hotelTypes.find(t => t.value === filters.hotelType)?.label}
            </Chip>
          )}
        </View>
      )}

      {/* Advanced Filters Modal */}
      <Portal>
        <Modal
          visible={showAdvancedFilters}
          onDismiss={() => setShowAdvancedFilters(false)}
          contentContainerStyle={styles.modalContent}>
          <ScrollView style={styles.modalScrollView}>
            <Text style={styles.modalTitle}>Advanced Filters</Text>

            {/* Price Range Filter - Slider Only */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Price Range</Text>

              <View style={styles.priceSliderContainer}>
                <Text style={styles.priceRangeLabel}>
                  ₹{filters.customPriceMin || 0} - ₹
                  {filters.customPriceMax || 2000}
                </Text>

                <RangeSlider
                  range={[
                    filters.customPriceMin || 0,
                    filters.customPriceMax || 2000,
                  ]}
                  minimumValue={0}
                  maximumValue={2000}
                  step={50}
                  onValueChange={handleRangeSliderChange}
                  trackHeight={6}
                  thumbSize={20}
                  inboundColor={COLORS.primary}
                  outboundColor={COLORS.border}
                  thumbTintColor={COLORS.primary}
                  trackStyle={styles.sliderTrack}
                  thumbStyle={styles.sliderThumb}
                  containerStyle={styles.sliderContainer}
                />

                <View style={styles.rangeLabels}>
                  <Text style={styles.rangeLabel}>₹0</Text>
                  <Text style={styles.rangeLabel}>₹2000</Text>
                </View>

                {(filters.customPriceMin > 0 ||
                  filters.customPriceMax < 2000) && (
                  <Button
                    mode="outlined"
                    onPress={resetPriceRange}
                    compact
                    style={styles.resetButton}>
                    Reset to Full Range
                  </Button>
                )}
              </View>
            </View>

            {/* Hotel Type Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Hotel Type</Text>
              <View style={styles.filterOptionsGrid}>
                {hotelTypes.map(type => (
                  <Chip
                    key={type.value}
                    mode={
                      filters.hotelType === type.value ? 'flat' : 'outlined'
                    }
                    icon={type.icon}
                    selected={filters.hotelType === type.value}
                    onPress={() =>
                      handleAdvancedFilterChange('hotelType', type.value)
                    }
                    style={[
                      styles.filterOptionChip,
                      filters.hotelType === type.value &&
                        styles.selectedFilterChip,
                    ]}>
                    {type.label}
                  </Chip>
                ))}
              </View>
            </View>

            {/* Food Availability */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Food Facility</Text>
              <View style={styles.filterOptionsRow}>
                <Chip
                  mode={filters.foodAvailable === 'all' ? 'flat' : 'outlined'}
                  selected={filters.foodAvailable === 'all'}
                  onPress={() =>
                    handleAdvancedFilterChange('foodAvailable', 'all')
                  }
                  icon="food-variant">
                  All
                </Chip>
                <Chip
                  mode={filters.foodAvailable === 'yes' ? 'flat' : 'outlined'}
                  selected={filters.foodAvailable === 'yes'}
                  onPress={() =>
                    handleAdvancedFilterChange('foodAvailable', 'yes')
                  }
                  icon="check">
                  Available
                </Chip>
                <Chip
                  mode={filters.foodAvailable === 'no' ? 'flat' : 'outlined'}
                  selected={filters.foodAvailable === 'no'}
                  onPress={() =>
                    handleAdvancedFilterChange('foodAvailable', 'no')
                  }
                  icon="close">
                  Not Available
                </Chip>
              </View>
            </View>

            {/* Parking Availability */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Parking Facility</Text>
              <View style={styles.filterOptionsRow}>
                <Chip
                  mode={
                    filters.parkingAvailable === 'all' ? 'flat' : 'outlined'
                  }
                  selected={filters.parkingAvailable === 'all'}
                  onPress={() =>
                    handleAdvancedFilterChange('parkingAvailable', 'all')
                  }
                  icon="car">
                  All
                </Chip>
                <Chip
                  mode={
                    filters.parkingAvailable === 'yes' ? 'flat' : 'outlined'
                  }
                  selected={filters.parkingAvailable === 'yes'}
                  onPress={() =>
                    handleAdvancedFilterChange('parkingAvailable', 'yes')
                  }
                  icon="check">
                  Available
                </Chip>
                <Chip
                  mode={filters.parkingAvailable === 'no' ? 'flat' : 'outlined'}
                  selected={filters.parkingAvailable === 'no'}
                  onPress={() =>
                    handleAdvancedFilterChange('parkingAvailable', 'no')
                  }
                  icon="close">
                  Not Available
                </Chip>
              </View>
            </View>

            {/* Show Flagged Hotels */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Other Options</Text>
              <View style={styles.filterOptionsRow}>
                <Chip
                  mode={filters.showFlagged ? 'flat' : 'outlined'}
                  selected={filters.showFlagged}
                  onPress={() =>
                    handleAdvancedFilterChange(
                      'showFlagged',
                      !filters.showFlagged,
                    )
                  }
                  icon={filters.showFlagged ? 'eye' : 'eye-off'}>
                  Show Flagged Hotels
                </Chip>
              </View>
            </View>

            {/* Modal Actions */}
            <View style={styles.modalActions}>
              <Button
                mode="outlined"
                onPress={clearAllFilters}
                style={styles.modalActionButton}>
                Clear All
              </Button>
              <Button
                mode="contained"
                onPress={() => setShowAdvancedFilters(false)}
                style={styles.modalActionButton}>
                Apply Filters
              </Button>
            </View>
          </ScrollView>
        </Modal>
      </Portal>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.lg,
    marginTop: -SPACING['2xl'],
    marginBottom: SPACING.lg,
    borderRadius: RADIUS.xl,
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.lg,
  },

  // Stats
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    ...TYPOGRAPHY.heading4,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: COLORS.divider,
    alignSelf: 'center',
  },
  divider: {
    marginVertical: SPACING.sm,
    backgroundColor: COLORS.divider,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  title: {
    ...TYPOGRAPHY.body1,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
  },
  filterBadge: {
    backgroundColor: COLORS.error,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.xs,
  },
  filterBadgeText: {
    color: COLORS.textWhite,
    fontSize: 12,
    fontWeight: 'bold',
  },

  // Quick Filters
  quickFiltersRow: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
    flexWrap: 'wrap',
  },
  activeFilterChip: {
    backgroundColor: COLORS.secondary + '20',
  },

  // Modal
  modalContent: {
    backgroundColor: COLORS.surface,
    margin: SPACING.lg,
    borderRadius: RADIUS.xl,
    maxHeight: '80%',
  },
  modalScrollView: {
    padding: SPACING.lg,
  },
  modalTitle: {
    ...TYPOGRAPHY.heading3,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },

  // Filter Sections
  filterSection: {
    marginBottom: SPACING.xl,
  },
  filterSectionTitle: {
    ...TYPOGRAPHY.body1,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  filterOptionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  filterOptionsRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    flexWrap: 'wrap',
  },
  filterOptionChip: {
    marginBottom: SPACING.xs,
  },
  selectedFilterChip: {
    backgroundColor: COLORS.primary,
  },

  // Modal Actions
  modalActions: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.xl,
  },
  modalActionButton: {
    flex: 1,
  },

  // Price Slider Styles - Simplified
  priceSliderContainer: {
    marginTop: SPACING.md,
    padding: SPACING.lg,
    backgroundColor: COLORS.surfaceVariant,
    borderRadius: RADIUS.lg,
  },
  priceRangeLabel: {
    ...TYPOGRAPHY.heading4,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  sliderContainer: {
    height: 40,
    marginVertical: SPACING.sm,
  },
  sliderTrack: {
    borderRadius: 3,
  },
  sliderThumb: {
    borderWidth: 2,
    borderColor: COLORS.surface,
    shadowColor: COLORS.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.xs,
  },
  rangeLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  resetButton: {
    marginTop: SPACING.md,
    alignSelf: 'center',
  },
});

export default Viewpagefilters;
