import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Button, Card, ActivityIndicator, Text } from 'react-native-paper';
import { Client, Databases, Query } from 'appwrite';
import { API_URL, PROJECT_ID, DATABSE_ID, COLLECTION_ID } from '@env';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '../constants/theme';

const client = new Client().setEndpoint(API_URL).setProject(PROJECT_ID);
const databases = new Databases(client);

const Pagination = () => {
  const [hotelData, setHotelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const dataPerPage = 25;

  const fetchHotelData = async () => {
    try {
    const page1 = await databases.listDocuments(
      'DATABASE_ID',
      'COLLECTION_ID',
      [Query.limit(25), Query.offset(0)],
    );
    setHotelData(page1.documents);
    const total = page1.total;
    setTotalPages(Math.ceil(total / dataPerPage));
    setLoading(false);
    } catch (error) {
      console.error('Error fetching hotel data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotelData();
  }, []);

  const getCurrentPageData = () => {
    const start = (currentPage - 1) * dataPerPage;
    const end = start + dataPerPage;
    return hotelData.slice(start, end);
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.hotelName}>{item.HotelName || 'Hotel Name'}</Text>
        <Text style={styles.hotelDetails}>
          Price: ₹{item.HotelRentMin} - ₹{item.HotelRentMax}
        </Text>
      </Card.Content>
    </Card>
  );

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button
          key={i}
          mode={i === currentPage ? 'contained' : 'outlined'}
          onPress={() => setCurrentPage(i)}
          style={[
            styles.pageButton,
            i === currentPage ? styles.activePageButton : styles.inactivePageButton
          ]}
          labelStyle={[
            styles.pageButtonText,
            i === currentPage ? styles.activePageText : styles.inactivePageText
          ]}>
          {i}
        </Button>,
      );
    }
    return pageNumbers;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading hotels...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
          <FlatList
        data={getCurrentPageData()}
            renderItem={renderItem}
        keyExtractor={item => item.$id?.toString() || Math.random().toString()}
        contentContainerStyle={styles.listContainer}
      />

      <View style={styles.paginationContainer}>
            <Button
              mode="contained"
              disabled={currentPage === 1}
          onPress={() => setCurrentPage(currentPage - 1)}
          style={[
            styles.navButton,
            currentPage === 1 ? styles.disabledButton : styles.enabledButton
          ]}
          labelStyle={styles.navButtonText}>
          Previous
            </Button>

        <View style={styles.pageNumbers}>
            {renderPageNumbers()}
        </View>

            <Button
              mode="contained"
              disabled={currentPage === totalPages}
          onPress={() => setCurrentPage(currentPage + 1)}
          style={[
            styles.navButton,
            currentPage === totalPages ? styles.disabledButton : styles.enabledButton
          ]}
          labelStyle={styles.navButtonText}>
          Next
            </Button>
          </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingText: {
    ...TYPOGRAPHY.body1,
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
  },
  listContainer: {
    paddingBottom: SPACING.xl,
  },
  card: {
    backgroundColor: COLORS.surface,
    marginVertical: SPACING.sm,
    borderRadius: RADIUS.lg,
    ...SHADOWS.sm,
  },
  hotelName: {
    ...TYPOGRAPHY.heading4,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  hotelDetails: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    ...SHADOWS.sm,
  },
  pageNumbers: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navButton: {
    borderRadius: RADIUS.md,
  },
  enabledButton: {
    backgroundColor: COLORS.primary,
  },
  disabledButton: {
    backgroundColor: COLORS.textLight,
  },
  navButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.textWhite,
  },
  pageButton: {
    marginHorizontal: SPACING.xs,
    minWidth: 40,
    borderRadius: RADIUS.md,
  },
  activePageButton: {
    backgroundColor: COLORS.primary,
  },
  inactivePageButton: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
  },
  pageButtonText: {
    ...TYPOGRAPHY.body2,
  },
  activePageText: {
    color: COLORS.textWhite,
  },
  inactivePageText: {
    color: COLORS.textPrimary,
  },
});

export default Pagination;
