import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PremiumGradient from './common/CustomGradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {HotelListSkeleton} from './Skeleton/HotelCardSkeleton';
import {COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS} from '../constants/theme';
import {useLanguage} from '../contexts/LanguageContext';
import {getTranslatedText} from '../constants/translations';

const Viewpagecard = ({navigation, filteredHotelsByName, isLoading}) => {
  const {language} = useLanguage();

  return (
    <View style={styles.container}>
      {isLoading ? (
        <HotelListSkeleton count={5} />
      ) : filteredHotelsByName.length > 0 ? (
        filteredHotelsByName.map((hotel, index) =>
          hotel.isHotelFlagged ? (
            <TouchableOpacity
              key={`flagged-${hotel.$id}-${index}`}
              style={styles.flaggedCard}
              hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
              <View style={styles.flaggedBadge}>
                <Icon name="alert-circle" size={16} color={COLORS.error} />
                <Text style={styles.flaggedBadgeText}>
                  {getTranslatedText('FLAGGED', language)}
                </Text>
              </View>

              <View style={styles.cardContent}>
                <View style={styles.hotelHeader}>
                  <Icon name="home-city" size={20} color={COLORS.error} />
                  <Text style={styles.flaggedHotelName}>{hotel.HotelName}</Text>
                </View>

                <Text style={styles.flaggedText}>
                  {getTranslatedText(
                    'This hotel has been flagged by authorities. Contact admin for more information.',
                    language,
                  )}
                </Text>

                <View style={styles.warningFooter}>
                  <Icon name="information" size={14} color={COLORS.error} />
                  <Text style={styles.warningText}>
                    {getTranslatedText('Not available for booking', language)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              key={`hotel-${hotel.$id}-${index}`}
              onPress={() =>
                navigation.navigate('Details', {hotelId: hotel.$id})
              }
              style={styles.card}
              activeOpacity={0.7}
              hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
              <PremiumGradient
                colors={[COLORS.surface, COLORS.surfaceVariant]}
                direction="diagonal"
                style={styles.cardGradient}>
                <View style={styles.cardContent}>
                  <View style={styles.hotelHeader}>
                    <Icon name="home-city" size={20} color={COLORS.primary} />
                    <Text style={styles.hotelName}>{hotel.HotelName}</Text>
                  </View>

                  <View style={styles.priceContainer}>
                    <Icon
                      name="currency-inr"
                      size={18}
                      color={COLORS.secondary}
                    />
                    <Text style={styles.priceText}>
                      ₹{hotel.HotelRentMin} - ₹{hotel.HotelRentMax}
                    </Text>
                    <Text style={styles.perNightText}>
                      {getTranslatedText('per night', language)}
                    </Text>
                  </View>

                  <View style={styles.cardFooter}>
                    <Text style={styles.viewDetailsText}>
                      {getTranslatedText('Tap to view details', language)}
                    </Text>
                    <Icon
                      name="chevron-right"
                      size={20}
                      color={COLORS.primary}
                    />
                  </View>
                </View>
              </PremiumGradient>
            </TouchableOpacity>
          ),
        )
      ) : (
        <View style={styles.emptyState}>
          <Icon name="hotel" size={48} color={COLORS.textSecondary} />
          <Text style={styles.emptyTitle}>
            {getTranslatedText('No hotels found', language)}
          </Text>
          <Text style={styles.emptySubtitle}>
            {getTranslatedText(
              'Try adjusting your search or filters',
              language,
            )}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },

  // Regular Hotel Card
  card: {
    marginVertical: SPACING.sm,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    ...SHADOWS.md,
  },
  cardGradient: {
    padding: SPACING.lg,
  },
  cardContent: {
    gap: SPACING.md,
  },
  hotelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hotelName: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.text,
    flex: 1,
    marginLeft: SPACING.sm,
  },

  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.secondary,
    marginLeft: SPACING.xs,
  },
  perNightText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  viewDetailsText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.primary,
  },

  // Flagged Hotel Card
  flaggedCard: {
    marginVertical: SPACING.sm,
    backgroundColor: COLORS.flaggedCard,
    borderRadius: RADIUS.xl,
    borderWidth: 2,
    borderColor: COLORS.flaggedBorder,
    overflow: 'hidden',
    ...SHADOWS.sm,
  },
  flaggedBadge: {
    backgroundColor: COLORS.error,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xs,
  },
  flaggedBadgeText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    marginLeft: SPACING.xs,
  },
  flaggedHotelName: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.error,
    flex: 1,
    marginLeft: SPACING.sm,
  },
  flaggedText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  warningFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  warningText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.error,
    marginLeft: SPACING.xs,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING['4xl'],
  },
  emptyTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.md,
  },
  emptySubtitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: SPACING.xs,
  },
});

export default Viewpagecard;
