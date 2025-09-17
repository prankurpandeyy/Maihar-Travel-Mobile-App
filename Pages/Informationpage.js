import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Linking,
} from 'react-native';
import React from 'react';
import Information from '../Components/Information';
import {COLORS} from '../constants/theme';

const Informationpage = ({navigation}) => {
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Information navigation={navigation} />
        {/* <Text
          style={styles.devInfo}
          onPress={() => {
            Linking.openURL(
              'https://in.linkedin.com/in/kshitiz-agrawal-975a87256',
            );
          }}>
          <Text style={{fontWeight: 'bold', color: '#1D9BF0'}}>
            Designed & Developed by Kshitiz Agrawal IIT Indore
          </Text>
        </Text> */}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    height: '100%',
  },

  devInfo: {
    fontSize: 15,
    textAlign: 'center',
    margin: 2,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
});

export default Informationpage;
