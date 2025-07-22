import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import Homepageview from '../Components/Homepageview';

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
    backgroundColor: 'white',
    height: '100%',
  },
});

export default Homepage;
