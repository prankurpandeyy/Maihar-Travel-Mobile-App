import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Linking} from 'react-native';
import {IconButton} from 'react-native-paper';

const Feedback = () => {
  const handleCall = phoneNumber => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleEmail = email => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Feedback & Grievance</Text>
      <View style={styles.contactContainer}>
        <View style={styles.contactItem}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => handleCall('100')}>
            <IconButton icon="phone" color="#8f5de9" size={24} />
          </TouchableOpacity>
          <Text style={styles.contactText}>MP Police Dial: 100</Text>
        </View>
        <View style={styles.contactItem}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => handleCall('07674232047')}>
            <IconButton icon="phone" color="#8f5de9" size={24} />
          </TouchableOpacity>
          <Text style={styles.contactText}>
            Maihar Police Station: 07674232047
          </Text>
        </View>
        <View style={styles.contactItem}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => handleCall('100')}>
            <IconButton icon="phone" color="#8f5de9" size={24} />
          </TouchableOpacity>
          <Text style={styles.contactText}>Call Us: 111-223-3445</Text>
        </View>
        <View style={styles.contactItem}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => handleEmail('feedback@example.com')}>
            <IconButton icon="email" color="#8f5de9" size={24} />
          </TouchableOpacity>
          <Text style={styles.contactText}>Email Us: feedback@example.com</Text>
        </View>
        <View style={styles.contactItem}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => handleEmail('grievance@example.com')}>
            <IconButton icon="email" color="#8f5de9" size={24} />
          </TouchableOpacity>
          <Text style={styles.contactText}>
            Email Us: grievance@example.com
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 12,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    margin: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  contactContainer: {
    width: '100%',
    paddingHorizontal: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    padding: 10,
    backgroundColor: '#EAF4FF',
    borderRadius: 50,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginRight: 12,
  },
  contactText: {
    fontSize: 16,
    color: '#555',
  },
});

export default Feedback;
