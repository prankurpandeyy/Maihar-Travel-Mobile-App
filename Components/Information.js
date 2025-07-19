import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PremiumGradient from './common/CustomGradient';
import {COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS} from '../constants/theme';

// Skeleton Loading Component
const SkeletonLoader = ({width, height, style}) => {
  const animatedValue = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          backgroundColor: COLORS.border,
          borderRadius: RADIUS.sm,
          opacity,
        },
        style,
      ]}
    />
  );
};

// Accordion Component
const CustomAccordion = ({title, icon, children, isFirst = false}) => {
  const [isExpanded, setIsExpanded] = useState(isFirst);
  const [animation] = useState(new Animated.Value(isFirst ? 1 : 0));

  const toggleAccordion = () => {
    const toValue = isExpanded ? 0 : 1;
    setIsExpanded(!isExpanded);

    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const rotateInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={toggleAccordion}
        activeOpacity={0.8}>
        <View style={styles.accordionTitleContainer}>
          <View
            style={[
              styles.iconContainer,
              {backgroundColor: COLORS.primary + '15'},
            ]}>
            <Icon name={icon} size={24} color={COLORS.primary} />
          </View>
          <Text style={styles.accordionTitle}>{title}</Text>
        </View>
        <Animated.View style={{transform: [{rotate: rotateInterpolate}]}}>
          <Icon name="chevron-down" size={24} color={COLORS.textSecondary} />
        </Animated.View>
      </TouchableOpacity>

      {isExpanded && (
        <Animated.View style={styles.accordionContent}>
          {children}
        </Animated.View>
      )}
    </View>
  );
};

// Table Component
const InfoTable = ({data, headers}) => (
  <View style={styles.tableContainer}>
    <View style={styles.tableHeader}>
      {headers.map((header, index) => (
        <Text key={index} style={styles.tableHeaderText}>
          {header}
        </Text>
      ))}
    </View>
    {data.map((row, index) => (
      <View key={index} style={styles.tableRow}>
        {row.map((cell, cellIndex) => (
          <Text key={cellIndex} style={styles.tableCellText}>
            {cell}
          </Text>
        ))}
      </View>
    ))}
  </View>
);

// Main Information Component
const Information = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Temple Data
  const templeTimings = [
    ['Daily', 'Temple Opening', '05:00 AM'],
    ['Daily', 'Morning Darshan', '05:00 AM - 08:00 AM'],
    ['Daily', 'Evening Darshan', '04:00 PM - 09:00 PM'],
    ['Daily', 'Temple Closing', '09:00 PM'],
  ];

  const ropewayTimings = [
    ['Daily', 'Ropeway Opening', '05:00 AM'],
    ['Daily', 'Morning Service', '05:00 AM - 08:00 AM'],
    ['Daily', 'Evening Service', '04:00 PM - 09:00 PM'],
    ['Daily', 'Ropeway Closing', '09:00 PM'],
  ];

  const facilities = [
    {icon: 'food', name: 'Free Meals', color: COLORS.success},
    {icon: 'car', name: 'Parking', color: COLORS.primary},
    {icon: 'account-group', name: 'Rest Rooms', color: COLORS.secondary},
    {icon: 'water', name: 'Drinking Water', color: COLORS.info},
    {icon: 'hospital', name: 'Medical Aid', color: COLORS.error},
    {icon: 'shopping', name: 'Prasad Shop', color: COLORS.warning},
  ];

  const transportOptions = [
    {
      mode: 'Train',
      icon: 'train',
      description:
        'Maihar Railway Station (MYR) - Well connected to major cities',
      color: COLORS.primary,
    },
    {
      mode: 'Bus',
      icon: 'bus',
      description: 'Regular bus services from Satna, Katni, and nearby cities',
      color: COLORS.secondary,
    },
    {
      mode: 'Flight',
      icon: 'airplane',
      description: 'Nearest airports: Khajuraho (106 km), Jabalpur (145 km)',
      color: COLORS.accent,
    },
  ];

  if (isLoading) {
    return (
      <View style={styles.container}>
        {/* Skeleton Header */}
        <View style={styles.skeletonHeader}>
          <SkeletonLoader width={40} height={40} style={{borderRadius: 20}} />
          <SkeletonLoader
            width="60%"
            height={24}
            style={{marginLeft: SPACING.md}}
          />
        </View>

        {/* Skeleton Content */}
        <ScrollView style={styles.content}>
          {[1, 2, 3, 4, 5].map(item => (
            <View key={item} style={styles.skeletonCard}>
              <View style={styles.skeletonCardHeader}>
                <SkeletonLoader
                  width={24}
                  height={24}
                  style={{borderRadius: 12}}
                />
                <SkeletonLoader
                  width="70%"
                  height={20}
                  style={{marginLeft: SPACING.md}}
                />
                <SkeletonLoader
                  width={24}
                  height={24}
                  style={{borderRadius: 12}}
                />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <PremiumGradient
        colors={[COLORS.accent, COLORS.accentLight]}
        direction="diagonal"
        style={styles.header}>
        <View style={styles.headerContent}>
          <Icon name="temple-hindu" size={32} color={COLORS.textWhite} />
          <Text style={styles.headerTitle}>TEMPLE INFORMATION</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Complete guide to Sharda Mata Temple
        </Text>
      </PremiumGradient>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* History Section */}
        <CustomAccordion
          title="Temple History & Significance"
          icon="book-open-variant"
          isFirst={true}>
          <View style={styles.historyCard}>
            <Text style={styles.historyText}>
              🏛️ Maihar Devi Temple, dedicated to Goddess Sharda (Saraswati), is
              perched atop the Trikut Hills in Satna district, Madhya Pradesh.
              This ancient temple requires a climb of 1,063 steps or a scenic
              ropeway ride.
            </Text>
            <Text style={styles.historyText}>
              ✨ The temple is associated with Sringeri Mutt and houses shrines
              of Lord Bala Ganapathi, Lord Muruga, and Acharya Sri Sankara. It's
              renowned for hosting three daily pujas and the grand 10-day
              Navarathri festival.
            </Text>
          </View>

          <InfoTable
            headers={['Day', 'Darshan Session', 'Timing']}
            data={templeTimings}
          />
        </CustomAccordion>

        {/* How to Reach */}
        <CustomAccordion title="How to Reach Temple" icon="map-marker-path">
          <View style={styles.transportContainer}>
            {transportOptions.map((transport, index) => (
              <View key={index} style={styles.transportCard}>
                <View
                  style={[
                    styles.transportIcon,
                    {backgroundColor: transport.color + '15'},
                  ]}>
                  <Icon
                    name={transport.icon}
                    size={24}
                    color={transport.color}
                  />
                </View>
                <View style={styles.transportContent}>
                  <Text style={styles.transportMode}>{transport.mode}</Text>
                  <Text style={styles.transportDescription}>
                    {transport.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </CustomAccordion>

        {/* Facilities */}
        <CustomAccordion title="Temple Facilities" icon="star-circle">
          <View style={styles.facilitiesGrid}>
            {facilities.map((facility, index) => (
              <View key={index} style={styles.facilityCard}>
                <View
                  style={[
                    styles.facilityIcon,
                    {backgroundColor: facility.color + '15'},
                  ]}>
                  <Icon name={facility.icon} size={24} color={facility.color} />
                </View>
                <Text style={styles.facilityName}>{facility.name}</Text>
              </View>
            ))}
          </View>

          <View style={styles.facilitiesNote}>
            <Icon name="information" size={20} color={COLORS.warning} />
            <Text style={styles.facilitiesNoteText}>
              Annakoot Prasad offers free meals daily from 12:00 PM to 3:00 PM
              on first-come, first-served basis.
            </Text>
          </View>
        </CustomAccordion>

        {/* Ropeway Information */}
        <CustomAccordion title="Ropeway Services" icon="gondola">
          <InfoTable
            headers={['Day', 'Service', 'Timing']}
            data={ropewayTimings}
          />

          <View style={styles.ropewayNote}>
            <Icon name="information-outline" size={20} color={COLORS.info} />
            <Text style={styles.ropewayNoteText}>
              After the ropeway, climb approximately 50 stairs to reach the
              temple. Book tickets online or offline at the Ropeway Center.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.bookingButton}
            onPress={() =>
              Linking.openURL('https://uat.ropeways.com/online-booking')
            }
            activeOpacity={0.8}>
            <PremiumGradient
              colors={[COLORS.secondary, COLORS.secondaryLight]}
              direction="horizontal"
              style={styles.buttonGradient}>
              <Icon name="ticket" size={20} color={COLORS.textWhite} />
              <Text style={styles.buttonText}>Book Ropeway Tickets</Text>
            </PremiumGradient>
          </TouchableOpacity>
        </CustomAccordion>

        {/* Contact & Emergency */}
        <CustomAccordion title="Contact & Emergency" icon="phone-alert">
          <View style={styles.contactContainer}>
            {[
              {
                title: 'Emergency Police',
                number: '100',
                icon: 'shield-alert',
                color: COLORS.error,
              },
              {
                title: 'Maihar Police Station',
                number: '07674232047',
                icon: 'shield-account',
                color: COLORS.primary,
              },
              {
                title: 'Temple Information',
                number: '111-223-3445',
                icon: 'information',
                color: COLORS.info,
              },
            ].map((contact, index) => (
              <TouchableOpacity
                key={index}
                style={styles.contactCard}
                onPress={() => Linking.openURL(`tel:${contact.number}`)}
                activeOpacity={0.8}>
                <View
                  style={[
                    styles.contactIcon,
                    {backgroundColor: contact.color + '15'},
                  ]}>
                  <Icon name={contact.icon} size={24} color={contact.color} />
                </View>
                <View style={styles.contactContent}>
                  <Text style={styles.contactTitle}>{contact.title}</Text>
                  <Text style={styles.contactNumber}>{contact.number}</Text>
                </View>
                <Icon name="phone" size={20} color={COLORS.textSecondary} />
              </TouchableOpacity>
            ))}
          </View>
        </CustomAccordion>

        {/* Explore Hotels */}
        <View style={styles.exploreSection}>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => navigation.navigate('View')}
            activeOpacity={0.8}>
            <PremiumGradient
              colors={[COLORS.primary, COLORS.primaryLight]}
              direction="horizontal"
              style={styles.exploreGradient}>
              <Icon name="home-city" size={24} color={COLORS.textWhite} />
              <Text style={styles.exploreText}>Explore Nearby Hotels</Text>
              <Icon name="chevron-right" size={24} color={COLORS.textWhite} />
            </PremiumGradient>
          </TouchableOpacity>
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

  // Header
  header: {
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
  headerTitle: {
    ...TYPOGRAPHY.heading2,
    color: COLORS.textWhite,
    marginLeft: SPACING.md,
  },
  headerSubtitle: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textWhite,
    textAlign: 'center',
    opacity: 0.9,
  },

  // Content
  content: {
    flex: 1,
    marginTop: -SPACING['2xl'],
  },

  // Skeleton Loading
  skeletonHeader: {
    backgroundColor: COLORS.accent,
    padding: SPACING['3xl'],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skeletonCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.sm,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    ...SHADOWS.md,
  },
  skeletonCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Accordion
  accordionContainer: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.sm,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    ...SHADOWS.md,
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
    backgroundColor: COLORS.surface,
  },
  accordionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  accordionTitle: {
    ...TYPOGRAPHY.heading4,
    color: COLORS.textPrimary,
    flex: 1,
  },
  accordionContent: {
    padding: SPACING.lg,
    paddingTop: 0,
    backgroundColor: COLORS.surface,
  },

  // History
  historyCard: {
    backgroundColor: COLORS.surfaceVariant,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.lg,
  },
  historyText: {
    ...TYPOGRAPHY.body1,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
    lineHeight: 24,
  },

  // Table
  tableContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    marginTop: SPACING.lg,
    ...SHADOWS.sm,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
  },
  tableHeaderText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textWhite,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tableCellText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textPrimary,
    flex: 1,
    textAlign: 'center',
  },

  // Transport
  transportContainer: {
    gap: SPACING.md,
  },
  transportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceVariant,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
  },
  transportIcon: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.lg,
  },
  transportContent: {
    flex: 1,
  },
  transportMode: {
    ...TYPOGRAPHY.heading4,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  transportDescription: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
  },

  // Facilities
  facilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  facilityCard: {
    width: '48%',
    backgroundColor: COLORS.surfaceVariant,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  facilityIcon: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  facilityName: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textPrimary,
    textAlign: 'center',
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  facilitiesNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.warning + '10',
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warning,
  },
  facilitiesNoteText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textPrimary,
    marginLeft: SPACING.md,
    flex: 1,
  },

  // Ropeway
  ropewayNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.info + '10',
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    marginVertical: SPACING.lg,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.info,
  },
  ropewayNoteText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textPrimary,
    marginLeft: SPACING.md,
    flex: 1,
  },

  // Buttons
  bookingButton: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    ...SHADOWS.sm,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
  },
  buttonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.textWhite,
    marginLeft: SPACING.sm,
  },

  // Contact
  contactContainer: {
    gap: SPACING.md,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceVariant,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.lg,
  },
  contactContent: {
    flex: 1,
  },
  contactTitle: {
    ...TYPOGRAPHY.body1,
    color: COLORS.textPrimary,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    marginBottom: SPACING.xs,
  },
  contactNumber: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
  },

  // Explore Section
  exploreSection: {
    margin: SPACING.lg,
    marginTop: SPACING.xl,
  },
  exploreButton: {
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    ...SHADOWS.lg,
  },
  exploreGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.xl,
  },
  exploreText: {
    ...TYPOGRAPHY.heading4,
    color: COLORS.textWhite,
    marginHorizontal: SPACING.md,
  },
});

export default Information;
