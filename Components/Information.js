import React, {useState, useEffect, useCallback} from 'react';
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
import YoutubePlayer from 'react-native-youtube-iframe';
import PremiumGradient from './common/CustomGradient';
import OptimizedImage from './common/OptimizedImage';
import InformationSkeleton from './Skeleton/InformationSkeleton';
import {COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS} from '../constants/theme';
import {YOUTUBE_API_KEY} from '@env';
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

  if (isSmallDevice) {
    return moderateScale(fontSize * 0.9);
  }
  if (isMediumDevice) {
    return moderateScale(fontSize);
  }
  if (isLargeDevice) {
    return moderateScale(fontSize * 1.1);
  }
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

// Enhanced Video Gallery Component with YouTube Data API
const VideoGallery = ({playlistUrl, title}) => {
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Extract playlist ID from URL
  const getPlaylistId = url => {
    const match = url.match(/[?&]list=([^&]+)/);
    return match ? match[1] : null;
  };

  const playlistId = getPlaylistId(playlistUrl);

  // Fetch playlist videos using YouTube Data API
  const fetchPlaylistVideos = useCallback(async () => {
    if (!playlistId || !YOUTUBE_API_KEY) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.items) {
        const videoList = data.items.map(item => ({
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail:
            item.snippet.thumbnails.medium?.url ||
            item.snippet.thumbnails.default?.url,
          publishedAt: item.snippet.publishedAt,
        }));

        setVideos(videoList);
        if (videoList.length > 0) {
          setSelectedVideo(videoList[0]); // Select first video by default
        }
      }
    } catch (error) {
      console.error('Error fetching playlist videos:', error);
    } finally {
      setLoading(false);
    }
  }, [playlistId]);

  useEffect(() => {
    fetchPlaylistVideos();
  }, [fetchPlaylistVideos]);

  const openVideoModal = () => {
    setIsVideoModalVisible(true);
    setPlaying(false);
  };

  const closeVideoModal = () => {
    setIsVideoModalVisible(false);
    setPlaying(false);
  };

  const selectVideo = video => {
    setSelectedVideo(video);
    setPlaying(true);
  };

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  return (
    <View style={styles.videoGalleryContainer}>
      <Text style={styles.galleryTitle}>{title}</Text>

      {/* Video Thumbnail Card */}
      <Card style={styles.videoCard} onPress={openVideoModal}>
        <View style={styles.videoThumbnailContainer}>
          <View style={styles.videoThumbnail}>
            {loading ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
              <Icon
                name="play-circle"
                size={moderateScale(60)}
                color={COLORS.primary}
              />
            )}
            <Text style={styles.videoTitle}>Temple Video Gallery</Text>
            <Text style={styles.videoSubtitle}>
              {loading
                ? 'Loading videos...'
                : videos.length > 0
                ? `${videos.length} temple videos available`
                : 'Watch temple videos and virtual darshan'}
            </Text>
          </View>
        </View>
        <Card.Content style={styles.videoCardContent}>
          <View style={styles.videoInfo}>
            <Icon
              name="youtube"
              size={responsiveFontSize(16)}
              color="#FF0000"
            />
            <Text style={styles.videoInfoText}>
              {loading
                ? 'Loading...'
                : `YouTube Playlist • ${videos.length} videos`}
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Video Modal */}
      <Portal>
        <Modal
          visible={isVideoModalVisible}
          onDismiss={closeVideoModal}
          contentContainerStyle={styles.videoModalContainer}>
          <Surface style={styles.videoModalContent} elevation={5}>
            {/* Modal Header */}
            <View style={styles.videoModalHeader}>
              <Text style={styles.videoModalTitle}>Temple Videos</Text>
              <TouchableOpacity
                onPress={closeVideoModal}
                style={styles.closeButton}>
                <Icon
                  name="close"
                  size={responsiveFontSize(24)}
                  color={COLORS.textPrimary}
                />
              </TouchableOpacity>
            </View>

            {/* Video Content */}
            <View style={styles.videoContainer}>
              {loading ? (
                <View style={styles.videoLoadingContainer}>
                  <ActivityIndicator size="large" color={COLORS.primary} />
                  <Text style={styles.videoLoadingText}>Loading videos...</Text>
                </View>
              ) : videos.length === 0 ? (
                <View style={styles.noVideosContainer}>
                  <Icon
                    name="video-off"
                    size={moderateScale(48)}
                    color={COLORS.textLight}
                  />
                  <Text style={styles.noVideosText}>
                    No videos found in playlist
                  </Text>
                </View>
              ) : (
                <View style={styles.videoContentContainer}>
                  {/* Current Video Player */}
                  {selectedVideo && (
                    <View style={styles.currentVideoSection}>
                      <YoutubePlayer
                        height={isSmallDevice ? 200 : isTablet ? 300 : 250}
                        play={playing}
                        videoId={selectedVideo.id}
                        onChangeState={onStateChange}
                        webViewStyle={styles.youtubeWebView}
                        webViewProps={{
                          allowsFullscreenVideo: true,
                          allowsInlineMediaPlayback: true,
                          mediaPlaybackRequiresUserAction: false,
                        }}
                      />
                      <View style={styles.currentVideoInfo}>
                        <Text
                          style={styles.currentVideoTitle}
                          numberOfLines={2}>
                          {selectedVideo.title}
                        </Text>
                        <Text
                          style={styles.currentVideoDescription}
                          numberOfLines={3}>
                          {selectedVideo.description}
                        </Text>
                      </View>
                    </View>
                  )}

                  {/* Video List */}
                  <View style={styles.videoListSection}>
                    <Text style={styles.videoListTitle}>
                      Temple Videos ({videos.length})
                    </Text>
                    <ScrollView
                      style={styles.videoList}
                      showsVerticalScrollIndicator={false}>
                      {videos.map((video, index) => (
                        <TouchableOpacity
                          key={video.id}
                          style={[
                            styles.videoItem,
                            selectedVideo?.id === video.id &&
                              styles.selectedVideoItem,
                          ]}
                          onPress={() => selectVideo(video)}>
                          <Image
                            source={{uri: video.thumbnail}}
                            style={styles.videoThumbnailImage}
                            resizeMode="cover"
                          />
                          <View style={styles.videoItemContent}>
                            <Text
                              style={styles.videoItemTitle}
                              numberOfLines={2}>
                              {video.title}
                            </Text>
                            <View style={styles.videoItemMeta}>
                              <Icon
                                name="play-circle"
                                size={14}
                                color={COLORS.primary}
                              />
                              <Text style={styles.videoItemIndex}>
                                Video {index + 1}
                              </Text>
                            </View>
                          </View>
                          {selectedVideo?.id === video.id && (
                            <Icon
                              name="check-circle"
                              size={20}
                              color={COLORS.primary}
                            />
                          )}
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                </View>
              )}
            </View>

            {/* Modal Footer */}
            <View style={styles.videoModalFooter}>
              <Button
                mode="outlined"
                onPress={() =>
                  Linking.openURL(
                    selectedVideo
                      ? `https://youtube.com/watch?v=${selectedVideo.id}`
                      : playlistUrl,
                  )
                }
                icon="open-in-new"
                style={styles.openYouTubeButtonFullWidth}
                labelStyle={styles.openYouTubeButtonText}>
                {selectedVideo ? 'Open Video' : 'Open Playlist'}
              </Button>
            </View>
          </Surface>
        </Modal>
      </Portal>
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
      <Text style={styles.heroImageTitle}>शारदा माता मंदिर</Text>
      <Text style={styles.heroImageSubtitle}>
        त्रिकूट पर्वत की पवित्र यात्रा
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
  // const templeTimings = [
  //   ['Daily', 'Temple Opening', '05:00 AM'],
  //   ['Daily', 'Morning Aarti', '05:00 AM'],
  //   ['Daily', 'Afternoon Aarti', '01:00 PM'],
  //   ['Daily', 'Evening Aarti', '07:00 PM'],
  //   ['Daily', 'Temple Closing', '07:00 PM'],
  // ];
  const templeTimings = [
    ['प्रतिदिन', 'मंदिर खुलने का समय', '05:00 AM'],
    ['प्रतिदिन', 'प्रातः आरती', '05:00 AM'],
    ['प्रतिदिन', 'दोपहर आरती', '01:00 PM'],
    ['प्रतिदिन', 'संध्या आरती', '07:00 PM'],
    ['प्रतिदिन', 'मंदिर बंद होने का समय', '07:00 PM'],
  ];

  // const ropewayTimings = [
  //   ['Daily', 'Ropeway Opening', '06:00'],
  //   [
  //     'Note',
  //     'Suspension Info',
  //     'Subject to suspension only during natural calamities or maintenance',
  //   ],
  //   ['Daily', 'Ropeway Closing', '07:00 PM'],
  // ];

  // const facilities = [
  //   {icon: 'food', name: 'Free Meals', color: COLORS.success},
  //   {icon: 'car', name: 'Parking', color: COLORS.primary},
  //   {icon: 'account-group', name: 'Rest Rooms', color: COLORS.secondary},
  //   {icon: 'water', name: 'Drinking Water', color: COLORS.info},
  //   {icon: 'hospital', name: 'Medical Aid', color: COLORS.error},
  //   {icon: 'shopping', name: 'Prasad Shop', color: COLORS.warning},
  // ];

  // const transportOptions = [
  //   {
  //     mode: 'Train',
  //     icon: 'train',
  //     description:
  //       'Maihar is situated on the Manikpur–Katni railway route and is well-connected across India. Special trains are scheduled with additional stoppages during peak seasons like Navratri.',
  //     color: COLORS.primary,
  //   },
  //   {
  //     mode: 'Flight',
  //     icon: 'airplane',
  //     description:
  //       'Maihar is accessible via Rewa Airport (60 km via NH30), Jabalpur Airport (200 km via NH30), and Satna Airport (50 km via NH30). Nearest airports: Khajuraho (106 km), Jabalpur (145 km)',
  //     color: COLORS.accent,
  //   },
  //   {
  //     mode: 'Car',
  //     icon: 'car',
  //     description:
  //       'Maihar is easily reachable via National Highway 30 (NH30) with excellent road connectivity.',
  //     color: COLORS.secondary,
  //   },
  // ];
  const ropewayTimings = [
    ['प्रतिदिन', 'रोपवे खुलने का समय', '06:00 AM'],
    [
      'नोट',
      'निलंबन सूचना',
      'प्राकृतिक आपदा या रखरखाव के दौरान ही रोपवे संचालन निलंबित रहेगा',
    ],
    ['प्रतिदिन', 'रोपवे बंद होने का समय', '07:00 PM'],
  ];

  const facilities = [
    {icon: 'food', name: 'निःशुल्क भोजन', color: COLORS.success},
    {icon: 'car', name: 'पार्किंग', color: COLORS.primary},
    {icon: 'account-group', name: 'विश्राम कक्ष', color: COLORS.secondary},
    {icon: 'water', name: 'पीने का पानी', color: COLORS.info},
    {icon: 'hospital', name: 'चिकित्सा सहायता', color: COLORS.error},
    {icon: 'shopping', name: 'प्रसाद की दुकान', color: COLORS.warning},
  ];

  const transportOptions = [
    {
      mode: 'ट्रेन',
      icon: 'train',
      description:
        'मैहर मणिकपुर–कटनी रेलवे मार्ग पर स्थित है और पूरे भारत से अच्छी तरह जुड़ा हुआ है। विशेष ट्रेनों का संचालन नवरात्रि जैसे प्रमुख अवसरों पर अतिरिक्त ठहराव के साथ किया जाता है।',
      color: COLORS.primary,
    },
    {
      mode: 'उड़ान',
      icon: 'airplane',
      description:
        'मैहर रीवा हवाई अड्डे (60 किमी, NH30 मार्ग से), जबलपुर हवाई अड्डे (200 किमी, NH30 मार्ग से) और सतना हवाई अड्डे (50 किमी, NH30 मार्ग से) से पहुँचा जा सकता है। निकटतम हवाई अड्डे: खजुराहो (106 किमी), जबलपुर (145 किमी)।',
      color: COLORS.accent,
    },
    {
      mode: 'कार',
      icon: 'car',
      description:
        'मैहर राष्ट्रीय राजमार्ग 30 (NH30) के माध्यम से आसानी से पहुँचा जा सकता है और सड़क संपर्क उत्कृष्ट है।',
      color: COLORS.secondary,
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
          {/* <Text style={styles.headerTitle}>TEMPLE INFORMATION</Text> */}
          <Text style={styles.headerTitle}>मंदिर की जानकारी</Text>
        </View>
        {/* <Text style={styles.headerSubtitle}>
          Complete guide to Sharda Mata Temple
        </Text> */}
        <Text style={styles.headerSubtitle}>
          शारदा माता मंदिर की पूरी जानकारी
        </Text>
      </PremiumGradient>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <HeroImage />

        {/* Temple Gallery */}
        <ImageGallery images={galleryImages} title="📸 मंदिर गैलरी" />

        {/* Video Gallery */}
        <VideoGallery
          playlistUrl="https://www.youtube.com/playlist?list=PLWj4lcD42iGp1pyXUv3nvaxa7l2xW-dpm"
          title="🎥 मंदिर वीडियो"
        />

        {/* History Section */}
        <CustomAccordion
          title="मंदिर का इतिहास और महत्व"
          icon="book-open-variant"
          isFirst={true}>
          <Card style={styles.historyCard} elevation={1}>
            <Card.Content>
              <Text style={styles.historyText}>
                🏛️ मध्य प्रदेश के मैहर ज़िले में त्रिकूट पर्वत की चोटी पर
                विराजमान माँ शारदा (सरस्वती) का प्रसिद्ध मैहर देवी मंदिर
                श्रद्धालुओं की आस्था का केंद्र है। इस प्राचीन धाम तक पहुँचने के
                लिए 1,063 पावन सीढ़ियों का आरोहण करना होता है अथवा रोपवे की
                सुंदर यात्रा द्वारा भी पहुँचा जा सकता है।
              </Text>

              <Text style={styles.historyText}>
                ✨ यह पावन मंदिर श्रींगेरी मठ से सम्बद्ध है और यहाँ भगवान बाल
                गणपति, भगवान मुरुगन तथा आचार्य श्री शंकराचार्य की प्रतिमाएँ
                विराजमान हैं। प्रतिदिन तीन मंगलमयी पूजाएँ संपन्न होती हैं और
                विशेष रूप से 10 दिवसीय भव्य नवरात्रि महोत्सव का आयोजन श्रद्धा और
                उत्साह से किया जाता है|
              </Text>

              <Text style={styles.historyText}>
                🚩 महोबा के 12वीं शताब्दी के वीर योद्धा आल्हा और ऊदल माँ शारदा
                के परम भक्त माने जाते हैं। अनेक युद्धों के पश्चात आल्हा ने मैहर
                की त्रिकूट पर्वत चोटी पर माँ शारदा की प्रतिमा का साक्षात्कार
                किया और आजीवन उनके अनन्य उपासक बने। ऐसा विश्वास है कि माता शारदा
                ने उनकी अटूट श्रद्धा से प्रसन्न होकर उन्हें अमरत्व का आशीर्वाद
                प्रदान किया। आज भी जनश्रुति है कि आल्हा प्रातःकाल मंदिर में
                दर्शन करने आते हैं। मंदिर से लगभग 2 किमी दूर स्थित आल्हा चौकी वह
                पावन स्थल है जहाँ वे तपस्या किया करते थे। यह गाथा मैहर की
                आध्यात्मिक विरासत को शौर्य और भक्ति से जोड़ती है।
              </Text>
            </Card.Content>
          </Card>

          <InfoTable
            headers={['दिन', 'दर्शन अवधि', 'दर्शन समय']}
            data={templeTimings}
          />
        </CustomAccordion>

        {/* How to Reach */}
        {/* <CustomAccordion title="मैहर कैसे पहुँचें" icon="map-marker-path">
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
        </CustomAccordion> */}

        {/* Temple Facilities */}
        <CustomAccordion title="मंदिर की सुविधाएं" icon="star-circle">
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

                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      'https://maps.app.goo.gl/inowXgLQ15Deqdxb6?g_st=aw',
                    )
                  }
                  activeOpacity={0.8}>
                  <SectionImage
                    source={getTempleImage('stairs')}
                    // caption="Tap this image to view the live location on the map"
                    caption="इस चित्र पर टैप करें और नक्शे पर लाइव लोकेशन देखें"
                    style={{marginBottom: SPACING.md}}
                  />
                </TouchableOpacity>

                <Text style={styles.facilityDetailText}>
                  {/* • <Text style={styles.boldText}>1,063 steps</Text> to reach
                  the main temple from the base{'\n'}• Well-maintained stone
                  steps with railings{'\n'}• Rest points available every 200-300
                  steps
                  {'\n'}• Average climbing time: 45-60 minutes{'\n'}• Early
                  morning climb recommended (cooler temperature)
                </Text> */}
                  • <Text style={styles.boldText}>1,063 सीढ़ियाँ</Text> आधार से
                  मुख्य मंदिर तक{'\n'}• रेलिंग सहित अच्छी तरह से बनी पत्थर की
                  सीढ़ियाँ{'\n'}• हर 200-300 सीढ़ियों पर विश्राम स्थल उपलब्ध
                  {'\n'}• औसत चढ़ाई समय: 45-60 मिनट{'\n'}• सुबह-सुबह चढ़ाई करने
                  की सलाह (ठंडा मौसम)
                </Text>
              </View>

              <Divider style={styles.facilityDivider} />

              <View style={styles.facilityDetail}>
                <View style={styles.facilityDetailHeader}>
                  <Icon name="gondola" size={20} color={COLORS.secondary} />
                  {/* <Text style={styles.facilityDetailTitle}>
                    Ropeway Alternative
                  </Text> */}
                  <Text style={styles.facilityDetailTitle}>रोपवे </Text>
                </View>

                <Text style={styles.facilityDetailText}>
                  {/* • Modern ropeway system available{'\n'}•{' '}
                  <Text style={styles.boldText}>
                    Ropway Runs from 6AM to 7PM{' '}
                  </Text>
                  {'\n'}expect during the time of thunderstorm,high winds or
                  maintinace{'\n'} */}
                  • आधुनिक रोपवे की सुविधा उपलब्ध{'\n'}•{' '}
                  <Text style={styles.boldText}>
                    रोपवे सुबह 6 बजे से शाम 7 बजे तक चलता है
                  </Text>
                  {'\n'}• केवल आंधी-तूफ़ान, तेज़ हवा या रखरखाव के समय बंद रहता
                  है|
                </Text>
              </View>

              <Divider style={styles.facilityDivider} />

              <View style={styles.facilityDetail}>
                <View style={styles.facilityDetailHeader}>
                  <Icon name="van-passenger" size={20} color={COLORS.accent} />
                  <Text style={styles.facilityDetailTitle}>वैन सेवा</Text>
                </View>

                <Text style={styles.facilityDetailText}>
                  {/* •{' '}
                  <Text style={styles.boldText}>
                    Operated by Mata Sharda Prabandhak Samiti
                  </Text>{' '}
                  for ₹500{'\n'}• Vans transport devotees from temple base to
                  Shaktital{'\n'}• After van service:{' '}
                  <Text style={styles.boldText}>160-step climb</Text> remaining
                  to reach temple{'\n'}• Convenient option for those who prefer
                  shorter climb {'\n'}•{' '}
                  <Text
                    style={[
                      styles.boldText,
                      {color: 'blue', textDecorationLine: 'underline'},
                    ]}
                    onPress={() =>
                      Linking.openURL(
                        'https://maps.app.goo.gl/Bx7FLjPzDC4M9eG99?g_st=aw',
                      )
                    }>
                    Tap here to view the live location on the map
                  </Text>
                </Text>
              </View> */}
                  •{' '}
                  <Text style={styles.boldText}>
                    माँ शारदा प्रबंधक समिति द्वारा संचालित
                  </Text>{' '}
                  – शुल्क ₹500{'\n'}• वैन सेवा से भक्त मंदिर आधार से शक्ति ताल
                  तक पहुँच सकते हैं{'\n'}• वैन के बाद{' '}
                  <Text style={styles.boldText}>160 सीढ़ियाँ</Text> शेष रहती हैं
                  {'\n'}• उन भक्तों के लिए सुविधाजनक जो कम चढ़ाई पसंद करते हैं
                  {'\n'}•{' '}
                  <Text
                    style={[
                      styles.boldText,
                      {color: 'blue', textDecorationLine: 'underline'},
                    ]}
                    onPress={() =>
                      Linking.openURL(
                        'https://maps.app.goo.gl/Bx7FLjPzDC4M9eG99?g_st=aw',
                      )
                    }>
                    यहाँ टैप करें और नक्शे पर लाइव लोकेशन देखें
                  </Text>
                </Text>
              </View>
              <Divider style={styles.facilityDivider} />

              <View style={styles.facilityDetail}>
                <View style={styles.facilityDetailHeader}>
                  <Icon name="cash" size={20} color={COLORS.warning} />
                  <Text style={styles.facilityDetailTitle}>टोल संग्रह</Text>
                </View>

                <Text style={styles.facilityDetailText}>
                  •{' '}
                  <Text style={styles.boldText}>
                    माँ शारदा मंदिर परिसर में प्रवेश करते ही
                  </Text>{' '}
                  बंधा बैरियर पर टोल लिया जाता है{'\n'}• वाहन के प्रकार के
                  अनुसार शुल्क अलग-अलग होता है{'\n'}• मंदिर क्षेत्र में आगे जाने
                  से पहले भुगतान आवश्यक है
                </Text>
              </View>

              <Divider style={styles.facilityDivider} />

              <View style={styles.facilityDetail}>
                <View style={styles.facilityDetailHeader}>
                  <Icon name="food" size={20} color={COLORS.success} />
                  <Text style={styles.facilityDetailTitle}>अन्नकूट प्रसाद</Text>
                </View>

                <Text style={styles.facilityDetailText}>
                  • सभी भक्तों के लिए{' '}
                  <Text style={styles.boldText}>निःशुल्क भोजन</Text>
                  {'\n'}• समय: दोपहर 12:00 से 3:00 बजे तक प्रतिदिन{'\n'}• साधारण
                  शाकाहारी भोजन (चावल, दाल, सब्ज़ी, रोटी){'\n'}• टोकन आवश्यक –
                  काउंटर पर उपलब्ध{'\n'}• पहले आओ पहले पाओ के आधार पर
                </Text>
              </View>

              <Divider style={styles.facilityDivider} />

              <View style={styles.facilityDetail}>
                <View style={styles.facilityDetailHeader}>
                  <Icon name="car" size={20} color={COLORS.info} />
                  <Text style={styles.facilityDetailTitle}>
                    पार्किंग एवं परिवहन
                  </Text>
                </View>

                <Text style={styles.facilityDetailText}>
                  • मंदिर आधार पर बड़ा पार्किंग क्षेत्र{'\n'}• कारों के लिए{' '}
                  <Text style={styles.boldText}>₹20-50</Text> पार्किंग शुल्क
                  {'\n'}• ऑटो-रिक्शा और टैक्सी सेवाएँ उपलब्ध{'\n'}• मैहर स्टेशन
                  से स्थानीय बस सेवा{'\n'}• साइकिल पार्किंग भी उपलब्ध
                </Text>
              </View>

              <Divider style={styles.facilityDivider} />

              <View style={styles.facilityDetail}>
                <View style={styles.facilityDetailHeader}>
                  <Icon name="account-group" size={20} color={COLORS.accent} />
                  <Text style={styles.facilityDetailTitle}>सुविधाएँ</Text>
                </View>

                <Text style={styles.facilityDetailText}>
                  • आधार और मार्ग के बीच साफ-सुथरे शौचालय{'\n'}• पूरे मार्ग पर
                  पीने के पानी की व्यवस्था{'\n'}• प्रसाद व धार्मिक वस्तुओं की
                  छोटी दुकानें{'\n'}• सामान रखने हेतु क्लोक रूम{'\n'}• प्राथमिक
                  उपचार केंद्र व दवाइयों की व्यवस्था
                </Text>
              </View>

              <Divider style={styles.facilityDivider} />

              <View style={styles.facilityDetail}>
                <View style={styles.facilityDetailHeader}>
                  <Icon name="shopping" size={20} color={COLORS.warning} />
                  <Text style={styles.facilityDetailTitle}>
                    प्रसाद एवं खरीदारी
                  </Text>
                </View>

                <Text style={styles.facilityDetailText}>
                  • मंदिर परिसर में अधिकृत प्रसाद काउंटर{'\n'}• नारियल, मिठाई
                  एवं पुष्प अर्पण सामग्री{'\n'}• धार्मिक पुस्तकें व स्मृति चिन्ह
                  {'\n'}•{' '}
                  <Text style={styles.boldText}>
                    अनधिकृत विक्रेताओं से खरीदारी न करें
                  </Text>
                  {'\n'}• सभी काउंटरों पर मूल्य सूची प्रदर्शित है
                </Text>
              </View>

              <View style={styles.facilitiesNote}>
                <Icon name="lightbulb" size={20} color={COLORS.primary} />
                <Text style={styles.facilitiesNoteText}>
                  <Text style={styles.boldText}>विशेष सुझाव::</Text> • पानी की
                  बोतल साथ रखें{'\n'}• सुबह जल्दी यात्रा प्रारंभ करें (ठंडा
                  मौसम){'\n'}• रोपवे टिकट बैकअप के रूप में रखें{'\n'}• मंदिर के
                  वस्त्र नियम और फोटोग्राफी नियमों का पालन करें {'\n'} •
                  सीढ़ियाँ दो भागों में विभाजित हैं: बाईं ओर चढ़ने के लिए और दाईं
                  ओर उतरने के लिए। कृपया इस नियम का पालन करें; उल्लंघन पर भारी
                  जुर्माना लगाया जाएगा {'\n'}•किसी भी प्रकार की अफवाह न फैलाये
                  और न ही किसी अफवाह पर विश्वास करे मंदिर समिति द्वारा लिए गए
                  निर्णय ही सर्वमान्य होते है {'\n'}• मंदिर पूरी तरह से प्रशासन
                  की निगरानी में रहता है और कार्य करता है|
                </Text>
              </View>
            </Card.Content>
          </Card>
        </CustomAccordion>

        {/* Ropeway Services */}
        {/* <CustomAccordion title="Ropeway Services" icon="gondola">
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
          </Card> */}

        {/* <Button
            mode="contained"
            onPress={() => Linking.openURL('https://www.bookmeriride.com/')}
            style={styles.bookingButton}
            contentStyle={styles.bookingButtonContent}
            icon="ticket">
            Book Ropeway Tickets
          </Button> */}
        {/* </CustomAccordion> */}

        {/* Contact & Emergency */}
        <CustomAccordion title="संपर्क एवं सहायता" icon="phone-alert">
          <View style={styles.contactContainer}>
            {[
              {
                title: 'Emergency Support',
                number: '100',
                icon: 'shield-alert',
                color: COLORS.error,
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
              <Icon name="home-city" size={26} color={COLORS.textWhite} />
              <Text style={styles.exploreText}>आस-पास के होटल देखें</Text>
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

  // Video Gallery - Enhanced for temple videos
  videoGalleryContainer: {
    marginTop: moderateVerticalScale(SPACING.lg),
    marginBottom: moderateVerticalScale(SPACING.lg),
  },
  videoCard: {
    marginHorizontal: moderateScale(SPACING.lg),
    borderRadius: moderateScale(RADIUS.lg),
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  videoThumbnailContainer: {
    height: isSmallDevice
      ? moderateVerticalScale(140)
      : isTablet
      ? moderateVerticalScale(180)
      : moderateVerticalScale(160),
    backgroundColor: COLORS.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoThumbnail: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoTitle: {
    ...TYPOGRAPHY.heading5,
    fontSize: responsiveFontSize(TYPOGRAPHY.heading5.fontSize),
    color: COLORS.textPrimary,
    marginTop: moderateVerticalScale(SPACING.sm),
    textAlign: 'center',
  },
  videoSubtitle: {
    ...TYPOGRAPHY.body2,
    fontSize: responsiveFontSize(TYPOGRAPHY.body2.fontSize),
    color: COLORS.textSecondary,
    marginTop: moderateVerticalScale(SPACING.xs),
    textAlign: 'center',
    paddingHorizontal: moderateScale(SPACING.lg),
  },
  videoCardContent: {
    paddingVertical: moderateVerticalScale(SPACING.sm),
  },
  videoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoInfoText: {
    ...TYPOGRAPHY.caption,
    fontSize: responsiveFontSize(TYPOGRAPHY.caption.fontSize),
    color: COLORS.textSecondary,
    marginLeft: moderateScale(SPACING.xs),
  },

  // Video Modal
  videoModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(SPACING.md),
  },
  videoModalContent: {
    width: '100%',
    height: isSmallDevice
      ? responsiveHeight(80)
      : isTablet
      ? responsiveHeight(85)
      : responsiveHeight(82),
    borderRadius: moderateScale(RADIUS.lg),
    overflow: 'hidden',
  },
  videoModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(SPACING.lg),
    paddingVertical: moderateVerticalScale(SPACING.md),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  videoModalTitle: {
    ...TYPOGRAPHY.heading4,
    fontSize: responsiveFontSize(TYPOGRAPHY.heading4.fontSize),
    color: COLORS.textPrimary,
  },
  closeButton: {
    padding: moderateScale(SPACING.xs),
  },
  videoContainer: {
    flex: 1,
    position: 'relative',
  },
  videoLoadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    zIndex: 1,
  },
  videoLoadingText: {
    ...TYPOGRAPHY.body2,
    fontSize: responsiveFontSize(TYPOGRAPHY.body2.fontSize),
    color: COLORS.textSecondary,
    marginTop: moderateVerticalScale(SPACING.sm),
  },
  youtubeWebView: {
    backgroundColor: COLORS.surface,
    borderRadius: moderateScale(RADIUS.md),
  },
  noVideosContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateVerticalScale(SPACING.xl),
  },
  noVideosText: {
    ...TYPOGRAPHY.body2,
    fontSize: responsiveFontSize(TYPOGRAPHY.body2.fontSize),
    color: COLORS.textLight,
    marginTop: moderateVerticalScale(SPACING.sm),
    textAlign: 'center',
  },
  videoContentContainer: {
    flex: 1,
  },
  currentVideoSection: {
    marginBottom: moderateVerticalScale(SPACING.md),
  },
  currentVideoInfo: {
    paddingHorizontal: moderateScale(SPACING.md),
    paddingVertical: moderateVerticalScale(SPACING.sm),
  },
  currentVideoTitle: {
    ...TYPOGRAPHY.heading5,
    fontSize: responsiveFontSize(TYPOGRAPHY.heading5.fontSize),
    color: COLORS.textPrimary,
    marginBottom: moderateVerticalScale(SPACING.xs),
  },
  currentVideoDescription: {
    ...TYPOGRAPHY.body2,
    fontSize: responsiveFontSize(TYPOGRAPHY.body2.fontSize),
    color: COLORS.textSecondary,
    lineHeight: responsiveFontSize(TYPOGRAPHY.body2.fontSize * 1.3),
  },
  videoListSection: {
    flex: 1,
    paddingHorizontal: moderateScale(SPACING.md),
  },
  videoListTitle: {
    ...TYPOGRAPHY.heading5,
    fontSize: responsiveFontSize(TYPOGRAPHY.heading5.fontSize),
    color: COLORS.textPrimary,
    marginBottom: moderateVerticalScale(SPACING.sm),
  },
  videoList: {
    flex: 1,
    maxHeight: isSmallDevice ? 200 : isTablet ? 300 : 250,
  },
  videoItem: {
    flexDirection: 'row',
    paddingVertical: moderateVerticalScale(SPACING.sm),
    paddingHorizontal: moderateScale(SPACING.sm),
    marginBottom: moderateVerticalScale(SPACING.xs),
    borderRadius: moderateScale(RADIUS.md),
    backgroundColor: COLORS.surface,
    alignItems: 'center',
  },
  selectedVideoItem: {
    backgroundColor: COLORS.primaryContainer,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  videoThumbnailImage: {
    width: moderateScale(80),
    height: moderateVerticalScale(60),
    borderRadius: moderateScale(RADIUS.sm),
    marginRight: moderateScale(SPACING.sm),
  },
  videoItemContent: {
    flex: 1,
    marginRight: moderateScale(SPACING.sm),
  },
  videoItemTitle: {
    ...TYPOGRAPHY.body2,
    fontSize: responsiveFontSize(TYPOGRAPHY.body2.fontSize),
    color: COLORS.textPrimary,
    fontWeight: '500',
    marginBottom: moderateVerticalScale(SPACING.xs),
  },
  videoItemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoItemIndex: {
    ...TYPOGRAPHY.caption,
    fontSize: responsiveFontSize(TYPOGRAPHY.caption.fontSize),
    color: COLORS.textSecondary,
    marginLeft: moderateScale(SPACING.xs),
  },
  videoModalFooter: {
    paddingHorizontal: moderateScale(SPACING.lg),
    paddingVertical: moderateVerticalScale(SPACING.md),
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  openYouTubeButtonFullWidth: {
    borderColor: COLORS.primary,
    width: '100%',
  },
  openYouTubeButtonText: {
    color: COLORS.primary,
    fontSize: responsiveFontSize(14),
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
