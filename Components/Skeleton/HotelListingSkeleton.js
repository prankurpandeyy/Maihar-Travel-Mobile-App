import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import SkeletonLoader from './SkeletonLoader';
import {COLORS, RADIUS, SPACING, SHADOWS} from '../../constants/theme';

const SearchBarSkeleton = () => (
  <View style={styles.searchContainer}>
    {/* Header Section */}
    <View style={styles.searchHeader}>
      <SkeletonLoader
        width={28}
        height={28}
        isCircle={true}
        style={styles.searchIcon}
      />
      <SkeletonLoader width="60%" height={24} borderRadius={RADIUS.sm} />
    </View>

    <SkeletonLoader
      width="80%"
      height={16}
      borderRadius={RADIUS.sm}
      style={styles.searchSubtitle}
    />

    {/* Search Bar */}
    <SkeletonLoader
      width="100%"
      height={48}
      borderRadius={RADIUS.lg}
      style={styles.searchBar}
    />
  </View>
);

const FiltersSkeleton = () => (
  <View style={styles.filtersContainer}>
    <View style={styles.filtersHeader}>
      <SkeletonLoader
        width={20}
        height={20}
        isCircle={true}
        style={styles.filterIcon}
      />
      <SkeletonLoader width="40%" height={18} borderRadius={RADIUS.sm} />
    </View>

    <View style={styles.filterChips}>
      {Array.from({length: 4}).map((_, index) => (
        <SkeletonLoader
          key={index}
          width={80}
          height={36}
          borderRadius={RADIUS.full}
          style={styles.filterChip}
        />
      ))}
    </View>
  </View>
);

const HotelCardSkeleton = () => (
  <View style={styles.hotelCard}>
    <View style={styles.cardHeader}>
      <SkeletonLoader
        width={20}
        height={20}
        isCircle={true}
        style={styles.hotelIcon}
      />
      <SkeletonLoader
        width="60%"
        height={20}
        borderRadius={RADIUS.sm}
        style={styles.hotelName}
      />
    </View>

    <View style={styles.priceSection}>
      <SkeletonLoader
        width={18}
        height={18}
        isCircle={true}
        style={styles.currencyIcon}
      />
      <SkeletonLoader
        width="50%"
        height={18}
        borderRadius={RADIUS.sm}
        style={styles.priceText}
      />
      <SkeletonLoader
        width="25%"
        height={14}
        borderRadius={RADIUS.sm}
        style={styles.perNightText}
      />
    </View>

    <View style={styles.cardFooter}>
      <SkeletonLoader width="40%" height={16} borderRadius={RADIUS.sm} />
      <SkeletonLoader width={20} height={20} isCircle={true} />
    </View>
  </View>
);

const HotelListingSkeleton = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Search Header Skeleton */}
        <SearchBarSkeleton />

        {/* Filters Skeleton */}
        <FiltersSkeleton />

        {/* Hotel Cards Skeleton */}
        <View style={styles.cardsContainer}>
          {Array.from({length: 6}).map((_, index) => (
            <HotelCardSkeleton key={index} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },

  // Search Container
  searchContainer: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING['3xl'],
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING['4xl'],
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  searchIcon: {
    marginRight: SPACING.md,
  },
  searchSubtitle: {
    alignSelf: 'center',
    marginBottom: SPACING.xl,
  },
  searchBar: {
    marginTop: SPACING.md,
  },

  // Filters Container
  filtersContainer: {
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    marginTop: -SPACING['2xl'],
    marginHorizontal: SPACING.lg,
    borderRadius: RADIUS.xl,
    marginBottom: SPACING.lg,
    ...SHADOWS.sm,
  },
  filtersHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  filterIcon: {
    marginRight: SPACING.md,
  },
  filterChips: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  filterChip: {
    marginRight: SPACING.sm,
  },

  // Cards Container
  cardsContainer: {
    paddingHorizontal: SPACING.sm,
  },

  // Hotel Card
  hotelCard: {
    backgroundColor: COLORS.surface,
    marginVertical: SPACING.sm,
    marginHorizontal: SPACING.sm,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  hotelIcon: {
    marginRight: SPACING.md,
  },
  hotelName: {
    flex: 1,
    marginRight: SPACING.md,
  },

  // Price Section
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  currencyIcon: {
    marginRight: SPACING.sm,
  },
  priceText: {
    marginRight: SPACING.md,
  },
  perNightText: {
    marginLeft: 'auto',
  },

  // Card Footer
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default HotelListingSkeleton;
