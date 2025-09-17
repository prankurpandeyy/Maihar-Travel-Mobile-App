import {View, Text, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {Card, Divider, Surface} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PremiumGradient from '../Components/common/CustomGradient';
import {COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS} from '../constants/theme';
import {useLanguage} from '../contexts/LanguageContext';
import {getTranslatedText} from '../constants/translations';

const Guidepage = ({navigation}) => {
  const {language} = useLanguage();

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
          {/* Temple History */}
          <Card style={styles.historyCard} elevation={2}>
            <Card.Content>
              <View style={styles.historyHeader}>
                <Icon
                  name="book-open-variant"
                  size={24}
                  color={COLORS.primary}
                />
                <Text style={styles.historyTitle}>
                  मंदिर का इतिहास और महत्व
                </Text>
              </View>
              <Divider style={styles.divider} />
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
                उत्साह से किया जाता है।
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

          {/* Nearby Places */}
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

              <View style={styles.placeItem}>
                <Text style={styles.placeName}>आल्हा चौकी</Text>
                <Text style={styles.placeDescription}>
                  मंदिर से 2 किमी दूर स्थित वह पावन स्थल जहाँ आल्हा और ऊदल
                  तपस्या किया करते थे। यहाँ उनकी स्मृति में एक छोटा मंदिर भी है।
                </Text>
              </View>

              <View style={styles.placeItem}>
                <Text style={styles.placeName}>शक्ति ताल</Text>
                <Text style={styles.placeDescription}>
                  मंदिर के मार्ग में स्थित एक पवित्र तालाब जहाँ भक्त स्नान करके
                  मंदिर जाते हैं। यहाँ से मंदिर तक 160 सीढ़ियाँ हैं।
                </Text>
              </View>

              <View style={styles.placeItem}>
                <Text style={styles.placeName}>त्रिकूट पर्वत</Text>
                <Text style={styles.placeDescription}>
                  मंदिर स्थित इस पर्वत से मैहर शहर का मनोरम दृश्य दिखाई देता है।
                  यहाँ से सूर्योदय और सूर्यास्त का दृश्य अद्भुत है।
                </Text>
              </View>

              <View style={styles.placeItem}>
                <Text style={styles.placeName}>मैहर शहर</Text>
                <Text style={styles.placeDescription}>
                  मंदिर के आसपास का शहर जहाँ भक्तों के लिए आवास, भोजन और अन्य
                  सुविधाएं उपलब्ध हैं। यहाँ कई धार्मिक दुकानें भी हैं।
                </Text>
              </View>
            </Card.Content>
          </Card>

          {/* Cultural Information */}
          <Card style={styles.culturalCard} elevation={2}>
            <Card.Content>
              <View style={styles.culturalHeader}>
                <Icon name="temple-hindu" size={24} color={COLORS.accent} />
                <Text style={styles.culturalTitle}>सांस्कृतिक महत्व</Text>
              </View>
              <Divider style={styles.divider} />
              <Text style={styles.culturalText}>
                • मैहर देवी मंदिर हिंदू धर्म में विशेष महत्व रखता है{'\n'}• यहाँ
                माँ सरस्वती (शारदा) की पूजा की जाती है{'\n'}• नवरात्रि के दौरान
                विशेष पूजा और आरती का आयोजन होता है{'\n'}• यह स्थान शिक्षा और
                ज्ञान के लिए प्रसिद्ध है{'\n'}• कई विद्वान और छात्र यहाँ आकर माँ
                शारदा का आशीर्वाद लेते हैं
              </Text>
            </Card.Content>
          </Card>
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
  placeDescription: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
    lineHeight: TYPOGRAPHY.lineHeight.relaxed * TYPOGRAPHY.fontSize.base,
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
