import React, {useState, useEffect} from 'react';
import {View, FlatList, Text} from 'react-native';
import {Button, Card, ActivityIndicator} from 'react-native-paper';
import {Client, Databases, Query} from 'appwrite';
import {API_URL, PROJECT_ID, DATABSE_ID, COLLECTION_ID} from '@env'; // Import environment variables

const client = new Client().setEndpoint(API_URL).setProject(PROJECT_ID);
const databases = new Databases(client);

const Pagination = () => {
  const [hotelData, setHotelData] = useState([]); // Holds hotel data
  const [loading, setLoading] = useState(true); // Loading state
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(0); // Total pages
  const dataPerPage = 25; // Items per page
  // GETDATA

  const fetchHotelData = async () => {
    const page1 = await databases.listDocuments(
      'DATABASE_ID',
      'COLLECTION_ID',
      [Query.limit(25), Query.offset(0)],
    );
    setHotelData(page1.documents);
    const total = page1.total;
    setTotalPages(Math.ceil(total / dataPerPage));
    setLoading(false);
  };

  // Fetch hotel data from API
  useEffect(() => {
    fetchHotelData();
  });

  // Calculate and return the data for the current page
  const getCurrentPageData = () => {
    const start = (currentPage - 1) * dataPerPage;
    const end = start + dataPerPage;
    return hotelData.slice(start, end); // Slice the hotel data array to get the current page data
  };

  // Render each hotel item
  const renderItem = () => (
    <Card style={{margin: 10}}>
      <Card.Content>
        {/* <Text style={{fontSize: 18}}>{hotelData.name}</Text>{' '} */}
        {/* Ensure the item has a name property */}
      </Card.Content>
    </Card>
  );

  // Render pagination buttons with page numbers
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <Button
          key={i}
          mode={i === currentPage ? 'contained' : 'outlined'}
          onPress={() => setCurrentPage(i)}
          style={{marginHorizontal: 5}}>
          <Text>{i}</Text> {/* Wrap the page number in a Text component */}
        </Button>,
      );
    }
    return pageNumbers;
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      {loading ? (
        <ActivityIndicator animating={true} />
      ) : (
        <>
          {/* List of hotels */}
          <FlatList
            data={getCurrentPageData()} // Use the function to get data for the current page
            renderItem={renderItem}
            keyExtractor={item => item.$id.toString()} // Unique ID from Appwrite
            // Avoid extra styles that might cause scrolling issues
          />

          {/* Pagination controls */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: 20,
            }}>
            {/* Previous button */}
            <Button
              mode="contained"
              disabled={currentPage === 1}
              onPress={() => setCurrentPage(currentPage - 1)}>
              <Text>Prev</Text> {/* Wrap button text in Text component */}
            </Button>

            {/* Page numbers */}
            {renderPageNumbers()}

            {/* Next button */}
            <Button
              mode="contained"
              disabled={currentPage === totalPages}
              onPress={() => setCurrentPage(currentPage + 1)}>
              <Text>Next</Text> {/* Wrap button text in Text component */}
            </Button>
          </View>
        </>
      )}
    </View>
  );
};

export default Pagination;
