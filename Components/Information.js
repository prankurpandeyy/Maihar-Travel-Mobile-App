import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import {List, Divider, Button} from 'react-native-paper';
import PremiumGradient from './common/SafeGradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS} from '../constants/theme';
import InformationSkeleton from './Skeleton/InformationSkeleton';
import Tables from './Tables';
import Facilitycard from './Facilitycard';
import Feedback from './Feedback';
import Howtoreach from './Howtoreach';

const Information = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Show skeleton for 0.8 seconds

    return () => clearTimeout(timer);
  }, []);

  // Mandir Timing Data
  const tableHeadMandirShedule = ['Day', 'Darshan Session', 'Timing'];
  const tableDataMandirTiming = [
    ['Daily', 'Temple Opening Timings', '05:00AM'],
    ['Daily', 'Morning Darshan Timings', '05:00AM--08:00AM'],
    ['Daily', 'Evening Darshan Timings', '04:00PM--09:00PM'],
    ['Daily', 'Temple Closing Timings', '09:00PM'],
  ];
  // Ropway Data
  const tableHeadRopeway = ['Day', 'Ropeway Details', 'Timing'];
  const tableDataRopeway = [
    ['Daily', 'Temple Opening Timings', '05:00AM'],
    ['Daily', 'Morning Ropeway Timings', '05:00AM--08:00AM'],
    ['Daily', 'Evening Ropeway Timings', '04:00PM--09:00PM'],
    ['Daily', 'Temple Closing Timings', '09:00PM'],
  ];

  // Show skeleton while loading
  if (isLoading) {
    return <InformationSkeleton />;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <PremiumGradient
        colors={[COLORS.accent, COLORS.accentLight]}
        direction="diagonal"
        style={styles.header}>
        <View style={styles.headerContent}>
          <Icon name="home-variant" size={32} color={COLORS.textWhite} />
          <Text style={styles.headerTitle}>TEMPLE INFORMATION</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Everything you need to know about Sharda Mata Temple
        </Text>
      </PremiumGradient>

      <ScrollView style={styles.content}>
        <List.AccordionGroup>
          <View style={styles.accordionCard}>
            <List.Accordion
              title="History of the Temple"
              id="1"
              titleStyle={styles.accordionTitle}
              style={styles.accordion}
              descriptionStyle={styles.accordionDescription}
              left={() => (
                <Icon name="book-open" size={24} color={COLORS.primary} />
              )}>
              <View style={styles.accordionContent}>
                <View style={styles.historyCard}>
                  <Text style={styles.historyText}>
                    Maihar Devi Temple in Madhya Pradesh, known locally as
                    Sharda Devi, is a renowned Hindu temple dedicated to Goddess
                    Shakti. Located on Trikut Hills in Satna, it requires
                    pilgrims to climb 1063 steps or use a ropeway. The temple,
                    associated with Sringeri Mutt, features shrines for Lord
                    Bala Ganapathi, Lord Muruga, and Acharya Sri Sankara. It
                    hosts three daily pujas and major festivals, including the
                    10-day Navarathri.
                  </Text>
                </View>

                <View style={styles.tableContainer}>
                  <Text style={styles.tableTitle}>Temple Timings</Text>
                  <Tables
                    tableData={tableDataMandirTiming}
                    tableHead={tableHeadMandirShedule}
                  />
                </View>
              </View>
            </List.Accordion>
          </View>

          <View style={styles.accordionCard}>
            <List.Accordion
              title="How To Reach Temple"
              id="2"
              titleStyle={styles.accordionTitle}
              style={styles.accordion}
              descriptionStyle={styles.accordionDescription}
              left={() => (
                <Icon name="map-marker" size={24} color={COLORS.primary} />
              )}>
              <View style={styles.accordionContent}>
                <Howtoreach />
              </View>
            </List.Accordion>
          </View>

          <View style={styles.accordionCard}>
            <List.Accordion
              title="Facilities"
              id="3"
              titleStyle={styles.accordionTitle}
              style={styles.accordion}
              descriptionStyle={styles.accordionDescription}
              left={() => (
                <Icon name="star-circle" size={24} color={COLORS.primary} />
              )}>
              <View style={styles.accordionContent}>
                <Facilitycard navigation={navigation} />
              </View>
            </List.Accordion>
          </View>

          <View style={styles.accordionCard}>
            <List.Accordion
              title="Ropeway"
              id="4"
              titleStyle={styles.accordionTitle}
              style={styles.accordion}
              descriptionStyle={styles.accordionDescription}
              left={() => (
                <Icon name="tram" size={24} color={COLORS.primary} />
              )}>
              <View style={styles.accordionContent}>
                <View style={styles.tableContainer}>
                  <Text style={styles.tableTitle}>Ropeway Timings</Text>
                  <Tables
                    tableData={tableDataRopeway}
                    tableHead={tableHeadRopeway}
                  />
                </View>

                <View style={styles.ropewayCard}>
                  <View style={styles.noteHeader}>
                    <Icon name="information" size={20} color={COLORS.warning} />
                    <Text style={styles.noteTitle}>Important Note</Text>
                  </View>

                  <Text style={styles.noteText}>
                    Ropeway tickets for Sharda Mata Temple can be booked both
                    online and offline. For offline booking, visit the Ropeway
                    Center in the temple premises. Note that after the ropeway,
                    you will need to climb approximately 50 stairs to reach the
                    temple for darshan.
                  </Text>

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
                      <Text style={styles.buttonText}>
                        Book Ropeway Tickets Online
                      </Text>
                    </PremiumGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </List.Accordion>
          </View>

          <View style={styles.accordionCard}>
            <List.Accordion
              title="Feedback and Grievances"
              id="5"
              titleStyle={styles.accordionTitle}
              style={styles.accordion}
              descriptionStyle={styles.accordionDescription}
              left={() => (
                <Icon name="message-text" size={24} color={COLORS.primary} />
              )}>
              <View style={styles.accordionContent}>
                <Feedback />
              </View>
            </List.Accordion>
          </View>
        </List.AccordionGroup>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // Header Section
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

  // Accordion Cards
  accordionCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.sm,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    ...SHADOWS.md,
  },
  accordion: {
    backgroundColor: 'transparent',
    paddingVertical: SPACING.sm,
  },
  accordionTitle: {
    ...TYPOGRAPHY.heading4,
    color: COLORS.textPrimary,
  },
  accordionContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    backgroundColor: 'transparent',
  },
  accordionDescription: {
    color: COLORS.textSecondary,
  },

  // History Section
  historyCard: {
    backgroundColor: COLORS.surfaceVariant,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  historyText: {
    ...TYPOGRAPHY.body1,
    color: COLORS.textPrimary,
    textAlign: 'justify',
    lineHeight: 24,
  },

  // Table Section
  tableContainer: {
    marginBottom: SPACING.lg,
  },
  tableTitle: {
    ...TYPOGRAPHY.heading4,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },

  // Ropeway Section
  ropewayCard: {
    backgroundColor: COLORS.surfaceVariant,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    marginTop: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  noteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  noteTitle: {
    ...TYPOGRAPHY.heading4,
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
  },
  noteText: {
    ...TYPOGRAPHY.body1,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
    textAlign: 'justify',
    lineHeight: 24,
  },

  // Booking Button
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
});

export default Information;
