import React from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import SkeletonLoader from './SkeletonLoader';
import {COLORS, RADIUS, SPACING, SHADOWS} from '../../constants/theme';

const {width} = Dimensions.get('window');

const HotelDetailsSkeleton = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header Skeleton */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <SkeletonLoader
              width={32}
              height={32}
              isCircle={true}
              style={styles.headerIcon}
            />
            <SkeletonLoader
              width="50%"
              height={24}
              borderRadius={RADIUS.sm}
              style={styles.headerTitle}
            />
          </View>
        </View>

        <View style={styles.content}>
          {/* Main Hotel Card Skeleton */}
          <View style={styles.hotelCard}>
            {/* Hotel Header */}
            <View style={styles.hotelHeader}>
              <SkeletonLoader
                width="70%"
                height={28}
                borderRadius={RADIUS.sm}
              />
              <SkeletonLoader
                width={80}
                height={24}
                borderRadius={RADIUS.full}
              />
            </View>

            {/* Location */}
            <View style={styles.locationContainer}>
              <SkeletonLoader
                width={20}
                height={20}
                isCircle={true}
                style={styles.locationIcon}
              />
              <SkeletonLoader
                width="80%"
                height={16}
                borderRadius={RADIUS.sm}
              />
            </View>

            {/* Price Section */}
            <View style={styles.priceSection}>
              <SkeletonLoader
                width="100%"
                height={60}
                borderRadius={RADIUS.lg}
                style={styles.priceSkeleton}
              />
            </View>
          </View>

          {/* Details Grid Skeleton */}
          <View style={styles.detailsGrid}>
            {Array.from({length: 4}).map((_, index) => (
              <View key={index} style={styles.detailCard}>
                <SkeletonLoader
                  width={24}
                  height={24}
                  isCircle={true}
                  style={styles.detailIcon}
                />
                <View style={styles.detailContent}>
                  <SkeletonLoader
                    width="60%"
                    height={14}
                    borderRadius={RADIUS.sm}
                    style={styles.detailLabel}
                  />
                  <SkeletonLoader
                    width="80%"
                    height={16}
                    borderRadius={RADIUS.sm}
                  />
                </View>
              </View>
            ))}
          </View>

          {/* Location Card Skeleton */}
          <View style={styles.locationCard}>
            <SkeletonLoader
              width="60%"
              height={20}
              borderRadius={RADIUS.sm}
              style={styles.sectionTitle}
            />
            <SkeletonLoader
              width="100%"
              height={48}
              borderRadius={RADIUS.lg}
              style={styles.mapButton}
            />
          </View>

          {/* Additional Details Skeleton */}
          <View style={styles.additionalCard}>
            <SkeletonLoader
              width="70%"
              height={20}
              borderRadius={RADIUS.sm}
              style={styles.sectionTitle}
            />
            <SkeletonLoader
              width="100%"
              height={16}
              borderRadius={RADIUS.sm}
              style={styles.textLine}
            />
            <SkeletonLoader
              width="90%"
              height={16}
              borderRadius={RADIUS.sm}
              style={styles.textLine}
            />
            <SkeletonLoader
              width="95%"
              height={16}
              borderRadius={RADIUS.sm}
              style={styles.textLine}
            />
            <SkeletonLoader width="75%" height={16} borderRadius={RADIUS.sm} />
          </View>

          {/* Emergency Section Skeleton */}
          <View style={styles.emergencyCard}>
            <SkeletonLoader
              width="100%"
              height={80}
              borderRadius={RADIUS.lg}
              style={styles.emergencySkeleton}
            />
          </View>
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

  // Header
  header: {
    backgroundColor: COLORS.accent,
    paddingVertical: SPACING['3xl'],
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING['4xl'],
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    marginRight: SPACING.md,
  },
  headerTitle: {
    flex: 1,
  },

  // Content
  content: {
    flex: 1,
    marginTop: -SPACING['2xl'],
    paddingHorizontal: SPACING.lg,
  },

  // Hotel Card
  hotelCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    marginBottom: SPACING.xl,
    ...SHADOWS.md,
  },
  hotelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  locationIcon: {
    marginRight: SPACING.md,
  },
  priceSection: {
    marginTop: SPACING.md,
  },
  priceSkeleton: {
    alignSelf: 'stretch',
  },

  // Details Grid
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
  },
  detailCard: {
    width: '48%',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  detailIcon: {
    marginRight: SPACING.md,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    marginBottom: SPACING.sm,
  },

  // Cards
  locationCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    marginBottom: SPACING.xl,
    ...SHADOWS.md,
  },
  additionalCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    marginBottom: SPACING.xl,
    ...SHADOWS.md,
  },
  emergencyCard: {
    marginBottom: SPACING.xl,
  },

  // Common
  sectionTitle: {
    marginBottom: SPACING.lg,
  },
  mapButton: {
    marginTop: SPACING.md,
  },
  emergencySkeleton: {
    alignSelf: 'stretch',
  },
  textLine: {
    marginBottom: SPACING.md,
  },
});

export default HotelDetailsSkeleton;
