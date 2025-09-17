import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Text} from 'react-native-paper';
import PremiumGradient from './common/CustomGradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS} from '../constants/theme';
import {useLanguage} from '../contexts/LanguageContext';
import {getTranslatedText} from '../constants/translations';

const {width, height} = Dimensions.get('window');

function Homepageview({navigation}) {
  const {language, toggleLanguage} = useLanguage();

  return (
    <PremiumGradient
      colors={[COLORS.gradientStart, COLORS.gradientEnd]}
      direction="diagonal"
      style={styles.container}>
      {/* Background Overlay */}
      <View style={styles.overlay} />

      {/* Content */}
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('../assets/Maihar_Darshan_Logo.jpg')}
            />
            <View style={styles.imageOverlay} />
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.mainTitle}>
              {/* {getTranslatedText('MAIHAR DARSHAN', language)} */}
              {getTranslatedText(' मैहर दर्शन', language)}
            </Text>
            <Text style={styles.subtitle}>
              {/* {getTranslatedText(
                'Your Gateway to Sharda Mata Temple',
                language,
              )} */}
              {getTranslatedText(
                'शारदा माता मंदिर में आपका स्वागत है',
                language,
              )}
            </Text>
            <View style={styles.divider} />
            <Text style={styles.description}>
              {/* {getTranslatedText(
                'Discover hotels, temple information, and everything you need for your spiritual journey',
                language,
              )} */}
              {getTranslatedText(
                'होटल, मंदिर की जानकारी और अपनी आध्यात्मिक यात्रा के लिए आवश्यक सभी चीजें खोजें',
                language,
              )}
            </Text>
          </View>
        </View>

        {/* Action Buttons Grid */}
        <View style={styles.buttonGridContainer}>
          {/* Row 1 */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.gridButton, styles.templeButton]}
              onPress={() => navigation.navigate('Information')}
              activeOpacity={0.8}>
              <PremiumGradient
                colors={[COLORS.accent, COLORS.accentLight]}
                direction="horizontal"
                style={styles.buttonGradient}>
                <Icon name="home-variant" size={20} color={COLORS.textWhite} />
                <Text style={styles.gridButtonText}>
                  {getTranslatedText('मंदिर की जानकारी', language)}
                </Text>
              </PremiumGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.gridButton, styles.hotelButton]}
              onPress={() => navigation.navigate('View')}
              activeOpacity={0.8}>
              <PremiumGradient
                colors={[COLORS.secondary, COLORS.secondaryLight]}
                direction="horizontal"
                style={styles.buttonGradient}>
                <Icon name="home-city" size={20} color={COLORS.textWhite} />
                <Text style={styles.gridButtonText}>
                  {getTranslatedText('होटल खोजें', language)}
                </Text>
              </PremiumGradient>
            </TouchableOpacity>
          </View>

          {/* Row 2 */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.gridButton, styles.transportButton]}
              onPress={() => navigation.navigate('Transport')}
              activeOpacity={0.8}>
              <PremiumGradient
                colors={[COLORS.success, '#2ECC71']}
                direction="horizontal"
                style={styles.buttonGradient}>
                <Icon name="bus" size={20} color={COLORS.textWhite} />
                <Text style={styles.gridButtonText}>
                  {getTranslatedText('मैहर कैसे पहुंचे ', language)}
                </Text>
              </PremiumGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.gridButton, styles.eventsButton]}
              onPress={() => navigation.navigate('Events')}
              activeOpacity={0.8}>
              <PremiumGradient
                colors={[COLORS.warning, '#F1C40F']}
                direction="horizontal"
                style={styles.buttonGradient}>
                <Icon name="calendar-star" size={20} color={COLORS.textWhite} />
                <Text style={styles.gridButtonText}>
                  {getTranslatedText(' मंदिर  कैसे पहुंचे ', language)}
                </Text>
              </PremiumGradient>
            </TouchableOpacity>
          </View>

          {/* Row 3 */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.gridButton, styles.guideButton]}
              onPress={() => navigation.navigate('Guide')}
              activeOpacity={0.8}>
              <PremiumGradient
                colors={[COLORS.info, '#5DADE2']}
                direction="horizontal"
                style={styles.buttonGradient}>
                <Icon
                  name="map-marker-path"
                  size={20}
                  color={COLORS.textWhite}
                />
                <Text style={styles.gridButtonText}>
                  {getTranslatedText(' अन्य स्थान ', language)}
                </Text>
              </PremiumGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.gridButton, styles.contactButton]}
              onPress={() => navigation.navigate('Contact')}
              activeOpacity={0.8}>
              <PremiumGradient
                colors={[COLORS.error, '#E67E22']}
                direction="horizontal"
                style={styles.buttonGradient}>
                <Icon name="phone" size={20} color={COLORS.textWhite} />
                <Text style={styles.gridButtonText}>
                  {getTranslatedText('संपर्क और सहायता', language)}
                </Text>
              </PremiumGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Language Toggle Section */}
        {/* <View style={styles.languageToggleContainer}>
          <TouchableOpacity
            style={styles.languageToggle}
            onPress={toggleLanguage}
            activeOpacity={0.8}>
            <View style={styles.languageOption}>
              <Text
                style={[
                  styles.languageText,
                  language === 'en' && styles.activeLanguage,
                ]}>
                English
              </Text>
            </View>
            <View style={styles.languageDivider}>
              <Text style={styles.dividerText}>|</Text>
            </View>
            <View style={styles.languageOption}>
              <Text
                style={[
                  styles.languageText,
                  language === 'hi' && styles.activeLanguage,
                ]}>
                हिंदी
              </Text>
            </View>
          </TouchableOpacity>
        </View> */}

        {/* Subtle Legal Footer Link */}
        <View style={styles.legalFooter}>
          <TouchableOpacity
            style={styles.legalLink}
            onPress={() => navigation.navigate('Legal')}
            activeOpacity={0.7}>
            <Icon name="shield-outline" size={16} color={COLORS.textWhite} />
            <Text style={styles.legalLinkText}>
              {getTranslatedText('Privacy & Terms', language)}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </PremiumGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING['4xl'],
    paddingBottom: SPACING['4xl'], // Normal bottom padding
  },
  headerSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING['3xl'],
  },
  imageContainer: {
    position: 'relative',
    marginBottom: SPACING['3xl'],
  },
  image: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: RADIUS['2xl'],
    ...SHADOWS.lg,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: RADIUS['2xl'],
  },
  titleContainer: {
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  mainTitle: {
    fontSize: TYPOGRAPHY.fontSize['4xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.textWhite,
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: SPACING.md,
  },
  divider: {
    width: 60,
    height: 3,
    backgroundColor: COLORS.secondaryLight,
    borderRadius: RADIUS.full,
    marginBottom: SPACING.md,
  },
  description: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.textWhite,
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: TYPOGRAPHY.lineHeight.relaxed * TYPOGRAPHY.fontSize.base,
    paddingHorizontal: SPACING.md,
  },
  // Grid Button Styles
  buttonGridContainer: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.xl,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  gridButton: {
    flex: 1,
    marginHorizontal: SPACING.xs,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    ...SHADOWS.md,
    minHeight: 80,
  },
  buttonGradient: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    flex: 1,
  },
  gridButtonText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    textAlign: 'center',
    marginTop: SPACING.xs,
    letterSpacing: 0.3,
    lineHeight: TYPOGRAPHY.lineHeight.tight * TYPOGRAPHY.fontSize.sm,
  },
  // Button specific styles
  templeButton: {
    // Purple gradient already defined in component
  },
  hotelButton: {
    // Orange gradient already defined in component
  },
  transportButton: {
    // Green gradient already defined in component
  },
  eventsButton: {
    // Yellow gradient already defined in component
  },
  guideButton: {
    // Blue gradient already defined in component
  },
  contactButton: {
    // Red gradient already defined in component
  },
  featureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING['4xl'],
  },
  featurePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    ...SHADOWS.sm,
  },
  featureText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.text,
    marginLeft: SPACING.xs,
  },

  // Subtle Legal Footer Styles
  legalFooter: {
    marginTop: SPACING['3xl'],
    alignItems: 'center',
    paddingBottom: SPACING.md,
  },
  legalLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  legalLinkText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textWhite,
    marginLeft: SPACING.xs,
    opacity: 0.9,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },

  // Language Toggle Styles
  languageToggleContainer: {
    marginTop: SPACING['2xl'],
    marginBottom: SPACING.lg,
    alignItems: 'center',
  },
  languageToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    ...SHADOWS.sm,
  },
  languageOption: {
    paddingHorizontal: SPACING.sm,
  },
  languageText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.textWhite,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    opacity: 0.7,
  },
  activeLanguage: {
    opacity: 1,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
  },
  languageDivider: {
    paddingHorizontal: SPACING.xs,
  },
  dividerText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.textWhite,
    opacity: 0.5,
    fontWeight: TYPOGRAPHY.fontWeight.light,
  },
});

export default Homepageview;
