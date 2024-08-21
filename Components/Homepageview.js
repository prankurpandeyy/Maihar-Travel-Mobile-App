import {Image, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';

function Homepageview({navigation}) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/matasharda.jpg')}
      />
      <Text variant="displayLarge">MAIHAR TRAVEL</Text>
      <Text variant="titleMedium">An app to navigate to the Maihar City</Text>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.styledButton}
          onPress={() => navigation.navigate('View')}>
          HOTELS
        </Button>
        <Button
          mode="contained"
          style={styles.styledButton}
          onPress={() => navigation.navigate('Information')}>
          TEMPLE INFORMATION
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 400,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonContainer: {
    height: 'auto',
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    // marginTop: 80,
    marginLeft: 80,
  },
  styledButton: {
    marginBottom: 15,
    height: 50,
    width: '80%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  },
});

export default Homepageview;
