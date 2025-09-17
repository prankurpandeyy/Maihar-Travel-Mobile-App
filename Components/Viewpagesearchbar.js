import React, {useState, useCallback, useEffect} from 'react';
import {Searchbar, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import PremiumGradient from './common/CustomGradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS} from '../constants/theme';
import {useLanguage} from '../contexts/LanguageContext';
import {getTranslatedText} from '../constants/translations';

const Viewpagesearchbar = ({searchQuery, setSearchQuery}) => {
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const {language} = useLanguage();

  // Debounce search input for better performance
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearchQuery(localSearch);
    }, 300); // 300ms delay

    return () => clearTimeout(debounceTimer);
  }, [localSearch, setSearchQuery]);

  // Update local state when external search query changes
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = useCallback(text => {
    setLocalSearch(text);
  }, []);

  const clearSearch = useCallback(() => {
    setLocalSearch('');
    setSearchQuery('');
  }, [setSearchQuery]);

  return (
    <PremiumGradient
      colors={[COLORS.gradientStart, COLORS.gradientEnd]}
      direction="horizontal"
      style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <Icon name="home-city" size={28} color={COLORS.textWhite} />
          {/* <Text style={styles.headerText}>
            {getTranslatedText('DISCOVER HOTELS', language)}
          </Text> */}
          <Text style={styles.headerText}>
            {getTranslatedText('होटल खोजें', language)}
          </Text>
        </View>

        <Text style={styles.subHeaderText}>
          {/* {getTranslatedText(
            'Find the perfect stay near Sharda Mata Temple',
            language,
          )} */}
          {getTranslatedText(
            'शारदा माता मंदिर के पास परफेक्ट होटल खोजें',
            language,
          )}
        </Text>

        <View style={styles.searchContainer}>
          <Searchbar
            placeholder={getTranslatedText(
              'नाम या स्थान के आधार पर होटल खोजें...',
              language,
            )}
            value={localSearch}
            onChangeText={handleSearchChange}
            onClearIconPress={clearSearch}
            style={styles.searchBar}
            inputStyle={styles.searchInput}
            iconColor={COLORS.primary}
            placeholderTextColor={COLORS.textSecondary}
            mode="bar"
            elevation={2}
            loading={localSearch !== searchQuery && localSearch.length > 0}
            testID="hotel-search"
          />

          {/* Search hints */}
          {localSearch.length === 0 && (
            <View style={styles.searchHints}>
              <Text style={styles.hintText}>
                💡{' '}
                {/* {getTranslatedText(
                  'Try searching by hotel name or location',
                  language,
                )} */}
                'होटल के नाम या स्थान से खोजने का प्रयास करें'
              </Text>
            </View>
          )}
        </View>
      </View>
    </PremiumGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: SPACING.xl,
  },
  content: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING['2xl'],
    paddingBottom: SPACING.lg,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  headerText: {
    ...TYPOGRAPHY.heading2,
    color: COLORS.textWhite,
    marginLeft: SPACING.sm,
    fontWeight: 'bold',
  },
  subHeaderText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textWhite,
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: SPACING.xl,
    lineHeight: 20,
  },
  searchContainer: {
    paddingHorizontal: SPACING.sm,
  },
  searchBar: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    elevation: 3,
    ...SHADOWS.md,
    borderWidth: 0,
  },
  searchInput: {
    ...TYPOGRAPHY.body1,
    color: COLORS.textPrimary,
    fontSize: 16,
  },
  searchHints: {
    marginTop: SPACING.sm,
    alignItems: 'center',
  },
  hintText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textWhite,
    opacity: 0.8,
    fontSize: 12,
  },
});

export default Viewpagesearchbar;
