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

const Contactpage = ({navigation}) => {
  const {language} = useLanguage();

  const contactInfo = [
    {
      title: 'आपातकालीन सहायता',
      number: '100',
      icon: 'shield-alert',
      color: COLORS.error,
      description: 'पुलिस, अग्निशमन और चिकित्सा आपातकाल के लिए',
    },
    {
      title: 'मंदिर कार्यालय',
      number: '07672-252123',
      icon: 'office-building',
      color: COLORS.primary,
      description: 'मंदिर प्रबंधन और सामान्य जानकारी के लिए',
    },
    {
      title: 'पर्यटन सूचना',
      number: '1800-180-2121',
      icon: 'information',
      color: COLORS.info,
      description: 'मध्य प्रदेश पर्यटन विभाग की हेल्पलाइन',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <PremiumGradient
        colors={[COLORS.error, '#E67E22']}
        direction="diagonal"
        style={styles.header}>
        <View style={styles.headerContent}>
          <Icon name="phone" size={32} color={COLORS.textWhite} />
          <Text style={styles.headerTitle}>संपर्क और सहायता</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          आवश्यकता के समय हमसे संपर्क करें
        </Text>
      </PremiumGradient>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Contact Cards */}
          <View style={styles.contactContainer}>
            {contactInfo.map((contact, index) => (
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
                  <Text style={styles.contactDescription}>
                    {contact.description}
                  </Text>
                </View>
                <Icon name="phone" size={20} color={COLORS.textSecondary} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Important Information */}
          <Card style={styles.infoCard} elevation={2}>
            <Card.Content>
              <View style={styles.infoHeader}>
                <Icon name="information" size={24} color={COLORS.info} />
                <Text style={styles.infoTitle}>महत्वपूर्ण जानकारी</Text>
              </View>
              <Divider style={styles.divider} />
              <Text style={styles.infoText}>
                • मंदिर कार्यालय सुबह 6:00 बजे से शाम 8:00 बजे तक खुला रहता है
                {'\n'}• आपातकालीन स्थिति में तुरंत 100 पर कॉल करें{'\n'}• मंदिर
                में प्राथमिक चिकित्सा केंद्र उपलब्ध है{'\n'}• सुरक्षा कर्मी 24
                घंटे मंदिर परिसर में तैनात रहते हैं{'\n'}• नवरात्रि के दौरान
                अतिरिक्त सुरक्षा व्यवस्था की जाती है
              </Text>
            </Card.Content>
          </Card>

          {/* Temple Facilities Contact */}
          <Card style={styles.facilitiesCard} elevation={2}>
            <Card.Content>
              <View style={styles.facilitiesHeader}>
                <Icon name="home-city" size={24} color={COLORS.secondary} />
                <Text style={styles.facilitiesTitle}>मंदिर सुविधाएं</Text>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.facilityItem}>
                <Text style={styles.facilityName}>प्रसाद काउंटर</Text>
                <Text style={styles.facilityInfo}>मंदिर परिसर में उपलब्ध</Text>
              </View>
              <View style={styles.facilityItem}>
                <Text style={styles.facilityName}>पार्किंग सुविधा</Text>
                <Text style={styles.facilityInfo}>
                  मंदिर आधार पर ₹20-50 शुल्क
                </Text>
              </View>
              <View style={styles.facilityItem}>
                <Text style={styles.facilityName}>रोपवे सेवा</Text>
                <Text style={styles.facilityInfo}>
                  सुबह 6:00 - शाम 7:00 बजे
                </Text>
              </View>
              <View style={styles.facilityItem}>
                <Text style={styles.facilityName}>वैन सेवा</Text>
                <Text style={styles.facilityInfo}>₹500 शुल्क पर उपलब्ध</Text>
              </View>
            </Card.Content>
          </Card>

          {/* Support Information */}
          <Card style={styles.supportCard} elevation={2}>
            <Card.Content>
              <View style={styles.supportHeader}>
                <Icon name="help-circle" size={24} color={COLORS.accent} />
                <Text style={styles.supportTitle}>सहायता और सुझाव</Text>
              </View>
              <Divider style={styles.divider} />
              <Text style={styles.supportText}>
                यदि आपको कोई समस्या आ रही है या आपके पास कोई सुझाव है, तो कृपया
                हमसे संपर्क करें। हम आपकी सहायता के लिए हमेशा तैयार हैं।
              </Text>
              <TouchableOpacity
                style={styles.supportButton}
                onPress={() => navigation.navigate('Information')}
                activeOpacity={0.8}>
                <Text style={styles.supportButtonText}>
                  मंदिर की जानकारी देखें
                </Text>
              </TouchableOpacity>
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
  contactContainer: {
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceVariant,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    ...SHADOWS.md,
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
    ...TYPOGRAPHY.heading5,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  contactDescription: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  infoCard: {
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.lg,
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
  facilitiesCard: {
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.lg,
  },
  facilitiesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  facilitiesTitle: {
    ...TYPOGRAPHY.heading5,
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
  },
  facilityItem: {
    marginBottom: SPACING.md,
  },
  facilityName: {
    ...TYPOGRAPHY.body1,
    color: COLORS.textPrimary,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    marginBottom: SPACING.xs,
  },
  facilityInfo: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
  },
  supportCard: {
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.xl,
  },
  supportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  supportTitle: {
    ...TYPOGRAPHY.heading5,
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
  },
  supportText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
    lineHeight: TYPOGRAPHY.lineHeight.relaxed * TYPOGRAPHY.fontSize.base,
    marginBottom: SPACING.lg,
  },
  supportButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.md,
    alignItems: 'center',
  },
  supportButtonText: {
    ...TYPOGRAPHY.body1,
    color: COLORS.textWhite,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
});

export default Contactpage;
