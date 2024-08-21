import {
  Chip,
  React,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Viewpagesearchbar from '../Components/Viewpagesearchbar';
import Viewpagecard from '../Components/Viewpagecard';
import Viewpagefilters from '../Components/Viewpagefilters';
import {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';

const Viewpage = ({navigation}) => {
  const [hotelData, setHotelData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchHotelData = async () => {
    try {
      const response = await fetch(
        'https://cloud.appwrite.io/v1/databases/66b259c60016ac264278/collections/66b2e5f30005a3f43af5/documents',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Appwrite-Project': '66b258b500353050426f', // Your Project ID
          },
        },
      );

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
