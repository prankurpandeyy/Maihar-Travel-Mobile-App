import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PremiumGradient from './common/SafeGradient';
import {COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS} from '../constants/theme';

const Feedback = () => {
  const handleCall = phoneNumber => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleEmail = email => {
    Linking.openURL(`mailto:${email}`);
  };

  const contactMethods = [
    {
      icon: 'shield',
      title: 'Emergency Police',
      subtitle: 'MP Police Dial: 100',
      type: 'phone',
      value: '100',
      color: COLORS.error,
    },
    {
      icon: 'badge-account',
      title: 'Maihar Police Station',
      subtitle: '07674232047',
      type: 'phone',
      value: '07674232047',
      color: COLORS.primary,
    },
    {
      icon: 'phone',
      title: 'General Support',
      subtitle: 'Call Us: 111-223-3445',
      type: 'phone',
      value: '111-223-3445',
      color: COLORS.secondary,
    },
    {
      icon: 'email',
      title: 'Feedback',
      subtitle: 'feedback@example.com',
      type: 'email',
      value: 'feedback@example.com',
      color: COLORS.info,
    },
    {
      icon: 'email-outline',
      title: 'Grievance',
      subtitle: 'grievance@example.com',
      type: 'email',
      value: 'grievance@example.com',
      color: COLORS.warning,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="message-text" size={24} color={COLORS.primary} />
        <Text style={styles.title}>Feedback & Grievance</Text>
      </View>

      <Text style={styles.subtitle}>
        Get in touch with us for support, feedback, or emergency assistance
      </Text>

      <View style={styles.contactContainer}>
        {contactMethods.map((contact, index) => (
          <TouchableOpacity
            key={index}
            style={styles.contactCard}
            onPress={() =>
              contact.type === 'phone'
                ? handleCall(contact.value)
                : handleEmail(contact.value)
            }
            activeOpacity={0.7}>
            <View
              style={[
                styles.iconContainer,
                {backgroundColor: contact.color + '20'},
              ]}>
              <Icon name={contact.icon} size={24} color={contact.color} />
            </View>

            <View style={styles.contactContent}>
              <Text style={styles.contactTitle}>{contact.title}</Text>
              <Text style={styles.contactSubtitle}>{contact.subtitle}</Text>
            </View>

            <Icon name="chevron-right" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    ...TYPOGRAPHY.heading3,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    marginLeft: SPACING.md,
  },
  subtitle: {
    ...TYPOGRAPHY.body1,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
    lineHeight: 22,
  },

  // Contact Cards
  contactContainer: {
    gap: SPACING.md,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.sm,
  },
  iconContainer: {
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
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  contactSubtitle: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
  },
});

export default Feedback;
