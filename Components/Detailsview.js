import {Linking, ScrollView, StyleSheet, View} from 'react-native';
import DataSpinner from './DataSpinner';
import {color} from '@rneui/base';
import {useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Card,
  Divider,
  IconButton,
  Paragraph,
  Text,
  Title,
} from 'react-native-paper';
import {API_URL, PROJECT_ID} from '@env';

const Detailsview = () => {
  const [hotelData, setHotelData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const route = useRoute();
  const {hotelId} = route.params; // Access hotelId here

  const fetchHotelById = async hotelId => {
    try {
      const response = await fetch(API_URL + '/' + hotelId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Appwrite-Project': PROJECT_ID,
          // Use your API key if required
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch hotel data');
      }

      setIsLoading(true);
      const resData = await response.json();
      setHotelData(resData);
      setIsLoading(false);
      return hotelData;
    } catch (error) {
      console.error('Error fetching hotel data:', error);
    }
  };
  useEffect(() => {
    fetchHotelById(hotelId);
  }, []);
  // Usage

  return (
    <SafeAreaView>
      {isLoading ? (
        <DataSpinner />
      ) : (
        <ScrollView
          contentContainerStyle={{
            padding: 16,
            width: '100%',
            height: 'auto',
          }}>
          <Text style={styles.headertext}>VIEW HOTEL DETAILS</Text>
          <Card>
            <Card.Content>
              <Title style={styles.title}>{hotelData.HotelName}</Title>
              <Paragraph style={styles.paragraph}>
                Location: {hotelData.HotelAddress.toUpperCase()}
              </Paragraph>

              <View style={styles.row}>
                <IconButton icon="food" size={24} />
                <Text style={styles.text}>
                  Food: {hotelData.HotelType.toUpperCase()}
                </Text>
              </View>
              <Divider style={styles.divider} />

              <View style={styles.row}>
                <IconButton icon="currency-usd" size={24} />
                <Text style={styles.text}>
                  Rent: ₹{hotelData.HotelRentMin}-{hotelData.HotelRentMax} Per
                  Day
                </Text>
              </View>
              <Divider style={styles.divider} />

              <View style={styles.row}>
                <IconButton icon="phone" size={24} />
                <Text style={styles.text}>
                  Contact: {hotelData.HotelContact}
                </Text>
              </View>
              <Divider style={styles.divider} />

              <View style={styles.row}>
                <IconButton icon="google-maps" size={24} />
                <Text
                  style={styles.text}
                  onPress={() => Linking.openURL(hotelData.HotelLocation)}>
                  {' '}
                  Location:
                  <Text style={{color: '#1D9BF0'}}>
                    {hotelData.HotelLocation}
                  </Text>
                </Text>
              </View>
              <Divider style={styles.divider} />

              <View style={styles.row}>
                <IconButton icon="bed" size={24} />
                <Text style={styles.text}>
                  Rooms: {hotelData.HotelRoomType.toUpperCase()}
                </Text>
              </View>
              <Divider style={styles.divider} />

              {/* <View style={styles.row}>
                <IconButton icon="check-circle" size={24} />
                <Text style={styles.text}>
                  Facilities:{' '}
                  {Array.isArray(hotelData.HotelFacilties)
                    ? hotelData.HotelFacilties.join(', ').toUpperCase()
                    : 'N/A'}
                </Text>
              </View> */}
              {/* <Divider style={styles.divider} /> */}

              <View style={styles.row}>
                <IconButton icon="car" size={24} />
                <Text style={styles.text}>
                  PARKING:{' '}
                  {Array.isArray(hotelData.HotelFeatures)
                    ? hotelData.HotelFeatures.join(', ').toUpperCase()
                    : 'N/A'}
                </Text>
              </View>
              <Divider style={styles.divider} />

              <View style={styles.row}>
                <IconButton icon="details" size={24} />
                <Text style={styles.text}>
                  Details: {hotelData.HotelDetails.toUpperCase()}
                </Text>
              </View>
            </Card.Content>
            <View style={styles.bottomtextbar}>
              <Text style={styles.bottomtext}>
                If you feel unsafe, please contact Dial 100
              </Text>
              <IconButton
                icon="phone-dial"
                size={30}
                iconColor="#1D9BF0"
                onPress={() => {
                  Linking.openURL('tel:100');
                }}
              />
            </View>
          </Card>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
  },
  headertext: {
    marginBottom: 20,
    textAlign: 'center',
    width: '100%',
  },
  bottomtextbar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirectionr: 'row',
    marginTop: 20,
  },
  bottomtext: {
    color: 'red',
    fontSize: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 18,
    marginLeft: 10,
  },
  divider: {
    marginVertical: 8,
  },
  bottomtextbar: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  bottomtext: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Detailsview;
