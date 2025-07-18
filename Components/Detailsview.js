import {
  Linking,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import HotelDetailsSkeleton from './Skeleton/HotelDetailsSkeleton';

import {useRoute} from '@react-navigation/native';
import {useEffect, useState, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Card,
  Divider,
  IconButton,
  Paragraph,
  Text,
  Title,
} from 'react-native-paper';
import PremiumGradient from './common/CustomGradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS} from '../constants/theme';
import {API_URL, PROJECT_ID} from '@env';

const {width} = Dimensions.get('window');
console.log('🚀 ~ Detailsview ~ API_URL:', API_URL);

const Detailsview = () => {
  const [hotelData, setHotelData] = useState([]);
  console.log('🚀 ~ Detailsview ~ hotelData:', hotelData);
  const [isLoading, setIsLoading] = useState(true);

  const route = useRoute();
  const {hotelId} = route.params; // Access hotelId here

  const fetchHotelById = useCallback(async hotelId => {
    try {
      const response = await fetch(API_URL + '/' + hotelId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Appwrite-Project': PROJECT_ID,
          // Use your API key if required
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch hotel data');
      }

      setIsLoading(true);
      const resData = await response.json();
      setHotelData(resData);
      setIsLoading(false);
      return hotelData;
    } catch (error) {
      console.error('Error fetching hotel data:', error);
    }
  }, []);

  useEffect(() => {
    fetchHotelById(hotelId);
  }, [hotelId, fetchHotelById]);
  // Usage

  function createGoogleMapsEmbedUrl(latLong) {
    const [lat, long] = latLong.split(',').map(coord => coord.trim());

    // Create the Google Maps embed URL
    const embedUrl = `https://www.google.com/maps?q=${lat},${long}`; // Replace YOUR_API_KEY with your actual API key
    return embedUrl;
  }
  return (
    <View style={styles.container}>
      {isLoading ? (
        <HotelDetailsSkeleton />
      ) : (
        <ScrollView style={styles.scrollView}>
          {/* Header Section */}
          <PremiumGradient
            colors={[COLORS.gradientStart, COLORS.gradientEnd]}
            direction="diagonal"
            style={styles.header}>
            <View style={styles.headerContent}>
              <Icon name="home-city" size={32} color={COLORS.textWhite} />
              <Text style={styles.headerTitle}>HOTEL DETAILS</Text>
            </View>
          </PremiumGradient>

          <View style={styles.content}>
            {/* Main Hotel Card */}
            <View style={styles.hotelCard}>
              <PremiumGradient
                colors={[COLORS.surface, COLORS.surfaceVariant]}
                direction="diagonal"
                style={styles.cardGradient}>
                {/* Hotel Header */}
                <View style={styles.hotelHeader}>
                  <Text style={styles.hotelName}>{hotelData.HotelName}</Text>
                  <View style={styles.availableBadge}>
                    <Icon
                      name="check-circle"
                      size={16}
                      color={COLORS.success}
                    />
                    <Text style={styles.availableText}>Available</Text>
                  </View>
                </View>

                {/* Location */}
                <View style={styles.locationContainer}>
                  <Icon name="map-marker" size={20} color={COLORS.primary} />
                  <Text style={styles.locationText}>
                    {hotelData.HotelAddress}
                  </Text>
                </View>

                {/* Price Section */}
                <View style={styles.priceSection}>
                  <PremiumGradient
                    colors={[COLORS.secondary, COLORS.secondaryLight]}
                    direction="horizontal"
                    style={styles.priceGradient}>
                    <Icon
                      name="currency-inr"
                      size={24}
                      color={COLORS.textWhite}
                    />
                    <Text style={styles.priceText}>
                      ₹{hotelData.HotelRentMin} - ₹{hotelData.HotelRentMax}
                    </Text>
                    <Text style={styles.perNightText}>per night</Text>
                  </PremiumGradient>
                </View>
              </PremiumGradient>
            </View>

            {/* Details Grid */}
            <View style={styles.detailsGrid}>
              {/* Contact */}
              <View style={styles.detailCard}>
                <Icon name="phone" size={24} color={COLORS.primary} />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Contact</Text>
                  <Text
                    style={styles.detailValue}
                    onPress={() =>
                      Linking.openURL('tel:' + hotelData.HotelContact)
                    }>
                    {hotelData.HotelContact}
                  </Text>
                </View>
              </View>

              {/* Food */}
              <View style={styles.detailCard}>
                <Icon name="food" size={24} color={COLORS.secondary} />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Food</Text>
                  <Text style={styles.detailValue}>
                    {hotelData.HotelFoodFacility}
                  </Text>
                </View>
              </View>

              {/* Rooms */}
              <View style={styles.detailCard}>
                <Icon name="bed" size={24} color={COLORS.accent} />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Room Type</Text>
                  <Text style={styles.detailValue}>
                    {hotelData.HotelRoomType.toUpperCase() === 'BOTH'
                      ? 'AC + NON-AC'
                      : hotelData.HotelRoomType}
                  </Text>
                </View>
              </View>

              {/* Parking */}
              <View style={styles.detailCard}>
                <Icon name="car" size={24} color={COLORS.success} />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Parking</Text>
                  <Text style={styles.detailValue}>
                    {hotelData.HotelParking}
                  </Text>
                </View>
              </View>
            </View>

            {/* Location Card */}
            <View style={styles.locationCard}>
              <Text style={styles.sectionTitle}>Location & Navigation</Text>
              <TouchableOpacity
                style={styles.mapButton}
                onPress={() =>
                  Linking.openURL(
                    createGoogleMapsEmbedUrl(hotelData.HotelLocation),
                  )
                }
                activeOpacity={0.8}>
                <PremiumGradient
                  colors={[COLORS.info, COLORS.primary]}
                  direction="horizontal"
                  style={styles.mapGradient}>
                  <Icon name="map" size={24} color={COLORS.textWhite} />
                  <Text style={styles.mapButtonText}>Open in Google Maps</Text>
                </PremiumGradient>
              </TouchableOpacity>
            </View>

            {/* Additional Details */}
            <View style={styles.additionalCard}>
              <Text style={styles.sectionTitle}>Additional Information</Text>
              <Text style={styles.additionalText}>
                {hotelData.HotelDetails}
              </Text>
            </View>

            {/* Emergency Section */}
            <View style={styles.emergencyCard}>
              <PremiumGradient
                colors={[COLORS.error, '#C0392B']}
                direction="horizontal"
                style={styles.emergencyGradient}>
                <Icon name="shield" size={28} color={COLORS.textWhite} />
                <View style={styles.emergencyContent}>
                  <Text style={styles.emergencyTitle}>Emergency Support</Text>
                  <Text style={styles.emergencySubtitle}>
                    If you feel unsafe, contact emergency services
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.emergencyButton}
                  onPress={() => Linking.openURL('tel:100')}
                  activeOpacity={0.8}>
                  <Icon name="phone" size={24} color={COLORS.textWhite} />
                  <Text style={styles.emergencyButtonText}>Dial 100</Text>
                </TouchableOpacity>
              </PremiumGradient>
            </View>
          </View>
        </ScrollView>
      )}
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

  // Header Section
  header: {
    paddingVertical: SPACING['3xl'],
    paddingHorizontal: SPACING.xl,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    ...TYPOGRAPHY.heading2,
    color: COLORS.textWhite,
    marginLeft: SPACING.md,
  },

  // Content
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    marginTop: -SPACING['2xl'],
  },

  // Main Hotel Card
  hotelCard: {
    marginBottom: SPACING.xl,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    ...SHADOWS.lg,
  },
  cardGradient: {
    padding: SPACING.xl,
  },
  hotelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
  },
  hotelName: {
    ...TYPOGRAPHY.heading1,
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: SPACING.md,
  },
  availableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    ...SHADOWS.sm,
  },
  availableText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.success,
    marginLeft: SPACING.xs,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  locationText: {
    ...TYPOGRAPHY.body1,
    color: COLORS.textSecondary,
    marginLeft: SPACING.sm,
    flex: 1,
  },

  // Price Section
  priceSection: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    ...SHADOWS.md,
  },
  priceGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
  },
  priceText: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    marginLeft: SPACING.sm,
  },
  perNightText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textWhite,
    opacity: 0.9,
    marginLeft: SPACING.sm,
  },

  // Details Grid
  detailsGrid: {
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  detailCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    ...SHADOWS.sm,
  },
  detailContent: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  detailLabel: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  detailValue: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.text,
  },

  // Section Cards
  locationCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.xl,
    borderRadius: RADIUS.xl,
    marginBottom: SPACING.lg,
    ...SHADOWS.md,
  },
  additionalCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.xl,
    borderRadius: RADIUS.xl,
    marginBottom: SPACING.lg,
    ...SHADOWS.md,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  additionalText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.textSecondary,
    lineHeight: TYPOGRAPHY.lineHeight.relaxed * TYPOGRAPHY.fontSize.base,
  },

  // Map Button
  mapButton: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    ...SHADOWS.sm,
  },
  mapGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
  },
  mapButtonText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.textWhite,
    marginLeft: SPACING.sm,
  },

  // Emergency Section
  emergencyCard: {
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    ...SHADOWS.lg,
    marginBottom: SPACING.xl,
  },
  emergencyGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emergencyContent: {
    flex: 1,
    marginLeft: SPACING.md,
    marginRight: SPACING.lg,
  },
  emergencyTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    marginBottom: SPACING.xs,
  },
  emergencySubtitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textWhite,
    opacity: 0.9,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
  },
  emergencyButtonText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    marginLeft: SPACING.xs,
  },
});

export default Detailsview;
