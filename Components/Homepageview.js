import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'react-native-paper';
import PremiumGradient from './common/CustomGradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS} from '../constants/theme';

const {width, height} = Dimensions.get('window');

function Homepageview({navigation}) {
  return (
    <PremiumGradient
      colors={[COLORS.gradientStart, COLORS.gradientEnd]}
      direction="diagonal"
      style={styles.container}>
      {/* Background Overlay */}
      <View style={styles.overlay} />

      {/* Content */}
      <View style={styles.content}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={require('../assets/matasharda.jpg')}
      />
            <View style={styles.imageOverlay} />
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.mainTitle}>MAIHAR TRAVEL</Text>
            <Text style={styles.subtitle}>
              Your Gateway to Sharda Mata Temple
            </Text>
            <View style={styles.divider} />
            <Text style={styles.description}>
              Discover hotels, temple information, and everything you need for
              your spiritual journey
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
      <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.primaryButton, styles.hotelButton]}
            onPress={() => navigation.navigate('View')}
            activeOpacity={0.8}>
            <PremiumGradient
              colors={[COLORS.secondary, COLORS.secondaryLight]}
              direction="horizontal"
              style={styles.buttonGradient}>
              <Icon name="home-city" size={24} color={COLORS.textWhite} />
              <Text style={styles.buttonText}>EXPLORE HOTELS</Text>
            </PremiumGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.primaryButton, styles.templeButton]}
            onPress={() => navigation.navigate('Information')}
            activeOpacity={0.8}>
            <PremiumGradient
              colors={[COLORS.accent, COLORS.accentLight]}
              direction="horizontal"
              style={styles.buttonGradient}>
              <Icon name="home-variant" size={24} color={COLORS.textWhite} />
              <Text style={styles.buttonText}>TEMPLE INFO</Text>
            </PremiumGradient>
          </TouchableOpacity>
        </View>

        {/* Feature Pills */}
        <View style={styles.featureContainer}>
          <View style={styles.featurePill}>
            <Icon name="map-marker" size={16} color={COLORS.primary} />
            <Text style={styles.featureText}>Easy Navigation</Text>
          </View>
          <View style={styles.featurePill}>
            <Icon name="phone" size={16} color={COLORS.primary} />
            <Text style={styles.featureText}>Quick Booking</Text>
          </View>
          <View style={styles.featurePill}>
            <Icon name="information" size={16} color={COLORS.primary} />
            <Text style={styles.featureText}>Temple Guide</Text>
          </View>
        </View>
      </View>
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
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING['4xl'],
  },
  headerSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  buttonContainer: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.xl,
  },
  primaryButton: {
    marginBottom: SPACING.lg,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    ...SHADOWS.md,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
  },
  buttonText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    marginLeft: SPACING.sm,
    letterSpacing: 0.5,
  },
  hotelButton: {
    marginBottom: SPACING.md,
  },
  templeButton: {
    marginBottom: SPACING.xl,
  },
  featureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: SPACING.md,
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
});

export default Homepageview;
