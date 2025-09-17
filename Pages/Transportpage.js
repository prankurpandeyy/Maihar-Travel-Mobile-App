import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Card, Divider, Surface} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PremiumGradient from '../Components/common/CustomGradient';
import {COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS} from '../constants/theme';
import {useLanguage} from '../contexts/LanguageContext';
import {getTranslatedText} from '../constants/translations';

const Transportpage = ({navigation}) => {
  const {language} = useLanguage();

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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <PremiumGradient
        colors={[COLORS.success, '#2ECC71']}
        direction="diagonal"
        style={styles.header}>
        <View style={styles.headerContent}>
          <Icon name="bus" size={32} color={COLORS.textWhite} />
          <Text style={styles.headerTitle}>मैहर कैसे पहुंचे</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          मैहर पहुंचने के लिए परिवहन विकल्प
        </Text>
      </PremiumGradient>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Transport Options */}
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

          {/* Additional Information */}
          <Card style={styles.infoCard} elevation={2}>
            <Card.Content>
              <View style={styles.infoHeader}>
                <Icon name="information" size={24} color={COLORS.info} />
                <Text style={styles.infoTitle}>महत्वपूर्ण जानकारी</Text>
              </View>
              <Divider style={styles.divider} />
              <Text style={styles.infoText}>
                • मैहर रेलवे स्टेशन से मंदिर तक ऑटो-रिक्शा और टैक्सी सेवाएं
                उपलब्ध हैं{'\n'}• स्थानीय बस सेवा भी चलती है{'\n'}• पार्किंग
                सुविधा मंदिर आधार पर उपलब्ध है{'\n'}• नवरात्रि के दौरान विशेष
                परिवहन व्यवस्था की जाती है
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
  transportContainer: {
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  transportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceVariant,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    ...SHADOWS.md,
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
    lineHeight: TYPOGRAPHY.lineHeight.relaxed * TYPOGRAPHY.fontSize.base,
  },
  infoCard: {
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.xl,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  infoTitle: {
    ...TYPOGRAPHY.heading5,
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
  },
  divider: {
    backgroundColor: COLORS.divider,
    marginBottom: SPACING.md,
  },
  infoText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
    lineHeight: TYPOGRAPHY.lineHeight.relaxed * TYPOGRAPHY.fontSize.base,
  },
});

export default Transportpage;
