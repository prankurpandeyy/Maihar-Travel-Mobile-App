import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image as RNImage,
} from 'react-native';
import React from 'react';
import {Card, Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PremiumGradient from '../Components/common/CustomGradient';
import OptimizedImage from '../Components/common/OptimizedImage';
import ImageViewing from 'react-native-image-viewing';
import {COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS} from '../constants/theme';
import {useLanguage} from '../contexts/LanguageContext';

const Guidepage = ({navigation}) => {
  useLanguage();
  const [isGalleryVisible, setIsGalleryVisible] = React.useState(false);
  const [galleryImages, setGalleryImages] = React.useState([]);
  const [galleryIndex, setGalleryIndex] = React.useState(0);

  // Normalize any image (require/module or { uri }) to { uri } for ImageViewing
  const toViewingSource = React.useCallback(img => {
    try {
      if (!img) {
        return null;
      }
      if (typeof img === 'number') {
        const resolved = RNImage.resolveAssetSource(img);
        return resolved?.uri ? {uri: resolved.uri} : null;
      }
      if (img.uri) {
        return {uri: img.uri};
      }
      return null;
    } catch (e) {
      return null;
    }
  }, []);

  const normalizeGallery = React.useCallback(
    images => {
      if (!Array.isArray(images)) {
        return [];
      }
      return images.map(toViewingSource).filter(Boolean);
    },
    [toViewingSource],
  );

  // Nearby places sourced from assets. Add/edit description later.
  const nearbyPlaces = [
    {
      key: 'neelkantha_mandir',
      name: 'नीलकंठ मंदिर',
      description:
        'नीलकंठ मंदिर और आश्रम मैहर क्षेत्र में स्थित नीलकंठ मंदिर और आश्रम एक खूबसूरत दर्शन स्थल है। मैहर से करीब 16 से 17 किलोमीटर दूर आप यहां पर घूमने जा सकते है। यहां पर भगवान श्री राधे कृष्ण जी के मंदिर में दर्शन करने को मिलता है। नीलकंड महाराज जी ने नीलकंठ आश्रम में तपस्या की थी। बारिश ऋतु में यहां पर झरने भी देखने के लिए मिलता है, जो बहुत ही खूबसूरत नजारा रहता है।',
      image: require('../assets/neelkantha-mandir-maihar.webp'),
    },
    {
      key: 'badi_khermai_mandir',
      name: 'बड़ी खेरमाई मंदिर',
      description:
        'मैहर में घूमने के लिए बड़ी खेरमाई मंदिर भी एक अच्छा मंदिर है। मान्यता है कि यह शारदा माता की बड़ी बहन हैं और मैहर में शारदा माता के दर्शन करने के बाद इनके दर्शन भी जरूर करने चाहिए। यहां पर विराट भगवानों के मंदिर देखने के लिए मिलते हैं और एक प्राचीन बावली भी देखने को मिलती है।',
      image: require('../assets/badi-khermai-mandir.webp'),
    },
    {
      key: 'oila_mandir',
      name: 'ऑइला मंदिर',
      description:
        'यह मंदिर मैहर के प्रसिद्ध मंदिरों में से एक है। सतना रोड स्थित ऑइला मंदिर दुर्गा जी को समर्पित है। यहां दुर्गा जी की भव्य प्रतिमा, गणेश जी के दर्शन और शिवलिंग भी विराजमान हैं।',
      image: require('../assets/oila-mandir-maihar.webp'),
    },
    {
      key: 'bada_akhada_mandir',
      name: 'बड़ा अखाड़ा मंदिर',
      description:
        'यहां एक बड़ा शिवलिंग मंदिर की छत पर बना हुआ है। बड़ा अखाड़ा मैहर के प्रमुख स्थानों में से एक है। मंदिर के अंदर 108 शिवलिंग विराजमान हैं और गर्भगृह में मुख्य शिवलिंग भी है। मंदिर परिसर में आश्रम भी है, जहां छात्रों को शिक्षा दी जाती है।',
      image: require('../assets/bada-akhada-mandir-maihar.webp'),
    },
    {
      key: 'kjs_icchapurti_mandir',
      name: 'KJS इच्चापुरती मंदिर',
      description:
        'केजेएस फैक्ट्री स्थित, दुर्गा जी को समर्पित इस मंदिर में स्फटिक शिवलिंग, गणेश जी, हनुमान जी, लक्ष्मी जी और श्री राम जी के दर्शन मिलते हैं। मंदिर की खूबसूरत नक्काशी, चारों तरफ हरे-भरे बगीचे और रात में जगमगाती लाइट्स आकर्षण का केंद्र हैं। मंदिर के बाहर एक सुंदर फव्वारा भी है।',
      image: require('../assets/kjs-icchapurti-mandir.webp'),
    },
    {
      key: 'pannikhoh_maihar',
      name: 'पन्नीखोह',
      description:
        'यह जलप्रपात जंगल में स्थित है और वर्षा ऋतु में घूमने के लिए उत्तम स्थान है। पन्नीखोह जलप्रपात तक पैदल जाना पड़ता है क्योंकि यहां तक सड़क मार्ग नहीं है। आल्हा-उदल मंदिर से यह जलप्रपात लगभग 3 से 4 किलोमीटर दूर है।',
      image: require('../assets/pannikhoh-maihar.webp'),
    },
    {
      key: 'golamath_mandir',
      name: 'गोलामठ मंदिर',
      description:
        'गोलामठ मंदिर मैहर (मध्यप्रदेश) में स्थित एक प्राचीन शिव मंदिर है। इसे 10वीं–11वीं शताब्दी में कलचुरी वंश ने बनवाया था। मंदिर पूरी तरह पत्थरों से निर्मित है और नागर शैली की वास्तुकला का उत्तम उदाहरण है। इसमें गर्भगृह, अन्तराल और मुखमंडप हैं तथा प्रवेश द्वार के सामने नंदी की प्रतिमा है।\n\nस्थानीय मान्यता है कि यह मंदिर एक ही रात में बन गया था। यहाँ महाशिवरात्रि पर विशाल मेला और विशेष पूजा-अर्चना होती है। शिवलिंग को सजाने और बेलपत्र, फूल-मालाएँ चढ़ाने की परंपरा है। यह मंदिर मैहर रेलवे स्टेशन से लगभग 2 किमी की दूरी पर, देवीजी रोड स्थित बड़ा अखाड़ा के सामने है।',
      image: require('../assets/golamath-mandir-front.jpg'),
      gallery: [
        require('../assets/golamath-mandir-front.jpg'),
        require('../assets/golamath-mandir-side.jpg'),
      ],
    },
    {
      key: 'mukundpur_tiger_safari',
      name: 'मुकुंदपुर व्हाइट टाइगर सफारी और चिड़ियाघर',
      description:
        'महाराजा मार्तण्ड सिंह जूदेव व्हाइट टाइगर सफारी और चिड़ियाघर रीवा संभाग के मैहर जिले के मुकुंदपुर में स्थित है। यह मैहर से रीवा रोड पर लगभग 40 किलोमीटर की दूरी पर है।\n\nचिड़ियाघर का मुख्य आकर्षण व्हाइट टाइगर सफारी है, जहाँ लोग पवित्र माने जाने वाले सफेद बाघों को देखने का अवसर पाते हैं। सफेद बाघ के अलावा यहाँ लगभग 40 विभिन्न संकटग्रस्त प्रजातियाँ और 60 से अधिक असंकटग्रस्त प्रजातियाँ भी संरक्षित की गई हैं।',
      image: require('../assets/mukundpur-tiger-safari-gate.jpg'),
      gallery: [
        require('../assets/mukundpur-tiger-safari-gate.jpg'),
        require('../assets/white-tiger.webp'),
      ],
    },
    {
      key: 'aalha_talab',
      name: 'आल्हा तालाब',
      description:
        'मैहर त्रिकूट पर्वत के नीचे स्थित आल्हा-उदल तलैया के पास यह स्थान जंगल के बीच स्थित है। यहां एक तलैया है जहां खूबसूरत कमल के फूल खिलते हैं। पिकनिक मनाने के लिए यह एक अच्छा स्थान है। मान्यता है कि रात में जब शारदा माता के मंदिर के पट बंद होते हैं, तो सुबह सबसे पहले आल्हा एवं उदल अदृश्य होकर माता की पूजा करते हैं।',
      image: require('../assets/aalha_talab.jpg'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <PremiumGradient
        colors={[COLORS.info, '#5DADE2']}
        direction="diagonal"
        style={styles.header}>
        <View style={styles.headerContent}>
          <Icon name="book-open-variant" size={32} color={COLORS.textWhite} />
          <Text style={styles.headerTitle}>अन्य स्थान</Text>
        </View>
        <Text style={styles.headerSubtitle}>मैहर के आसपास के दर्शनीय स्थल</Text>
      </PremiumGradient>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Nearby Places - Images first; text can be added later */}
          <Card style={styles.placesCard} elevation={2}>
            <Card.Content>
              <View style={styles.placesHeader}>
                <Icon
                  name="map-marker-multiple"
                  size={24}
                  color={COLORS.secondary}
                />
                <Text style={styles.placesTitle}>आसपास के दर्शनीय स्थल</Text>
              </View>
              <Divider style={styles.divider} />

              {nearbyPlaces.map(place => (
                <View key={place.key} style={styles.placeItem}>
                  <Text style={styles.placeName}>{place.name}</Text>
                  {place.image ? (
                    <View style={styles.placeImageWrapper}>
                      <OptimizedImage
                        source={place.image}
                        style={styles.placeImage}
                        resizeMode="cover"
                        caption={null}
                      />
                    </View>
                  ) : null}
                  {place.description ? (
                    <Text style={styles.placeDescription}>
                      {place.description}
                    </Text>
                  ) : null}
                  {place.gallery && place.gallery.length > 0 ? (
                    <View style={styles.galleryRow}>
                      {place.gallery.map((img, idx) => (
                        <View
                          key={`${place.key}-thumb-${idx}`}
                          style={styles.galleryThumbWrap}>
                          <OptimizedImage
                            source={img}
                            style={styles.galleryThumb}
                            resizeMode="cover"
                            onPress={() => {
                              setGalleryImages(normalizeGallery(place.gallery));
                              setGalleryIndex(idx);
                              setIsGalleryVisible(true);
                            }}
                          />
                        </View>
                      ))}
                    </View>
                  ) : null}
                </View>
              ))}
            </Card.Content>
          </Card>
          <ImageViewing
            images={galleryImages}
            imageIndex={galleryIndex}
            visible={isGalleryVisible}
            onRequestClose={() => setIsGalleryVisible(false)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: SPACING['2xl'],
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    borderBottomLeftRadius: RADIUS.xl,
    borderBottomRightRadius: RADIUS.xl,
    ...SHADOWS.lg,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  headerTitle: {
    ...TYPOGRAPHY.heading1,
    color: COLORS.textWhite,
    marginLeft: SPACING.md,
    flex: 1,
  },
  headerSubtitle: {
    ...TYPOGRAPHY.body1,
    color: COLORS.textWhite,
    opacity: 0.9,
    marginTop: SPACING.xs,
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  historyCard: {
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.lg,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  historyTitle: {
    ...TYPOGRAPHY.heading5,
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
  },
  divider: {
    backgroundColor: COLORS.divider,
    marginBottom: SPACING.md,
  },
  historyText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
    lineHeight: TYPOGRAPHY.lineHeight.relaxed * TYPOGRAPHY.fontSize.base,
    marginBottom: SPACING.md,
  },
  placesCard: {
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.lg,
  },
  placesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  placesTitle: {
    ...TYPOGRAPHY.heading5,
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
  },
  placeItem: {
    marginBottom: SPACING.lg,
  },
  placeName: {
    ...TYPOGRAPHY.heading5,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  placeImageWrapper: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.surfaceVariant,
    ...SHADOWS.sm,
  },
  placeImage: {
    width: '100%',
    height: 160,
  },
  placeDescription: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textPrimary,
    lineHeight: TYPOGRAPHY.lineHeight.relaxed * TYPOGRAPHY.fontSize.base,
  },
  galleryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },
  galleryThumbWrap: {
    width: '31%',
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    backgroundColor: COLORS.surfaceVariant,
    ...SHADOWS.sm,
  },
  galleryThumb: {
    width: '100%',
    height: 90,
  },
  culturalCard: {
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.xl,
  },
  culturalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  culturalTitle: {
    ...TYPOGRAPHY.heading5,
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
  },
  culturalText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
    lineHeight: TYPOGRAPHY.lineHeight.relaxed * TYPOGRAPHY.fontSize.base,
  },
});

export default Guidepage;
