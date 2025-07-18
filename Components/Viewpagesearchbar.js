import React from 'react';
import {Searchbar, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import PremiumGradient from './common/CustomGradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS} from '../constants/theme';

const Viewpagesearchbar = ({searchQuery, setSearchQuery}) => {
  return (
    <PremiumGradient
      colors={[COLORS.gradientStart, COLORS.gradientEnd]}
      direction="horizontal"
      style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <Icon name="home-city" size={28} color={COLORS.textWhite} />
          <Text style={styles.headerText}>DISCOVER HOTELS</Text>
        </View>

        <Text style={styles.subHeaderText}>
          Find the perfect stay near Sharda Mata Temple
      </Text>

        <View style={styles.searchContainer}>
      <Searchbar
            placeholder="Search hotels by name..."
        value={searchQuery}
        onChangeText={setSearchQuery}
            style={styles.searchBar}
            inputStyle={styles.searchInput}
            iconColor={COLORS.primary}
            placeholderTextColor={COLORS.textSecondary}
      />
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
  },
  subHeaderText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textWhite,
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: SPACING.xl,
  },
  searchContainer: {
    paddingHorizontal: SPACING.sm,
  },
  searchBar: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    elevation: 0,
    ...SHADOWS.md,
    borderWidth: 0,
  },
  searchInput: {
    ...TYPOGRAPHY.body1,
    color: COLORS.textPrimary,
  },
});
export default Viewpagesearchbar;
