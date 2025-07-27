import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  RefreshControl,
} from 'react-native';
import {Text, Snackbar} from 'react-native-paper';
import Viewpagesearchbar from '../Components/Viewpagesearchbar';
import Viewpagecard from '../Components/Viewpagecard';
import Viewpagefilters from '../Components/Viewpagefilters';
import HotelListingSkeleton from '../Components/Skeleton/HotelListingSkeleton';
import {Client, Databases, Query} from 'appwrite';
import {COLORS} from '../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {API_URL, PROJECT_ID, DATABASE_ID, COLLECTION_ID} from '@env';

// Initialize Appwrite Client
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(PROJECT_ID);
const databases = new Databases(client);
const databaseId = DATABASE_ID;
const collectionId = COLLECTION_ID;

// Cache configuration
const CACHE_KEY = 'hotel_data_cache';
const CACHE_EXPIRY_HOURS = 2; // Cache expires after 2 hours

const Viewpage = ({navigation}) => {
  // Core data states
  const [allHotels, setAllHotels] = useState([]); // All hotels from server
  const [filteredData, setFilteredData] = useState([]); // Filtered results
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    priceRange: 'all', // 'all' or 'custom' - simplified to slider only
    customPriceMin: 0, // Always track range values
    customPriceMax: 2000, // Always track range values
    hotelType: 'all', // 'all', 'ac', 'nonac', 'both'
    foodAvailable: 'all', // 'all', 'yes', 'no'
    parkingAvailable: 'all', // 'all', 'yes', 'no'
    showFlagged: false, // true/false
    sortBy: 'name', // 'name' only (removed price-based sorting)
  });

  // Pagination for display (not server pagination)
  const [displayLimit, setDisplayLimit] = useState(20);
  const LOAD_MORE_SIZE = 20;

  // Check if cache is valid
  const isCacheValid = useCallback(async () => {
    try {
      const cachedTimestamp = await AsyncStorage.getItem(
        CACHE_KEY + '_timestamp',
      );
      if (cachedTimestamp) {
        const cacheTime = parseInt(cachedTimestamp);
        const now = Date.now();
        const hoursDiff = (now - cacheTime) / (1000 * 60 * 60);
        return hoursDiff < CACHE_EXPIRY_HOURS;
      }
      return false;
    } catch (error) {
      return false;
    }
  }, []);

  // Load data from cache
  const loadFromCache = useCallback(async () => {
    try {
      const cachedData = await AsyncStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const parsed = JSON.parse(cachedData);
        setAllHotels(parsed);
        return parsed;
      }
      return null;
    } catch (error) {
      return null;
    }
  }, []);

  // Save data to cache
  const saveToCache = useCallback(async data => {
    try {
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
      await AsyncStorage.setItem(
        CACHE_KEY + '_timestamp',
        Date.now().toString(),
      );
    } catch (error) {
      // Silently handle cache save errors
    }
  }, []);

  // Load ALL hotels efficiently (handles 50+ items)
  const loadAllHotels = useCallback(async () => {
    try {
      setError(null);
      const allHotelData = [];
      let hasMore = true;
      let lastId = null;

      // Load hotels in batches to handle Appwrite's limit
      while (hasMore) {
        const queries = [Query.limit(50)]; // Max per request
        if (lastId) {
          queries.push(Query.cursorAfter(lastId));
        }

        const response = await databases.listDocuments(
          databaseId,
          collectionId,
          queries,
        );

        if (response.documents.length > 0) {
          // Deduplicate based on $id
          const newDocs = response.documents.filter(
            newDoc =>
              !allHotelData.some(existing => existing.$id === newDoc.$id),
          );

          allHotelData.push(...newDocs);
          lastId = response.documents[response.documents.length - 1].$id;

          // If we got less than 50, we've reached the end
          hasMore = response.documents.length === 50;
        } else {
          hasMore = false;
        }
      }

      // Save to cache
      await saveToCache(allHotelData);
      setAllHotels(allHotelData);

      return allHotelData;
    } catch (error) {
      console.error('❌ Error loading hotels:', error);
      setError('Failed to load hotels. Please try again.');
      throw error;
    }
  }, [saveToCache]);

  // Initial data load with caching
  const initializeData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Check cache first
      const cacheValid = await isCacheValid();
      let hotelData = null;

      if (cacheValid) {
        hotelData = await loadFromCache();
      }

      if (!hotelData || hotelData.length === 0) {
        hotelData = await loadAllHotels();
      }
    } catch (error) {
      console.error('Failed to initialize data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isCacheValid, loadFromCache, loadAllHotels]);

  // Refresh data (force reload from server)
  const refreshData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await loadAllHotels();
    } catch (error) {
      console.error('Failed to refresh data:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, [loadAllHotels]);

  // Helper function to check if hotel falls within price range - Simplified
  const isHotelInPriceRange = (hotel, customMin, customMax) => {
    const hotelMinPrice = parseInt(hotel.HotelRentMin, 10) || 0;
    const hotelMaxPrice = parseInt(hotel.HotelRentMax, 10) || 0;

    // If hotel doesn't have valid price data, exclude it from price filtering
    if (hotelMinPrice === 0 && hotelMaxPrice === 0) {
      return customMin === 0 && customMax === 2000; // Only show if full range selected
    }

    // Hotel is in range if any part of its price range overlaps with selected range
    return hotelMaxPrice >= customMin && hotelMinPrice <= customMax;
  };

  // Smart filtering with debouncing
  const filteredHotels = useMemo(() => {
    let result = [...allHotels];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        hotel =>
          hotel.HotelName?.toLowerCase().includes(query) ||
          hotel.HotelAddress?.toLowerCase().includes(query),
      );
    }

    // Apply price range filter (always use slider values)
    if (filters.customPriceMin > 0 || filters.customPriceMax < 2000) {
      result = result.filter(hotel =>
        isHotelInPriceRange(
          hotel,
          filters.customPriceMin,
          filters.customPriceMax,
        ),
      );
    }

    // Apply hotel type filter
    if (filters.hotelType !== 'all') {
      result = result.filter(hotel => {
        const roomType = hotel.HotelRoomType?.toLowerCase() || '';
        switch (filters.hotelType) {
          case 'ac':
            return roomType.includes('ac') && !roomType.includes('non');
          case 'nonac':
            return (
              roomType.includes('non') ||
              (!roomType.includes('ac') && roomType.includes('non'))
            );
          default:
            return true;
        }
      });
    }

    // Apply food filter
    if (filters.foodAvailable !== 'all') {
      result = result.filter(hotel => {
        const hasFood = hotel.HotelFoodFacility?.toLowerCase() === 'yes';
        return filters.foodAvailable === 'yes' ? hasFood : !hasFood;
      });
    }

    // Apply parking filter
    if (filters.parkingAvailable !== 'all') {
      result = result.filter(hotel => {
        const hasParking = hotel.HotelParking?.toLowerCase() === 'yes';
        return filters.parkingAvailable === 'yes' ? hasParking : !hasParking;
      });
    }

    // Apply flagged filter
    if (!filters.showFlagged) {
      result = result.filter(hotel => !hotel.isHotelFlagged);
    }

    // Apply sorting (price-based sorting removed)
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
        default:
          return (a.HotelName || '').localeCompare(b.HotelName || '');
      }
    });

    return result;
  }, [allHotels, searchQuery, filters]);

  // Paginated display data
  const displayedHotels = useMemo(() => {
    return filteredHotels.slice(0, displayLimit);
  }, [filteredHotels, displayLimit]);

  // Load more functionality
  const loadMore = useCallback(() => {
    if (displayedHotels.length < filteredHotels.length) {
      setDisplayLimit(prev => prev + LOAD_MORE_SIZE);
    }
  }, [displayedHotels.length, filteredHotels.length]);

  // Update filtered data when calculations change
  useEffect(() => {
    setFilteredData(displayedHotels);
    // Reset display limit when filters change
    if (displayLimit > 20 && filteredHotels.length <= 20) {
      setDisplayLimit(20);
    }
  }, [displayedHotels, filteredHotels.length, displayLimit]);

  // Initial load
  useEffect(() => {
    initializeData();
  }, [initializeData]);

  // Filter update function for child components
  const updateFilters = useCallback(newFilters => {
    setFilters(prev => ({...prev, ...newFilters}));
    setDisplayLimit(20); // Reset pagination when filters change
  }, []);

  // Search update with immediate feedback
  const updateSearch = useCallback(query => {
    setSearchQuery(query);
    setDisplayLimit(20); // Reset pagination when search changes
  }, []);

  // Calculate statistics
  const stats = useMemo(
    () => ({
      total: allHotels.length,
      filtered: filteredHotels.length,
      displayed: displayedHotels.length,
      flagged: allHotels.filter(h => h.isHotelFlagged).length,
      available: allHotels.filter(h => !h.isHotelFlagged).length,
    }),
    [allHotels, filteredHotels, displayedHotels],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refreshData} />
        }
        onScroll={({nativeEvent}) => {
          // Auto-load more when near bottom
          const isCloseToBottom =
            nativeEvent.layoutMeasurement.height +
              nativeEvent.contentOffset.y >=
            nativeEvent.contentSize.height - 100;

          if (
            isCloseToBottom &&
            !isLoading &&
            displayedHotels.length < filteredHotels.length
          ) {
            loadMore();
          }
        }}
        scrollEventThrottle={16}>
        {/* Search Header */}
        <Viewpagesearchbar
          searchQuery={searchQuery}
          setSearchQuery={updateSearch}
        />

        {/* Advanced Filters */}
        <Viewpagefilters
          filters={filters}
          updateFilters={updateFilters}
          stats={stats}
        />

        {/* Results Summary */}
        {!isLoading && (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryText}>
              Showing {displayedHotels.length} of {filteredHotels.length} hotels
            </Text>
            {displayedHotels.length < filteredHotels.length && (
              <Text style={styles.loadMoreHint}>
                Scroll down to load more...
              </Text>
            )}
          </View>
        )}

        {/* Hotel Cards */}
        {isLoading && allHotels.length === 0 ? (
          <HotelListingSkeleton />
        ) : (
          <Viewpagecard
            navigation={navigation}
            filteredHotelsByName={displayedHotels}
            isLoading={isLoading}
          />
        )}

        {/* Load More Button (optional) */}
        {!isLoading && displayedHotels.length < filteredHotels.length && (
          <View style={styles.loadMoreContainer}>
            <Text style={styles.loadMoreButton} onPress={loadMore}>
              Load More Hotels ({filteredHotels.length - displayedHotels.length}{' '}
              remaining)
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Error Snackbar */}
      <Snackbar
        visible={!!error}
        onDismiss={() => setError(null)}
        duration={4000}
        action={{
          label: 'Retry',
          onPress: refreshData,
        }}>
        {error}
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  summaryContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.surface,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  loadMoreHint: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 4,
  },
  loadMoreContainer: {
    padding: 16,
    alignItems: 'center',
  },
  loadMoreButton: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '600',
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: COLORS.primaryLight + '20',
    borderRadius: 8,
    textAlign: 'center',
  },
});

export default Viewpage;
