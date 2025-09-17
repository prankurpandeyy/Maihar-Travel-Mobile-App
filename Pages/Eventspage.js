import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import {Card, Divider, Surface} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PremiumGradient from '../Components/common/CustomGradient';
import {COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS} from '../constants/theme';
import {useLanguage} from '../contexts/LanguageContext';
import {getTranslatedText} from '../constants/translations';
import {getTempleImage} from '../utils/imageUtils';

const Eventspage = ({navigation}) => {
  const {language} = useLanguage();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <PremiumGradient
        colors={[COLORS.warning, '#F1C40F']}
        direction="diagonal"
        style={styles.header}>
        <View style={styles.headerContent}>
          <Icon name="stairs" size={32} color={COLORS.textWhite} />
          <Text style={styles.headerTitle}>मंदिर कैसे पहुंचे</Text>
        </View>
        <Text style={styles.headerSubtitle}>मंदिर तक पहुंचने के तरीके</Text>
      </PremiumGradient>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Temple Stairs */}
          <Card style={styles.accessCard} elevation={2}>
            <Card.Content>
              <View style={styles.accessHeader}>
                <Icon name="stairs" size={24} color={COLORS.primary} />
                <Text style={styles.accessTitle}>मंदिर की सीढ़ियाँ</Text>
              </View>
              <Divider style={styles.divider} />
              <Text style={styles.accessText}>
                • <Text style={styles.boldText}>1,063 सीढ़ियाँ</Text> आधार से
                मुख्य मंदिर तक{'\n'}• रेलिंग सहित अच्छी तरह से बनी पत्थर की
                सीढ़ियाँ{'\n'}• हर 200-300 सीढ़ियों पर विश्राम स्थल उपलब्ध{'\n'}
                • औसत चढ़ाई समय: 45-60 मिनट{'\n'}• सुबह-सुबह चढ़ाई करने की सलाह
                (ठंडा मौसम)
              </Text>
            </Card.Content>
          </Card>

          {/* Ropeway */}
          <Card style={styles.accessCard} elevation={2}>
            <Card.Content>
              <View style={styles.accessHeader}>
                <Icon name="gondola" size={24} color={COLORS.secondary} />
                <Text style={styles.accessTitle}>रोपवे सेवा</Text>
              </View>
              <Divider style={styles.divider} />
              <Text style={styles.accessText}>
                • आधुनिक रोपवे की सुविधा उपलब्ध{'\n'}•{' '}
                <Text style={styles.boldText}>
                  रोपवे सुबह 6 बजे से शाम 7 बजे तक चलता है
                </Text>
                {'\n'}• केवल आंधी-तूफ़ान, तेज़ हवा या रखरखाव के समय बंद रहता है
                {'\n'}• रोपवे के बाद लगभग 50 सीढ़ियाँ चढ़नी होती हैं
              </Text>
            </Card.Content>
          </Card>

          {/* Van Service */}
          <Card style={styles.accessCard} elevation={2}>
            <Card.Content>
              <View style={styles.accessHeader}>
                <Icon name="van-passenger" size={24} color={COLORS.accent} />
                <Text style={styles.accessTitle}>वैन सेवा</Text>
              </View>
              <Divider style={styles.divider} />
              <Text style={styles.accessText}>
                •{' '}
                <Text style={styles.boldText}>
                  माँ शारदा प्रबंधक समिति द्वारा संचालित
                </Text>{' '}
                – शुल्क ₹500{'\n'}• वैन सेवा से भक्त मंदिर आधार से शक्ति ताल तक
                पहुँच सकते हैं{'\n'}• वैन के बाद{' '}
                <Text style={styles.boldText}>160 सीढ़ियाँ</Text> शेष रहती हैं
                {'\n'}• उन भक्तों के लिए सुविधाजनक जो कम चढ़ाई पसंद करते हैं
              </Text>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    'https://maps.app.goo.gl/Bx7FLjPzDC4M9eG99?g_st=aw',
                  )
                }
                activeOpacity={0.8}
                style={styles.mapLink}
                hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
                <Text style={styles.mapLinkText}>
                  यहाँ टैप करें और नक्शे पर लाइव लोकेशन देखें
                </Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>

          {/* Important Guidelines */}
          <Card style={styles.guidelinesCard} elevation={2}>
            <Card.Content>
              <View style={styles.guidelinesHeader}>
                <Icon name="lightbulb" size={24} color={COLORS.warning} />
                <Text style={styles.guidelinesTitle}>
                  महत्वपूर्ण दिशानिर्देश
                </Text>
              </View>
              <Divider style={styles.divider} />
              <Text style={styles.guidelinesText}>
                • पानी की बोतल साथ रखें{'\n'}• सुबह जल्दी यात्रा प्रारंभ करें
                (ठंडा मौसम){'\n'}• रोपवे टिकट बैकअप के रूप में रखें{'\n'}• मंदिर
                के वस्त्र नियम और फोटोग्राफी नियमों का पालन करें{'\n'}• सीढ़ियाँ
                दो भागों में विभाजित हैं: बाईं ओर चढ़ने के लिए और दाईं ओर उतरने
                के लिए{'\n'}• किसी भी प्रकार की अफवाह न फैलाये और न ही किसी
                अफवाह पर विश्वास करे
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
  accessCard: {
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.lg,
  },
  accessHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  accessTitle: {
    ...TYPOGRAPHY.heading5,
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
  },
  divider: {
    backgroundColor: COLORS.divider,
    marginBottom: SPACING.md,
  },
  accessText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
    lineHeight: TYPOGRAPHY.lineHeight.relaxed * TYPOGRAPHY.fontSize.base,
  },
  boldText: {
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.textPrimary,
  },
  mapLink: {
    marginTop: SPACING.md,
    padding: SPACING.sm,
    backgroundColor: COLORS.primary + '10',
    borderRadius: RADIUS.md,
  },
  mapLinkText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.primary,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  guidelinesCard: {
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.xl,
    backgroundColor: COLORS.warning + '05',
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warning,
  },
  guidelinesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  guidelinesTitle: {
    ...TYPOGRAPHY.heading5,
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
  },
  guidelinesText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
    lineHeight: TYPOGRAPHY.lineHeight.relaxed * TYPOGRAPHY.fontSize.base,
  },
});

export default Eventspage;
