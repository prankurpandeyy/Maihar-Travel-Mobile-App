import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import SkeletonLoader from './SkeletonLoader';
import {COLORS, RADIUS, SPACING, SHADOWS} from '../../constants/theme';

const AccordionSkeleton = () => (
  <View style={styles.accordionCard}>
    <View style={styles.accordionHeader}>
      <SkeletonLoader
        width={24}
        height={24}
        isCircle={true}
        style={styles.accordionIcon}
      />
      <SkeletonLoader
        width="70%"
        height={20}
        borderRadius={RADIUS.sm}
        style={styles.accordionTitle}
      />
      <SkeletonLoader
        width={24}
        height={24}
        borderRadius={RADIUS.sm}
        style={styles.accordionArrow}
      />
    </View>
  </View>
);

const TableSkeleton = () => (
  <View style={styles.tableContainer}>
    {/* Table Header */}
    <View style={styles.tableRow}>
      <SkeletonLoader width="30%" height={16} borderRadius={RADIUS.sm} />
      <SkeletonLoader width="35%" height={16} borderRadius={RADIUS.sm} />
      <SkeletonLoader width="25%" height={16} borderRadius={RADIUS.sm} />
    </View>

    {/* Table Rows */}
    {Array.from({length: 4}).map((_, index) => (
      <View key={index} style={styles.tableRow}>
        <SkeletonLoader width="25%" height={14} borderRadius={RADIUS.sm} />
        <SkeletonLoader width="40%" height={14} borderRadius={RADIUS.sm} />
        <SkeletonLoader width="20%" height={14} borderRadius={RADIUS.sm} />
      </View>
    ))}
  </View>
);

const ContentSkeleton = () => (
  <View style={styles.contentContainer}>
    {/* Text Lines */}
    <SkeletonLoader
      width="100%"
      height={16}
      borderRadius={RADIUS.sm}
      style={styles.textLine}
    />
    <SkeletonLoader
      width="85%"
      height={16}
      borderRadius={RADIUS.sm}
      style={styles.textLine}
    />
    <SkeletonLoader
      width="92%"
      height={16}
      borderRadius={RADIUS.sm}
      style={styles.textLine}
    />
    <SkeletonLoader
      width="78%"
      height={16}
      borderRadius={RADIUS.sm}
      style={styles.textLine}
    />

    {/* Button Skeleton */}
    <SkeletonLoader
      width="60%"
      height={44}
      borderRadius={RADIUS.lg}
      style={styles.buttonSkeleton}
    />
  </View>
);

const InformationSkeleton = () => {
  return (
    <View style={styles.container}>
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
            width="60%"
            height={24}
            borderRadius={RADIUS.sm}
            style={styles.headerTitle}
          />
        </View>
        <SkeletonLoader
          width="80%"
          height={16}
          borderRadius={RADIUS.sm}
          style={styles.headerSubtitle}
        />
      </View>

      <ScrollView style={styles.content}>
        {/* Accordion Skeletons */}
        <AccordionSkeleton />

        {/* Expanded Accordion with Content */}
        <View style={styles.accordionCard}>
          <View style={styles.accordionHeader}>
            <SkeletonLoader
              width={24}
              height={24}
              isCircle={true}
              style={styles.accordionIcon}
            />
            <SkeletonLoader
              width="60%"
              height={20}
              borderRadius={RADIUS.sm}
              style={styles.accordionTitle}
            />
            <SkeletonLoader
              width={24}
              height={24}
              borderRadius={RADIUS.sm}
              style={styles.accordionArrow}
            />
          </View>

          {/* Expanded Content */}
          <View style={styles.expandedContent}>
            <ContentSkeleton />
            <TableSkeleton />
          </View>
        </View>

        <AccordionSkeleton />
        <AccordionSkeleton />
        <AccordionSkeleton />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
    marginBottom: SPACING.md,
  },
  headerIcon: {
    marginRight: SPACING.md,
  },
  headerTitle: {
    flex: 1,
  },
  headerSubtitle: {
    alignSelf: 'center',
    marginTop: SPACING.sm,
  },

  // Content
  content: {
    flex: 1,
    marginTop: -SPACING['2xl'],
  },

  // Accordion
  accordionCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.sm,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    ...SHADOWS.md,
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accordionIcon: {
    marginRight: SPACING.md,
  },
  accordionTitle: {
    flex: 1,
    marginRight: SPACING.md,
  },
  accordionArrow: {
    marginLeft: 'auto',
  },

  // Expanded Content
  expandedContent: {
    marginTop: SPACING.lg,
    paddingTop: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },

  // Content
  contentContainer: {
    marginBottom: SPACING.lg,
  },
  textLine: {
    marginBottom: SPACING.sm,
  },
  buttonSkeleton: {
    marginTop: SPACING.lg,
    alignSelf: 'center',
  },

  // Table
  tableContainer: {
    backgroundColor: COLORS.surfaceVariant,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    marginTop: SPACING.lg,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
});

export default InformationSkeleton;
