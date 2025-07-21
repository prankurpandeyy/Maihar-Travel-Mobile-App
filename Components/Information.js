import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Animated,
  Dimensions,
  PixelRatio,
  Image,
} from 'react-native';
import {
  Card,
  Portal,
  Modal,
  Button,
  Divider,
  Surface,
  ActivityIndicator,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageView from 'react-native-image-viewing';
import PremiumGradient from './common/CustomGradient';
import OptimizedImage from './common/OptimizedImage';
import InformationSkeleton from './Skeleton/InformationSkeleton';
import {COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS} from '../constants/theme';
import {
  getGalleryImages,
  getTempleImage,
  preloadImages,
} from '../utils/imageUtils';

// Enhanced responsive utilities for all mobile screen sizes
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const scale = screenWidth / 375; // Base iPhone 6/7/8 width
const verticalScale = screenHeight / 667; // Base iPhone 6/7/8 height
const moderateScale = (size, factor = 0.5) => size + (scale - 1) * factor;
const moderateVerticalScale = (size, factor = 0.5) =>
  size + (verticalScale - 1) * factor;

// Device type detection for responsive design
const isSmallDevice = screenWidth < 375; // iPhone SE, small phones
const isMediumDevice = screenWidth >= 375 && screenWidth < 414; // iPhone 6/7/8
const isLargeDevice = screenWidth >= 414 && screenWidth < 768; // iPhone Plus/Max
const isTablet = screenWidth >= 768; // iPad and tablets

// Responsive utilities
const responsiveWidth = percentage => (screenWidth * percentage) / 100;
const responsiveHeight = percentage => (screenHeight * percentage) / 100;
const responsiveFontSize = baseSize => {
  // Ensure we have a valid number, fallback to 16 if undefined
  const fontSize = typeof baseSize === 'number' ? baseSize : 16;

  if (isSmallDevice) return moderateScale(fontSize * 0.9);
  if (isMediumDevice) return moderateScale(fontSize);
  if (isLargeDevice) return moderateScale(fontSize * 1.1);
  return moderateScale(fontSize * 1.2); // Tablet
};

// Custom Accordion Component using React Native Paper
const CustomAccordion = ({title, icon, children, isFirst = false}) => {
  const [expanded, setExpanded] = useState(isFirst);

  return (
    <Surface style={styles.accordionContainer} elevation={2}>
      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}>
        <View style={styles.accordionTitleContainer}>
          <Icon name={icon} size={24} color={COLORS.primary} />
          <Text style={styles.accordionTitle}>{title}</Text>
        </View>
        <Icon
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          color={COLORS.textSecondary}
        />
      </TouchableOpacity>

      {expanded && (
        <Animated.View style={styles.accordionContent}>
          <Divider style={styles.accordionDivider} />
          {children}
        </Animated.View>
      )}
    </Surface>
  );
};

// Info Table Component using React Native Paper
const InfoTable = ({headers, data}) => (
  <Surface style={styles.tableContainer} elevation={1}>
    <View style={styles.tableHeader}>
      {headers.map((header, index) => (
        <Text key={index} style={styles.tableHeaderText}>
          {header}
        </Text>
      ))}
    </View>
    <Divider />
    {data.map((row, index) => (
      <View key={index} style={styles.tableRow}>
        {row.map((cell, cellIndex) => (
          <Text key={cellIndex} style={styles.tableCellText}>
            {cell}
          </Text>
        ))}
      </View>
    ))}
  </Surface>
);

// Helper function to convert local images to proper format for react-native-image-viewing
const convertImageForViewing = imageSource => {
  if (typeof imageSource === 'number') {
    // For local require() images, we need to use Image.resolveAssetSource
    const resolved = Image.resolveAssetSource(imageSource);
    return {
      uri: resolved.uri,
      width: resolved.width,
      height: resolved.height,
    };
  } else if (imageSource && imageSource.uri) {
    // For remote images
    return imageSource;
  } else if (imageSource && imageSource.local) {
    // Handle our custom local image format
    const resolved = Image.resolveAssetSource(imageSource.local);
    return {
      uri: resolved.uri,
      width: resolved.width,
      height: resolved.height,
    };
  }
  return null;
};

// Enhanced Image Gallery Component with react-native-image-viewing
const ImageGallery = ({images, title}) => {
  const [imageViewVisible, setImageViewVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  // Convert gallery images to react-native-image-viewing format
  const viewingImages = images
    .map(img => {
      const converted = convertImageForViewing(img.source);
      return (
        converted || {
          uri: 'https://via.placeholder.com/400x300?text=Image+Not+Found',
        }
      );
    })
    .filter(Boolean); // Remove any null values

  const openImageViewer = index => {
    setImageIndex(index);
    setImageViewVisible(true);
  };

  const renderGalleryItem = (item, index) => (
    <Card
      key={index}
      style={styles.galleryCard}
      onPress={() => openImageViewer(index)}>
      <Card.Cover
        source={item.source}
        style={styles.galleryCardImage}
        resizeMode="cover"
      />
      <Card.Content style={styles.galleryCardContent}>
        <Text style={styles.galleryCardCaption}>{item.caption}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.imageGalleryContainer}>
      <Text style={styles.galleryTitle}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.galleryScrollContainer}>
        {images.map(renderGalleryItem)}
      </ScrollView>

      {/* Professional Image Viewer with proper zoom */}
      <ImageView
        images={viewingImages}
        imageIndex={imageIndex}
        visible={imageViewVisible}
        onRequestClose={() => setImageViewVisible(false)}
        backgroundColor={COLORS.surface}
        swipeToCloseEnabled={true}
        doubleTapToZoomEnabled={true}
        presentationStyle="overFullScreen"
        FooterComponent={({imageIndex}) => (
          <Surface style={styles.imageViewerFooter} elevation={3}>
            <Text style={styles.imageViewerCaption}>
              {images[imageIndex]?.caption}
            </Text>
            <Text style={styles.imageViewerDescription}>
              {images[imageIndex]?.description}
            </Text>
            <Text style={styles.imageViewerCounter}>
              {imageIndex + 1} of {images.length}
            </Text>
          </Surface>
        )}
      />
    </View>
  );
};

// Section Image Component
const SectionImage = ({source, caption, style}) => (
  <Card style={[styles.sectionImageContainer, style]}>
    <Card.Cover
      source={source}
      style={styles.sectionImage}
      resizeMode="cover"
    />
    <Card.Content style={styles.sectionImageCaptionContainer}>
      <Text style={styles.sectionImageCaption}>{caption}</Text>
    </Card.Content>
  </Card>
);

// Hero Image Component
const HeroImage = () => (
  <Card style={styles.heroImageContainer}>
    <Card.Cover
      source={getTempleImage('main-temple')}
      style={styles.heroImage}
      resizeMode="cover"
    />
    <Card.Content style={styles.heroImageOverlay}>
      <Text style={styles.heroImageTitle}>Sharda Mata Temple</Text>
      <Text style={styles.heroImageSubtitle}>
        Sacred Journey to Trikut Hills
      </Text>
    </Card.Content>
  </Card>
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

  // Load temple images using utility functions
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    // Preload critical images for better performance
    preloadImages(['main-temple', 'ropeway', 'temple-stairs']);

    // Load gallery images
    const images = getGalleryImages();
    setGalleryImages(images);
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
          <Icon name="home-city-outline" size={32} color={COLORS.textWhite} />
          <Text style={styles.headerTitle}>TEMPLE INFORMATION</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Complete guide to Sharda Mata Temple
        </Text>
      </PremiumGradient>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <HeroImage />

        {/* Temple Gallery */}
        <ImageGallery images={galleryImages} title="📸 Temple Gallery" />

        {/* History Section */}
        <CustomAccordion
          title="Temple History & Significance"
          icon="book-open-variant"
          isFirst={true}>
          <Card style={styles.historyCard} elevation={1}>
            <Card.Content>
              <Text style={styles.historyText}>
                🏛️ Maihar Devi Temple, dedicated to Goddess Sharda (Saraswati),
                is perched atop the Trikut Hills in Satna district, Madhya
                Pradesh. This ancient temple requires a climb of 1,063 steps or
                a scenic ropeway ride.
              </Text>
              <Text style={styles.historyText}>
                ✨ The temple is associated with Sringeri Mutt and houses
                shrines of Lord Bala Ganapathi, Lord Muruga, and Acharya Sri
                Sankara. It's renowned for hosting three daily pujas and the
                grand 10-day Navarathri festival.
              </Text>
            </Card.Content>
          </Card>

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

        {/* Temple Facilities */}
        <CustomAccordion title="Temple Facilities" icon="star-circle">
          {/* Basic Facilities Grid */}
          <View style={styles.facilitiesGrid}>
            {facilities.map((facility, index) => (
              <Surface key={index} style={styles.facilityCard} elevation={2}>
                <View
                  style={[
                    styles.facilityIcon,
                    {backgroundColor: facility.color + '15'},
                  ]}>
                  <Icon name={facility.icon} size={24} color={facility.color} />
                </View>
                <Text style={styles.facilityName}>{facility.name}</Text>
              </Surface>
            ))}
          </View>

          {/* Detailed Facility Information */}
          <Card style={styles.detailedFacilities} elevation={1}>
            <Card.Content>
              <Text style={styles.facilitiesHeader}>🚶‍♂️ Access to Temple</Text>

              <View style={styles.facilityDetail}>
                <View style={styles.facilityDetailHeader}>
                  <Icon name="stairs" size={20} color={COLORS.primary} />
                  <Text style={styles.facilityDetailTitle}>Temple Stairs</Text>
                </View>

                <SectionImage
                  source={getTempleImage('stairs')}
                  caption="1,063 stone steps with rest points and railings"
                  style={{marginBottom: SPACING.md}}
                />

                <Text style={styles.facilityDetailText}>
                  • <Text style={styles.boldText}>1,063 steps</Text> to reach
                  the main temple from the base{'\n'}• Well-maintained stone
                  steps with railings{'\n'}• Rest points available every 200-300
                  steps
                  {'\n'}• Average climbing time: 45-60 minutes{'\n'}• Early
                  morning climb recommended (cooler temperature)
                </Text>
              </View>

              <Divider style={styles.facilityDivider} />

              <View style={styles.facilityDetail}>
                <View style={styles.facilityDetailHeader}>
                  <Icon name="gondola" size={20} color={COLORS.secondary} />
                  <Text style={styles.facilityDetailTitle}>
                    Ropeway Alternative
                  </Text>
                </View>

                <Text style={styles.facilityDetailText}>
                  • Modern ropeway system available{'\n'}•{' '}
                  <Text style={styles.boldText}>Journey time: 3-4 minutes</Text>
                  {'\n'}• Scenic aerial view of Trikut Hills{'\n'}• After
                  ropeway: Additional 50 steps to temple{'\n'}• Suitable for
                  elderly and differently-abled pilgrims
                </Text>
              </View>

              <Divider style={styles.facilityDivider} />

              <View style={styles.facilityDetail}>
                <View style={styles.facilityDetailHeader}>
                  <Icon name="food" size={20} color={COLORS.success} />
                  <Text style={styles.facilityDetailTitle}>
                    Annakoot Prasad
                  </Text>
                </View>

                <Text style={styles.facilityDetailText}>
                  • <Text style={styles.boldText}>Free meals</Text> for all
                  devotees{'\n'}• Timing: 12:00 PM to 3:00 PM daily{'\n'}•
                  Simple vegetarian food (rice, dal, sabzi, roti){'\n'}• Tokens
                  required - available at counter{'\n'}• First-come,
                  first-served basis
                </Text>
              </View>

              <Divider style={styles.facilityDivider} />

              <View style={styles.facilityDetail}>
                <View style={styles.facilityDetailHeader}>
                  <Icon name="car" size={20} color={COLORS.info} />
                  <Text style={styles.facilityDetailTitle}>
                    Parking & Transport
                  </Text>
                </View>

                <Text style={styles.facilityDetailText}>
                  • Large parking area at temple base{'\n'}•{' '}
                  <Text style={styles.boldText}>₹20-50</Text> parking fee for
                  cars{'\n'}• Auto-rickshaw and taxi services available{'\n'}•
                  Local bus connectivity from Maihar station{'\n'}• Bicycle
                  parking also available
                </Text>
              </View>

              <Divider style={styles.facilityDivider} />

              <View style={styles.facilityDetail}>
                <View style={styles.facilityDetailHeader}>
                  <Icon name="account-group" size={20} color={COLORS.accent} />
                  <Text style={styles.facilityDetailTitle}>Amenities</Text>
                </View>

                <Text style={styles.facilityDetailText}>
                  • Clean restrooms at base and midway points{'\n'}• Drinking
                  water stations throughout the route{'\n'}• Small shops for
                  prasad and religious items{'\n'}• Cloakroom facility for
                  luggage storage{'\n'}• First aid center with basic medical
                  supplies
                </Text>
              </View>

              <Divider style={styles.facilityDivider} />

              <View style={styles.facilityDetail}>
                <View style={styles.facilityDetailHeader}>
                  <Icon name="shopping" size={20} color={COLORS.warning} />
                  <Text style={styles.facilityDetailTitle}>
                    Prasad & Shopping
                  </Text>
                </View>

                <Text style={styles.facilityDetailText}>
                  • Official prasad counter inside temple{'\n'}• Coconut,
                  sweets, and flower offerings{'\n'}• Religious books and
                  souvenirs{'\n'}• <Text style={styles.boldText}>Avoid</Text>{' '}
                  purchasing from unauthorized vendors{'\n'}• Fixed price list
                  displayed at counters
                </Text>
              </View>

              <View style={styles.facilitiesNote}>
                <Icon name="lightbulb" size={20} color={COLORS.primary} />
                <Text style={styles.facilitiesNoteText}>
                  <Text style={styles.boldText}>Pro Tips:</Text> {'\n'}• Carry
                  water bottle and wear comfortable shoes{'\n'}• Start early
                  morning for cooler weather{'\n'}• Keep ropeway ticket as
                  backup option{'\n'}• Respect temple dress code and photography
                  rules
                </Text>
              </View>
            </Card.Content>
          </Card>
        </CustomAccordion>

        {/* Ropeway Services */}
        <CustomAccordion title="Ropeway Services" icon="gondola">
          <SectionImage
            source={getTempleImage('ropeway')}
            caption="Modern Ropeway System - Scenic 3-4 minute journey"
            style={{marginBottom: SPACING.lg}}
          />

          <InfoTable
            headers={['Day', 'Service', 'Timing']}
            data={ropewayTimings}
          />

          <Card style={styles.ropewayNote} elevation={1}>
            <Card.Content style={styles.ropewayNoteContent}>
              <Icon name="information-outline" size={20} color={COLORS.info} />
              <Text style={styles.ropewayNoteText}>
                After the ropeway, climb approximately 50 stairs to reach the
                temple. Book tickets online or offline at the Ropeway Center.
              </Text>
            </Card.Content>
          </Card>

          <Button
            mode="contained"
            onPress={() => Linking.openURL('https://www.bookmeriride.com/')}
            style={styles.bookingButton}
            contentStyle={styles.bookingButtonContent}
            icon="ticket">
            Book Ropeway Tickets
          </Button>
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
                title: 'Admin Mata Sharda Temple',
                number: '+917400506920',
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

        {/* Bottom Spacing for better scroll experience */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // Header Styles
  header: {
    paddingTop: moderateVerticalScale(SPACING['2xl']),
    paddingBottom: moderateVerticalScale(SPACING.xl),
    paddingHorizontal: moderateScale(SPACING.lg),
    borderBottomLeftRadius: moderateScale(RADIUS.xl),
    borderBottomRightRadius: moderateScale(RADIUS.xl),
    ...SHADOWS.lg,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateVerticalScale(SPACING.xs),
  },
  headerTitle: {
    ...TYPOGRAPHY.heading1,
    fontSize: responsiveFontSize(TYPOGRAPHY.heading1.fontSize),
    color: COLORS.textWhite,
    marginLeft: moderateScale(SPACING.md),
    flex: 1,
    lineHeight: responsiveFontSize(TYPOGRAPHY.heading1.fontSize * 1.2),
  },
  headerSubtitle: {
    ...TYPOGRAPHY.body1,
    fontSize: responsiveFontSize(TYPOGRAPHY.body1.fontSize),
    color: COLORS.textWhite,
    opacity: 0.9,
    marginTop: moderateVerticalScale(SPACING.xs),
    lineHeight: responsiveFontSize(TYPOGRAPHY.body1.fontSize * 1.3),
  },

  // Content
  content: {
    flex: 1,
    paddingHorizontal: moderateScale(SPACING.lg),
    paddingTop: moderateVerticalScale(SPACING.lg),
  },

  // Accordion Styles
  accordionContainer: {
    marginBottom: moderateVerticalScale(SPACING.lg),
    borderRadius: moderateScale(RADIUS.lg),
    backgroundColor: COLORS.surface,
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(SPACING.lg),
    paddingVertical: moderateVerticalScale(SPACING.lg),
    backgroundColor: COLORS.surface,
  },
  accordionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  accordionTitle: {
    ...TYPOGRAPHY.heading4,
    fontSize: responsiveFontSize(TYPOGRAPHY.heading4.fontSize),
    color: COLORS.textPrimary,
    marginLeft: moderateScale(SPACING.md),
    lineHeight: responsiveFontSize(TYPOGRAPHY.heading4.fontSize * 1.2),
  },
  accordionContent: {
    paddingHorizontal: moderateScale(SPACING.lg),
    paddingBottom: moderateVerticalScale(SPACING.lg),
  },
  accordionDivider: {
    marginBottom: moderateVerticalScale(SPACING.lg),
    backgroundColor: COLORS.divider,
  },

  // Image Gallery - Enhanced for all mobile screens
  imageGalleryContainer: {
    marginTop: moderateVerticalScale(SPACING.lg),
    marginBottom: moderateVerticalScale(SPACING.lg),
  },
  galleryTitle: {
    ...TYPOGRAPHY.heading4,
    fontSize: responsiveFontSize(TYPOGRAPHY.heading4.fontSize),
    color: COLORS.textPrimary,
    marginBottom: moderateVerticalScale(SPACING.md),
  },
  galleryScrollContainer: {
    paddingRight: moderateScale(SPACING.xl), // Increased padding to fully show last image
    paddingLeft: moderateScale(SPACING.lg), // Add left padding for consistency
  },
  galleryCard: {
    width: isSmallDevice
      ? responsiveWidth(75) // Slightly smaller on small devices
      : isTablet
      ? responsiveWidth(35) // Multiple cards visible on tablets
      : responsiveWidth(65), // Standard on medium/large phones
    marginRight: moderateScale(SPACING.md),
    borderRadius: moderateScale(RADIUS.lg),
    overflow: 'hidden',
  },
  galleryCardImage: {
    height: isSmallDevice
      ? moderateVerticalScale(120) // Smaller height on small devices
      : isTablet
      ? moderateVerticalScale(140) // Larger on tablets
      : moderateVerticalScale(130), // Standard height
  },
  galleryCardContent: {
    paddingVertical: moderateVerticalScale(SPACING.sm),
  },
  galleryCardCaption: {
    ...TYPOGRAPHY.body2,
    fontSize: responsiveFontSize(TYPOGRAPHY.body2.fontSize),
    color: COLORS.textPrimary,
    textAlign: 'center',
    lineHeight: responsiveFontSize(TYPOGRAPHY.body2.fontSize * 1.3),
  },

  // Image Viewer Footer
  imageViewerFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.surface,
    paddingHorizontal: moderateScale(SPACING.lg),
    paddingVertical: moderateVerticalScale(SPACING.lg),
    borderTopLeftRadius: moderateScale(RADIUS.lg),
    borderTopRightRadius: moderateScale(RADIUS.lg),
  },
  imageViewerCaption: {
    ...TYPOGRAPHY.heading5,
    fontSize: responsiveFontSize(TYPOGRAPHY.heading5.fontSize),
    color: COLORS.textPrimary,
    marginBottom: moderateVerticalScale(SPACING.xs),
    textAlign: 'center',
  },
  imageViewerDescription: {
    ...TYPOGRAPHY.body2,
    fontSize: responsiveFontSize(TYPOGRAPHY.body2.fontSize),
    color: COLORS.textSecondary,
    marginBottom: moderateVerticalScale(SPACING.xs),
    textAlign: 'center',
    lineHeight: responsiveFontSize(TYPOGRAPHY.body2.fontSize * 1.4),
  },
  imageViewerCounter: {
    ...TYPOGRAPHY.caption,
    fontSize: responsiveFontSize(TYPOGRAPHY.caption.fontSize),
    color: COLORS.textLight,
    textAlign: 'center',
  },

  // Section Image - Responsive sizing
  sectionImageContainer: {
    width: '100%',
    borderRadius: moderateScale(RADIUS.lg),
    overflow: 'hidden',
    marginBottom: moderateVerticalScale(SPACING.md),
  },
  sectionImage: {
    height: isSmallDevice
      ? responsiveHeight(20) // Smaller on small devices
      : isTablet
      ? responsiveHeight(25) // Larger on tablets
      : responsiveHeight(22), // Standard height
  },
  sectionImageCaptionContainer: {
    paddingVertical: moderateVerticalScale(SPACING.sm),
  },
  sectionImageCaption: {
    ...TYPOGRAPHY.caption,
    fontSize: responsiveFontSize(TYPOGRAPHY.caption.fontSize),
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: responsiveFontSize(TYPOGRAPHY.caption.fontSize * 1.3),
  },

  // Hero Image - Responsive for all screen sizes
  heroImageContainer: {
    borderRadius: moderateScale(RADIUS.xl),
    overflow: 'hidden',
    marginBottom: moderateVerticalScale(SPACING.xl),
    position: 'relative',
  },
  heroImage: {
    height: isSmallDevice
      ? responsiveHeight(25) // Smaller on small devices
      : isTablet
      ? responsiveHeight(35) // Larger on tablets
      : responsiveHeight(30), // Standard on medium/large phones
  },
  heroImageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingVertical: moderateVerticalScale(SPACING.lg),
  },
  heroImageTitle: {
    ...TYPOGRAPHY.heading1,
    fontSize: responsiveFontSize(TYPOGRAPHY.heading1.fontSize),
    color: COLORS.textWhite,
    marginBottom: moderateVerticalScale(SPACING.xs),
    textAlign: 'center',
    lineHeight: responsiveFontSize(TYPOGRAPHY.heading1.fontSize * 1.2),
  },
  heroImageSubtitle: {
    ...TYPOGRAPHY.body1,
    fontSize: responsiveFontSize(TYPOGRAPHY.body1.fontSize),
    color: COLORS.textWhite,
    opacity: 0.95,
    textAlign: 'center',
    lineHeight: responsiveFontSize(TYPOGRAPHY.body1.fontSize * 1.3),
  },

  // Table Styles
  tableContainer: {
    borderRadius: moderateScale(RADIUS.md),
    overflow: 'hidden',
    marginTop: moderateVerticalScale(SPACING.md),
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryLight + '20',
    paddingVertical: moderateVerticalScale(SPACING.md),
    paddingHorizontal: moderateScale(SPACING.md),
  },
  tableHeaderText: {
    ...TYPOGRAPHY.body2,
    fontSize: responsiveFontSize(TYPOGRAPHY.body2.fontSize),
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.textPrimary,
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: moderateVerticalScale(SPACING.sm),
    paddingHorizontal: moderateScale(SPACING.md),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  tableCellText: {
    ...TYPOGRAPHY.body2,
    fontSize: responsiveFontSize(TYPOGRAPHY.body2.fontSize),
    color: COLORS.textSecondary,
    flex: 1,
    textAlign: 'center',
    lineHeight: responsiveFontSize(TYPOGRAPHY.body2.fontSize * 1.3),
  },

  // History Card
  historyCard: {
    marginBottom: moderateVerticalScale(SPACING.lg),
    borderRadius: moderateScale(RADIUS.lg),
  },
  historyText: {
    ...TYPOGRAPHY.body1,
    fontSize: responsiveFontSize(TYPOGRAPHY.body1.fontSize),
    color: COLORS.textSecondary,
    lineHeight: responsiveFontSize(TYPOGRAPHY.body1.fontSize * 1.5),
    marginBottom: moderateVerticalScale(SPACING.md),
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

  // Facilities Grid
  facilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: moderateVerticalScale(SPACING.lg),
  },
  facilityCard: {
    width: isSmallDevice
      ? '47%' // 2 columns on small devices
      : isTablet
      ? '30%' // 3 columns on tablets
      : '48%', // 2 columns on medium/large phones
    paddingVertical: moderateVerticalScale(SPACING.md),
    paddingHorizontal: moderateScale(SPACING.sm),
    marginBottom: moderateVerticalScale(SPACING.md),
    alignItems: 'center',
    borderRadius: moderateScale(RADIUS.md),
  },
  facilityIcon: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(24),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateVerticalScale(SPACING.sm),
  },
  facilityName: {
    ...TYPOGRAPHY.caption,
    fontSize: responsiveFontSize(TYPOGRAPHY.caption.fontSize),
    color: COLORS.textPrimary,
    textAlign: 'center',
    lineHeight: responsiveFontSize(TYPOGRAPHY.caption.fontSize * 1.3),
  },

  // Detailed Facilities
  detailedFacilities: {
    borderRadius: moderateScale(RADIUS.lg),
  },
  facilitiesHeader: {
    ...TYPOGRAPHY.heading5,
    fontSize: responsiveFontSize(TYPOGRAPHY.heading5.fontSize),
    color: COLORS.textPrimary,
    marginBottom: moderateVerticalScale(SPACING.lg),
    textAlign: 'center',
  },
  facilityDetail: {
    marginBottom: moderateVerticalScale(SPACING.lg),
  },
  facilityDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateVerticalScale(SPACING.md),
  },
  facilityDetailTitle: {
    ...TYPOGRAPHY.body1,
    fontSize: responsiveFontSize(TYPOGRAPHY.body1.fontSize),
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.textPrimary,
    marginLeft: moderateScale(SPACING.sm),
  },
  facilityDetailText: {
    ...TYPOGRAPHY.body2,
    fontSize: responsiveFontSize(TYPOGRAPHY.body2.fontSize),
    color: COLORS.textSecondary,
    lineHeight: responsiveFontSize(TYPOGRAPHY.body2.fontSize * 1.5),
  },
  facilityDivider: {
    backgroundColor: COLORS.divider,
    marginVertical: moderateVerticalScale(SPACING.lg),
  },
  boldText: {
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.textPrimary,
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

  // Ropeway Note
  ropewayNote: {
    marginVertical: moderateVerticalScale(SPACING.lg),
    borderRadius: moderateScale(RADIUS.md),
    backgroundColor: COLORS.info + '10',
  },
  ropewayNoteContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  ropewayNoteText: {
    ...TYPOGRAPHY.body2,
    fontSize: responsiveFontSize(TYPOGRAPHY.body2.fontSize),
    color: COLORS.textSecondary,
    marginLeft: moderateScale(SPACING.sm),
    flex: 1,
    lineHeight: responsiveFontSize(TYPOGRAPHY.body2.fontSize * 1.4),
  },

  // Booking Button
  bookingButton: {
    marginTop: moderateVerticalScale(SPACING.md),
    borderRadius: moderateScale(RADIUS.md),
  },
  bookingButtonContent: {
    paddingVertical: moderateVerticalScale(SPACING.sm),
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

  bottomSpacing: {
    height: moderateVerticalScale(SPACING['2xl']),
  },
});

export default Information;
