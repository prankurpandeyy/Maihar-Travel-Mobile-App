// import React from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
// } from 'react-native';
// import DataSpinner from './DataSpinner';

// const Viewpagecard = ({navigation, filteredHotelsByName, isLoading}) => {
//   return (
//     <View style={styles.container}>
//       {isLoading ? (
//         <DataSpinner />
//       ) : filteredHotelsByName.length > 0 ? (
//         filteredHotelsByName.map(hotel =>
//           hotel.isHotelFlagged ? (
//             <TouchableOpacity key={hotel.$id} style={styles.noCard}>
//               <View style={styles.textContainer}>
//                 <Text style={styles.hotelName}>{hotel.HotelName}</Text>
//                 <Text style={styles.detailsText}>
//                   The Hotel is Flagged By Authorties,Can't View More Details.
//                   Please Contact Admin.
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           ) : (
//             <TouchableOpacity
//               key={hotel.$id}
//               onPress={() =>
//                 navigation.navigate('Details', {hotelId: hotel.$id})
//               }
//               style={styles.card}>
//               <View style={styles.textContainer}>
//                 <Text style={styles.hotelName}>{hotel.HotelName}</Text>
//                 <Text style={styles.hotelPrice}>
//                   {' '}
//                   Price:
//                   {hotel.HotelRentMin}-{hotel.HotelRentMax}
//                 </Text>
//                 <Text style={styles.detailsText}>View More Details</Text>
//               </View>
//             </TouchableOpacity>
//           ),
//         )
//       ) : (
//         <Text style={styles.noHotelsText}>No hotels found</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 8,
//   },
//   card: {
//     marginVertical: 5,
//     padding: 8,
//     backgroundColor: 'white',
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//     flexDirection: 'row',
//     borderWidth: 2,
//     borderColor: '#6f76f7', // Sky-500 equivalent
//   },
//   image: {
//     width: '50%',
//     height: 160,
//     borderRadius: 8,
//   },
//   textContainer: {
//     width: '100%',
//     paddingLeft: 16,
//     justifyContent: 'center',
//   },
//   hotelName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'black',
//     width: '100%',
//   },
//   hotelPrice: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'red',
//     width: '100%',
//   },
//   detailsText: {
//     color: '#4b5563', // Gray-600 equivalent
//     marginTop: 8,
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     width: '100%',
//   },
//   noHotelsText: {
//     textAlign: 'center',
//     color: '#ef4444', // Red-500 equivalent
//     marginTop: 16,
//   },
//   noCard: {
//     marginVertical: 5,
//     padding: 8,
//     backgroundColor: 'white',
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//     flexDirection: 'row',
//     borderWidth: 2,
//     borderColor: '#ef4444', // Red-500 equivalent
//   },
// });

// export default Viewpagecard;
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PremiumGradient from './common/CustomGradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {HotelListSkeleton} from './Skeleton/HotelCardSkeleton';
import {COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS} from '../constants/theme';

const Viewpagecard = ({navigation, filteredHotelsByName, isLoading}) => {
  return (
    <View style={styles.container}>
      {isLoading ? (
        <HotelListSkeleton count={5} />
      ) : filteredHotelsByName.length > 0 ? (
        filteredHotelsByName.map((hotel, index) =>
          hotel.isHotelFlagged ? (
            <TouchableOpacity
              key={`flagged-${hotel.$id}-${index}`}
              style={styles.flaggedCard}>
              <View style={styles.flaggedBadge}>
                <Icon name="alert-circle" size={16} color={COLORS.error} />
                <Text style={styles.flaggedBadgeText}>FLAGGED</Text>
              </View>

              <View style={styles.cardContent}>
                <View style={styles.hotelHeader}>
                  <Icon name="home-city" size={20} color={COLORS.error} />
                  <Text style={styles.flaggedHotelName}>{hotel.HotelName}</Text>
                </View>

                <Text style={styles.flaggedText}>
                  This hotel has been flagged by authorities. Contact admin for
                  more information.
                </Text>

                <View style={styles.warningFooter}>
                  <Icon name="information" size={14} color={COLORS.error} />
                  <Text style={styles.warningText}>
                    Not available for booking
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
              activeOpacity={0.7}>
              <PremiumGradient
                colors={[COLORS.surface, COLORS.surfaceVariant]}
                direction="diagonal"
                style={styles.cardGradient}>
                <View style={styles.cardContent}>
                  <View style={styles.hotelHeader}>
                    <Icon name="home-city" size={20} color={COLORS.primary} />
                    <Text style={styles.hotelName}>{hotel.HotelName}</Text>
                    <View style={styles.availableBadge}>
                      <Text style={styles.availableText}>Available</Text>
                    </View>
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
                    <Text style={styles.perNightText}>per night</Text>
                  </View>

                  <View style={styles.cardFooter}>
                    <Text style={styles.viewDetailsText}>
                      Tap to view details
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
          <Icon name="home-off" size={48} color={COLORS.textLight} />
          <Text style={styles.noHotelsText}>No hotels found</Text>
          <Text style={styles.emptyStateSubtext}>
            Try adjusting your search or filters
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
  availableBadge: {
    backgroundColor: COLORS.success,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
  },
  availableText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.textWhite,
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
  noHotelsText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.md,
  },
  emptyStateSubtext: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: SPACING.xs,
  },
});

export default Viewpagecard;
