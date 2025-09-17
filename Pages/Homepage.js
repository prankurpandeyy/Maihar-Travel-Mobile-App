import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import Homepageview from '../Components/Homepageview';
import {COLORS} from '../constants/theme';

const Homepage = ({navigation}) => {
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Homepageview navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    height: '100%',
  },
});

export default Homepage;
