import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PremiumGradient from './common/SafeGradient';
import {COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS} from '../constants/theme';

const FacilityCard = ({navigation}) => {
  const facilities = [
    {icon: 'walk', name: '1063 Steps', color: COLORS.primary},
    {icon: 'tram', name: 'Ropeway Service', color: COLORS.secondary},
    {icon: 'water', name: 'Drinking Water', color: COLORS.info},
    {icon: 'shoe-heel', name: 'Shoe Storage', color: COLORS.warning},
    {icon: 'power', name: 'Power Backup', color: COLORS.success},
    {icon: 'toilet', name: 'Washrooms', color: COLORS.accent},
    {icon: 'chair', name: 'Sitting Benches', color: COLORS.primary},
    {icon: 'camera', name: 'CCTV Security', color: COLORS.error},
    {icon: 'parking', name: 'Vehicle Parking', color: COLORS.secondary},
    {icon: 'medical-bag', name: 'Medical Facility', color: COLORS.info},
    {icon: 'food', name: 'Annakoot Prasad', color: COLORS.warning},
    {
      icon: 'wheelchair',
      name: 'Wheelchair Facility',
      color: COLORS.success,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header Card */}
      <View style={styles.headerCard}>
        <PremiumGradient
          colors={[COLORS.primary, COLORS.primaryLight]}
          direction="diagonal"
          style={styles.headerGradient}>
          <Icon name="star-circle" size={32} color={COLORS.textWhite} />
          <Text style={styles.headerTitle}>Temple Facilities</Text>
          <Text style={styles.headerSubtitle}>
            Enjoy a range of facilities to enhance your visit
          </Text>
        </PremiumGradient>
      </View>

      {/* Facilities Grid */}
      <View style={styles.facilitiesGrid}>
        {facilities.map((facility, index) => (
          <View key={index} style={styles.facilityCard}>
            <View
              style={[
                styles.facilityIcon,
                {backgroundColor: facility.color + '20'},
              ]}>
              <Icon name={facility.icon} size={24} color={facility.color} />
            </View>
            <Text style={styles.facilityName}>{facility.name}</Text>
          </View>
        ))}
      </View>

      {/* Note Section */}
      <View style={styles.noteCard}>
        <View style={styles.noteHeader}>
          <Icon name="information" size={24} color={COLORS.warning} />
          <Text style={styles.noteTitle}>Important Note</Text>
        </View>

        <Text style={styles.noteText}>
          The Annakoot Prasad at Mata Sharda Temple offers free meals on a
          first-come, first-served basis. Tokens are required, and meals are
          served daily from 12:00 PM to 3:00 PM.
        </Text>

        <Text style={styles.explorText}>
          You can also explore other hotels for your stay:
        </Text>

        <TouchableOpacity
          style={styles.hotelButton}
          onPress={() => navigation.navigate('View')}
          activeOpacity={0.8}>
          <PremiumGradient
            colors={[COLORS.secondary, COLORS.secondaryLight]}
            direction="horizontal"
            style={styles.buttonGradient}>
            <Icon name="hotel" size={20} color={COLORS.textWhite} />
            <Text style={styles.buttonText}>EXPLORE HOTELS</Text>
            <Icon name="chevron-right" size={20} color={COLORS.textWhite} />
          </PremiumGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Header Card
  headerCard: {
    marginBottom: SPACING.xl,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    ...SHADOWS.lg,
  },
  headerGradient: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  headerTitle: {
    ...TYPOGRAPHY.heading2,
    color: COLORS.textWhite,
    fontWeight: 'bold',
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  headerSubtitle: {
    ...TYPOGRAPHY.body1,
    color: COLORS.textWhite,
    textAlign: 'center',
    opacity: 0.9,
  },

  // Facilities Grid
  facilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
  },
  facilityCard: {
    width: '48%',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  facilityIcon: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  facilityName: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textPrimary,
    textAlign: 'center',
    fontWeight: '500',
  },

  // Note Card
  noteCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    ...SHADOWS.md,
  },
  noteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  noteTitle: {
    ...TYPOGRAPHY.heading3,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    marginLeft: SPACING.md,
  },
  noteText: {
    ...TYPOGRAPHY.body1,
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginBottom: SPACING.lg,
  },
  explorText: {
    ...TYPOGRAPHY.body1,
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
    fontWeight: '500',
  },

  // Hotel Button
  hotelButton: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    ...SHADOWS.sm,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  buttonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.textWhite,
    fontWeight: 'bold',
    marginHorizontal: SPACING.md,
  },
});

export default FacilityCard;
