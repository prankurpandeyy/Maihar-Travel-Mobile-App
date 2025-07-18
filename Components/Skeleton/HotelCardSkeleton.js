import React from 'react';
import {View, StyleSheet} from 'react-native';
import SkeletonLoader from './SkeletonLoader';
import {COLORS, RADIUS, SPACING, SHADOWS} from '../../constants/theme';

const HotelCardSkeleton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.content}>
          {/* Hotel Name */}
          <SkeletonLoader
            width="80%"
            height={24}
            borderRadius={RADIUS.sm}
            style={styles.title}
          />

          {/* Price */}
          <SkeletonLoader
            width="60%"
            height={20}
            borderRadius={RADIUS.sm}
            style={styles.price}
          />

          {/* Details Text */}
          <SkeletonLoader
            width="40%"
            height={16}
            borderRadius={RADIUS.sm}
            style={styles.details}
          />
        </View>
      </View>
    </View>
  );
};

const HotelListSkeleton = ({count = 5}) => {
  return (
    <View style={styles.listContainer}>
      {Array.from({length: count}).map((_, index) => (
        <HotelCardSkeleton key={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.sm,
    marginVertical: SPACING.xs,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  content: {
    flex: 1,
  },
  title: {
    marginBottom: SPACING.sm,
  },
  price: {
    marginBottom: SPACING.sm,
  },
  details: {
    marginTop: SPACING.xs,
  },
  listContainer: {
    flex: 1,
  },
});

export {HotelCardSkeleton, HotelListSkeleton};
