import {View, Text, ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import Detailsview from '../Components/Detailsview';
import {COLORS} from '../constants/theme';

const Detailspage = ({navigation}) => {
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Detailsview />
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
export default Detailspage;
