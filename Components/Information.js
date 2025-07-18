import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Animated,
  Image,
  Dimensions,
  Modal,
  FlatList,
  PixelRatio,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PremiumGradient from './common/CustomGradient';
import OptimizedImage from './common/OptimizedImage';
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

// Device categorization for responsive design
const isSmallDevice = screenWidth < 360;
const isMediumDevice = screenWidth >= 360 && screenWidth < 414;
const isLargeDevice = screenWidth >= 414 && screenWidth < 768;
const isTablet = screenWidth >= 768;

// Responsive sizing functions
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

// Image Gallery Component
const ImageGallery = ({images, title}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openImageModal = image => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const renderImageItem = ({item, index}) => (
    <TouchableOpacity
      style={styles.galleryImageContainer}
      onPress={() => openImageModal(item)}
      activeOpacity={0.8}>
      <Image
        source={item.source}
        style={styles.galleryImage}
        resizeMode="cover"
      />
      <View style={styles.imageOverlay}>
        <Icon name="magnify-plus" size={24} color={COLORS.textWhite} />
      </View>
      <Text style={styles.imageCaption}>{item.caption}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.imageGalleryContainer}>
      <Text style={styles.galleryTitle}>{title}</Text>
      <FlatList
        data={images}
        renderItem={renderImageItem}
        keyExtractor={(item, index) => `gallery-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.galleryScrollContainer}
      />

      {/* Full Screen Image Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            onPress={() => setModalVisible(false)}>
            <View style={styles.modalContent}>
              {selectedImage && (
                <>
                  <Image
                    source={selectedImage.source}
                    style={styles.modalImage}
                    resizeMode="contain"
                  />
                  <View style={styles.modalCaption}>
                    <Text style={styles.modalCaptionText}>
                      {selectedImage.caption}
                    </Text>
                    <Text style={styles.modalDescriptionText}>
                      {selectedImage.description}
                    </Text>
                  </View>
                </>
              )}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}>
                <Icon name="close" size={24} color={COLORS.textWhite} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

// Section Image Component
const SectionImage = ({source, caption, style}) => (
  <View style={[styles.sectionImageContainer, style]}>
    <OptimizedImage
      source={source}
      style={styles.sectionImage}
      resizeMode="cover"
    />
    <Text style={styles.sectionImageCaption}>{caption}</Text>
  </View>
);

// Hero Image Component
const HeroImage = () => (
  <View style={styles.heroImageContainer}>
    <OptimizedImage
      source={getTempleImage('main-temple')}
      style={styles.heroImage}
      resizeMode="cover"
    />
    <View style={styles.heroImageOverlay}>
      <Text style={styles.heroImageTitle}>Sharda Mata Temple</Text>
      <Text style={styles.heroImageSubtitle}>
        Sacred Journey to Trikut Hills
      </Text>
    </View>
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
        {/* Hero Image */}
        <HeroImage />

        {/* Temple Gallery */}
        <ImageGallery images={galleryImages} title="📸 Temple Gallery" />

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
          {/* Basic Facilities Grid */}
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

          {/* Detailed Facility Information */}
          <View style={styles.detailedFacilities}>
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
                • <Text style={styles.boldText}>1,063 steps</Text> to reach the
                main temple from the base{'\n'}• Well-maintained stone steps
                with railings{'\n'}• Rest points available every 200-300 steps
                {'\n'}• Average climbing time: 45-60 minutes{'\n'}• Early
                morning climb recommended (cooler temperature)
              </Text>
            </View>

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
                {'\n'}• Scenic aerial view of Trikut Hills{'\n'}• After ropeway:
                Additional 50 steps to temple{'\n'}• Suitable for elderly and
                differently-abled pilgrims
              </Text>
            </View>

            <View style={styles.facilityDetail}>
              <View style={styles.facilityDetailHeader}>
                <Icon name="food" size={20} color={COLORS.success} />
                <Text style={styles.facilityDetailTitle}>Annakoot Prasad</Text>
              </View>
              <Text style={styles.facilityDetailText}>
                • <Text style={styles.boldText}>Free meals</Text> for all
                devotees{'\n'}• Timing: 12:00 PM to 3:00 PM daily{'\n'}• Simple
                vegetarian food (rice, dal, sabzi, roti){'\n'}• Tokens required
                - available at counter{'\n'}• First-come, first-served basis
              </Text>
            </View>

            <View style={styles.facilityDetail}>
              <View style={styles.facilityDetailHeader}>
                <Icon name="car" size={20} color={COLORS.info} />
                <Text style={styles.facilityDetailTitle}>
                  Parking & Transport
                </Text>
              </View>
              <Text style={styles.facilityDetailText}>
                • Large parking area at temple base{'\n'}•{' '}
                <Text style={styles.boldText}>₹20-50</Text> parking fee for cars
                {'\n'}• Auto-rickshaw and taxi services available{'\n'}• Local
                bus connectivity from Maihar station{'\n'}• Bicycle parking also
                available
              </Text>
            </View>

            <View style={styles.facilityDetail}>
              <View style={styles.facilityDetailHeader}>
                <Icon name="account-group" size={20} color={COLORS.accent} />
                <Text style={styles.facilityDetailTitle}>Amenities</Text>
              </View>
              <Text style={styles.facilityDetailText}>
                • Clean restrooms at base and midway points{'\n'}• Drinking
                water stations throughout the route{'\n'}• Small shops for
                prasad and religious items{'\n'}• Cloakroom facility for luggage
                storage{'\n'}• First aid center with basic medical supplies
              </Text>
            </View>

            <View style={styles.facilityDetail}>
              <View style={styles.facilityDetailHeader}>
                <Icon name="shopping" size={20} color={COLORS.warning} />
                <Text style={styles.facilityDetailTitle}>
                  Prasad & Shopping
                </Text>
              </View>
              <Text style={styles.facilityDetailText}>
                • Official prasad counter inside temple{'\n'}• Coconut, sweets,
                and flower offerings{'\n'}• Religious books and souvenirs{'\n'}•{' '}
                <Text style={styles.boldText}>Avoid</Text> purchasing from
                unauthorized vendors{'\n'}• Fixed price list displayed at
                counters
              </Text>
            </View>
          </View>

          <View style={styles.facilitiesNote}>
            <Icon name="lightbulb" size={20} color={COLORS.primary} />
            <Text style={styles.facilitiesNoteText}>
              <Text style={styles.boldText}>Pro Tips:</Text> {'\n'}• Carry water
              bottle and wear comfortable shoes{'\n'}• Start early morning for
              cooler weather{'\n'}• Keep ropeway ticket as backup option{'\n'}•
              Respect temple dress code and photography rules
            </Text>
          </View>
        </CustomAccordion>

        {/* Ropeway Information */}
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

          <View style={styles.ropewayNote}>
            <Icon name="information-outline" size={20} color={COLORS.info} />
            <Text style={styles.ropewayNoteText}>
              After the ropeway, climb approximately 50 stairs to reach the
              temple. Book tickets online or offline at the Ropeway Center.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.bookingButton}
            onPress={() => Linking.openURL('https://www.bookmeriride.com/')}
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

  // Detailed Facilities
  detailedFacilities: {
    marginTop: SPACING.xl,
  },
  facilitiesHeader: {
    ...TYPOGRAPHY.heading4,
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
  },
  facilityDetail: {
    backgroundColor: COLORS.surfaceVariant,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.lg,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  facilityDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  facilityDetailTitle: {
    ...TYPOGRAPHY.heading4,
    color: COLORS.textPrimary,
    marginLeft: SPACING.md,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
  },
  facilityDetailText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textPrimary,
    lineHeight: 22,
  },
  boldText: {
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primary,
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

  // Image Gallery - Responsive for all mobile screens
  imageGalleryContainer: {
    marginTop: moderateVerticalScale(SPACING.lg),
    marginBottom: moderateVerticalScale(SPACING.lg),
  },
  galleryTitle: {
    ...TYPOGRAPHY.heading4,
    fontSize: responsiveFontSize(TYPOGRAPHY.heading4.fontSize),
    color: COLORS.textPrimary,
    marginBottom: moderateVerticalScale(SPACING.md),
    paddingHorizontal: moderateScale(SPACING.lg),
  },
  galleryScrollContainer: {
    paddingHorizontal: moderateScale(SPACING.sm),
  },
  galleryImageContainer: {
    // Responsive gallery image sizing for different devices
    width: isSmallDevice
      ? responsiveWidth(80) // 80% width on small devices
      : isTablet
      ? responsiveWidth(40) // 40% width on tablets (2 images visible)
      : responsiveWidth(70), // 70% width on medium/large phones
    height: isSmallDevice
      ? responsiveWidth(60) // Maintain aspect ratio
      : isTablet
      ? responsiveWidth(30)
      : responsiveWidth(50),
    marginRight: moderateScale(SPACING.lg),
    borderRadius: moderateScale(RADIUS.lg),
    overflow: 'hidden',
    position: 'relative',
    ...SHADOWS.md,
  },
  galleryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ensure proper image scaling
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RADIUS.lg,
  },
  imageCaption: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textWhite,
    textAlign: 'center',
    marginTop: SPACING.xs,
  },

  // Section Image - Responsive sizing
  sectionImageContainer: {
    width: '100%',
    // Responsive height based on device size
    height: isSmallDevice
      ? responsiveHeight(25) // 25% of screen height on small devices
      : isTablet
      ? responsiveHeight(20) // 20% on tablets
      : responsiveHeight(28), // 28% on medium/large phones
    marginBottom: moderateVerticalScale(SPACING.lg),
    borderRadius: moderateScale(RADIUS.lg),
    overflow: 'hidden',
    position: 'relative',
    ...SHADOWS.sm,
  },
  sectionImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  sectionImageCaption: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    ...TYPOGRAPHY.body2,
    fontSize: responsiveFontSize(TYPOGRAPHY.body2.fontSize),
    color: COLORS.textWhite,
    textAlign: 'center',
    padding: moderateScale(SPACING.sm),
    lineHeight: responsiveFontSize(18),
  },

  // Hero Image - Responsive for all screen sizes
  heroImageContainer: {
    width: '100%',
    // Responsive hero image height
    height: isSmallDevice
      ? responsiveHeight(25) // Smaller on small devices to save space
      : isTablet
      ? responsiveHeight(35) // Larger on tablets for impact
      : responsiveHeight(30), // Standard on medium/large phones
    marginBottom: moderateVerticalScale(SPACING.xl),
    borderRadius: moderateScale(RADIUS.xl),
    overflow: 'hidden',
    position: 'relative',
    ...SHADOWS.lg,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroImageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: moderateScale(SPACING.lg),
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderBottomLeftRadius: moderateScale(RADIUS.lg),
    borderBottomRightRadius: moderateScale(RADIUS.lg),
  },
  heroImageTitle: {
    ...TYPOGRAPHY.heading1,
    fontSize: responsiveFontSize(TYPOGRAPHY.heading1.fontSize),
    color: COLORS.textWhite,
    marginBottom: moderateVerticalScale(SPACING.xs),
    lineHeight: responsiveFontSize(TYPOGRAPHY.heading1.fontSize * 1.2),
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  heroImageSubtitle: {
    ...TYPOGRAPHY.body1,
    fontSize: responsiveFontSize(TYPOGRAPHY.body1.fontSize),
    color: COLORS.textWhite,
    opacity: 0.95,
    lineHeight: responsiveFontSize(TYPOGRAPHY.body1.fontSize * 1.3),
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },

  // Modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.8,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: '70%',
    marginBottom: SPACING.md,
  },
  modalCaption: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
  },
  modalCaptionText: {
    ...TYPOGRAPHY.heading4,
    color: COLORS.textWhite,
    marginBottom: SPACING.xs,
  },
  modalDescriptionText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textWhite,
    opacity: 0.8,
  },
  closeButton: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    zIndex: 10,
  },
});

export default Information;
