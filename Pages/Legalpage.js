import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {Text, Card, Surface} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PremiumGradient from '../Components/common/CustomGradient';
import {COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS} from '../constants/theme';

// Enhanced responsive utilities
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const scale = screenWidth / 375;
const moderateScale = (size, factor = 0.5) => size + (scale - 1) * factor;
const responsiveFontSize = size => moderateScale(size);

// Custom Accordion Component for Legal Content
const LegalAccordion = ({
  title,
  icon,
  children,
  isFirst = false,
  defaultExpanded = false,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [animation] = useState(new Animated.Value(defaultExpanded ? 1 : 0));

  const toggleExpanded = () => {
    const toValue = expanded ? 0 : 1;
    setExpanded(!expanded);

    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const animatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const rotateIcon = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <Surface
      style={[styles.accordionContainer, isFirst && styles.firstAccordion]}>
      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={toggleExpanded}
        activeOpacity={0.7}>
        <View style={styles.accordionTitleContainer}>
          <Icon name={icon} size={24} color={COLORS.primary} />
          <Text style={styles.accordionTitle}>{title}</Text>
        </View>
        <Animated.View style={{transform: [{rotate: rotateIcon}]}}>
          <Icon name="chevron-down" size={24} color={COLORS.textSecondary} />
        </Animated.View>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.accordionContentContainer,
          {
            opacity: animatedHeight,
            maxHeight: expanded ? 2000 : 0,
          },
        ]}>
        <View style={styles.accordionContent}>{children}</View>
      </Animated.View>
    </Surface>
  );
};

const Legalpage = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <PremiumGradient
        colors={[COLORS.primary, COLORS.primaryLight]}
        direction="horizontal"
        style={styles.header}>
        <View style={styles.headerContent}>
          <Icon name="shield-check" size={28} color={COLORS.textWhite} />
          <Text style={styles.headerTitle}>Legal & Privacy</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Privacy Policy and Terms of Use
        </Text>
      </PremiumGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Privacy Policy Accordion */}
        <LegalAccordion
          title="🛡️ Privacy Policy"
          icon="shield-outline"
          isFirst={true}
          defaultExpanded={false}>
          <Text style={styles.lastUpdated}>Last updated: July 21, 2025</Text>

          <Text style={styles.introText}>
            Maihar Darshan ("we", "our", or "the app") is committed to
            protecting your privacy. This Privacy Policy outlines how we handle
            any information in relation to the use of our mobile application.
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Information We Collect</Text>
            <Text style={styles.sectionText}>
              We do not collect, store, or share any personal information from
              our users.
              {'\n\n'}The app:
              {'\n'}• Does not require user sign-in
              {'\n'}• Does not access device location
              {'\n'}• Does not request any personal identifiers (email, phone,
              etc.)
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. How We Use Data</Text>
            <Text style={styles.sectionText}>
              We use Appwrite as a backend service solely to fetch and display
              publicly available hotel listing data. No data is personalized or
              linked to users.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Third-Party Services</Text>
            <Text style={styles.sectionText}>
              The app uses:
              {'\n\n'}• Appwrite – backend-as-a-service for fetching listing
              content
              {'\n\n'}Appwrite does not collect user-identifiable data on our
              behalf.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Children's Privacy</Text>
            <Text style={styles.sectionText}>
              We do not knowingly collect or solicit data from children under
              the age of 13. The app is not directed to children.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Data Security</Text>
            <Text style={styles.sectionText}>
              As no personal data is collected, stored, or transmitted, there
              are no known vectors of personal data leakage or risk.
            </Text>
          </View>

          <View style={styles.contactSection}>
            <Text style={styles.sectionTitle}>6. Contact</Text>
            <Text style={styles.contactText}>
              If you have any concerns or questions, reach out at:
              {'\n'}📧 kshitiz.gwl2k@gmail.com
            </Text>
          </View>
        </LegalAccordion>

        {/* Terms of Use Accordion */}
        <LegalAccordion
          title="📜 Terms of Use"
          icon="file-document-outline"
          defaultExpanded={false}>
          <Text style={styles.lastUpdated}>Last updated: July 21, 2025</Text>

          <Text style={styles.introText}>
            By using Maihar Darshan App, you agree to the following terms:
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Usage</Text>
            <Text style={styles.sectionText}>
              The app is provided "as is" and is free to use for browsing hotel
              listings.
              {'\n\n'}You may not use the app to conduct any unlawful activity.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Data Accuracy</Text>
            <Text style={styles.sectionText}>
              The hotel data displayed is retrieved from a backend database.
              {'\n\n'}While we strive for accuracy, we do not guarantee the
              correctness, availability, or completeness of any listing.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. No Liability</Text>
            <Text style={styles.sectionText}>
              We are not responsible for any actions you take based on the
              information provided in the app.
              {'\n\n'}We are not affiliated with the hotels listed unless
              explicitly mentioned.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Intellectual Property</Text>
            <Text style={styles.sectionText}>
              The UI/UX, brand, and app logic are intellectual property of the
              developer.
              {'\n\n'}You may not copy, distribute, or reverse engineer any part
              of the app.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Termination</Text>
            <Text style={styles.sectionText}>
              We reserve the right to remove access to the app at any time
              without prior notice.
            </Text>
          </View>
        </LegalAccordion>

        {/* Footer Contact */}
        <Card style={styles.footerCard}>
          <Card.Content style={styles.footerContent}>
            <Icon name="email-outline" size={24} color={COLORS.primary} />
            <View style={styles.footerText}>
              <Text style={styles.footerTitle}>Need Help?</Text>
              <Text style={styles.footerSubtitle}>
                For any questions or concerns about these policies, contact us
                at kshitiz.gwl2k@gmail.com
              </Text>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // Header Styles
  header: {
    paddingTop: moderateScale(SPACING.xl),
    paddingBottom: moderateScale(SPACING.xl),
    paddingHorizontal: moderateScale(SPACING.lg),
    borderBottomLeftRadius: moderateScale(RADIUS.xl),
    borderBottomRightRadius: moderateScale(RADIUS.xl),
    ...SHADOWS.lg,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(SPACING.sm),
  },
  headerTitle: {
    ...TYPOGRAPHY.heading1,
    fontSize: responsiveFontSize(TYPOGRAPHY.heading1.fontSize),
    color: COLORS.textWhite,
    marginLeft: moderateScale(SPACING.md),
    fontWeight: 'bold',
  },
  headerSubtitle: {
    ...TYPOGRAPHY.body1,
    fontSize: responsiveFontSize(TYPOGRAPHY.body1.fontSize),
    color: COLORS.textWhite,
    textAlign: 'center',
    opacity: 0.9,
  },

  // Content
  content: {
    flex: 1,
    paddingHorizontal: moderateScale(SPACING.lg),
    paddingTop: moderateScale(SPACING.lg),
    paddingBottom: moderateScale(SPACING.xl),
  },

  // Accordion Styles
  accordionContainer: {
    marginBottom: moderateScale(SPACING.lg),
    borderRadius: moderateScale(RADIUS.lg),
    backgroundColor: COLORS.surface,
    overflow: 'hidden',
    ...SHADOWS.sm,
  },
  firstAccordion: {
    marginTop: moderateScale(SPACING.sm),
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(SPACING.lg),
    paddingVertical: moderateScale(SPACING.lg),
    backgroundColor: COLORS.surface,
  },
  accordionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  accordionTitle: {
    ...TYPOGRAPHY.heading3,
    fontSize: responsiveFontSize(TYPOGRAPHY.heading3.fontSize),
    color: COLORS.textPrimary,
    marginLeft: moderateScale(SPACING.md),
    fontWeight: 'bold',
  },
  accordionContentContainer: {
    overflow: 'hidden',
  },
  accordionContent: {
    paddingHorizontal: moderateScale(SPACING.lg),
    paddingBottom: moderateScale(SPACING.lg),
  },

  // Content Styles
  lastUpdated: {
    ...TYPOGRAPHY.caption,
    fontSize: responsiveFontSize(TYPOGRAPHY.caption.fontSize),
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    marginBottom: moderateScale(SPACING.lg),
  },
  introText: {
    ...TYPOGRAPHY.body1,
    fontSize: responsiveFontSize(TYPOGRAPHY.body1.fontSize),
    color: COLORS.textSecondary,
    lineHeight: responsiveFontSize(TYPOGRAPHY.body1.fontSize * 1.4),
    marginBottom: moderateScale(SPACING.xl),
  },
  section: {
    marginBottom: moderateScale(SPACING.lg),
  },
  sectionTitle: {
    ...TYPOGRAPHY.heading4,
    fontSize: responsiveFontSize(TYPOGRAPHY.heading4.fontSize),
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: moderateScale(SPACING.sm),
  },
  sectionText: {
    ...TYPOGRAPHY.body2,
    fontSize: responsiveFontSize(TYPOGRAPHY.body2.fontSize),
    color: COLORS.textSecondary,
    lineHeight: responsiveFontSize(TYPOGRAPHY.body2.fontSize * 1.4),
  },
  contactSection: {
    backgroundColor: COLORS.primary + '10',
    borderRadius: moderateScale(RADIUS.md),
    padding: moderateScale(SPACING.lg),
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
    marginBottom: moderateScale(SPACING.sm),
  },
  contactText: {
    ...TYPOGRAPHY.body2,
    fontSize: responsiveFontSize(TYPOGRAPHY.body2.fontSize),
    color: COLORS.textPrimary,
    lineHeight: responsiveFontSize(TYPOGRAPHY.body2.fontSize * 1.4),
  },

  // Footer
  footerCard: {
    marginTop: moderateScale(SPACING.xl),
    marginBottom: moderateScale(SPACING.xl),
    borderRadius: moderateScale(RADIUS.lg),
    ...SHADOWS.md,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(SPACING.lg),
  },
  footerText: {
    marginLeft: moderateScale(SPACING.md),
    flex: 1,
  },
  footerTitle: {
    ...TYPOGRAPHY.heading4,
    fontSize: responsiveFontSize(TYPOGRAPHY.heading4.fontSize),
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    marginBottom: moderateScale(SPACING.xs),
  },
  footerSubtitle: {
    ...TYPOGRAPHY.body2,
    fontSize: responsiveFontSize(TYPOGRAPHY.body2.fontSize),
    color: COLORS.textSecondary,
    lineHeight: responsiveFontSize(TYPOGRAPHY.body2.fontSize * 1.3),
  },
});

export default Legalpage;
