import {Chip, React, SafeAreaView, ScrollView} from 'react-native';
import Viewpagesearchbar from '../Components/Viewpagesearchbar';
import Viewpagecard from '../Components/Viewpagecard';
import Viewpagefilters from '../Components/Viewpagefilters';
import {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {API_URL, PROJECT_ID} from '@env';

const Viewpage = ({navigation}) => {
  const [hotelData, setHotelData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchHotelData = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Appwrite-Project': PROJECT_ID, // Your Project ID
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch hotel data');
      }

      const data = await response.json();

      setHotelData(data.documents);
      return data.documents; // Assuming the response has a 'documents' field
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Ensure loading state is set to false after fetching
    }
  };

  const filteredHotelsByName = hotelData.filter(hotel =>
    hotel.HotelName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    fetchHotelData();
  }, []);

  // clear all filters
  const clearFilters = () => {
    setHotelData(hotelData);
    setSearchQuery('');
    fetchHotelData();
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Viewpagesearchbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <Viewpagefilters
          hotelData={hotelData} // Your hotel data from API
          setHotelData={setHotelData}
          fetchHotelData={fetchHotelData}
        />

        <Viewpagecard
          navigation={navigation}
          filteredHotelsByName={filteredHotelsByName}
          isLoading={isLoading}
        />
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

export default Viewpage;
