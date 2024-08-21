import * as React from 'react';
import {Searchbar, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

const Viewpagesearchbar = ({searchQuery, setSearchQuery}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headertext} variant="titleLarge">
        MAIHAR HOTEL SEARCH{' '}
      </Text>
      <Searchbar
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchquerytext}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  headertext: {
    margin: 5,
  },
  searchquerytext: {
    marginLeft: 10,
    marginRight: 10,
    width: '90%',
    backgroundColor: '#cbb4f5',
    borderRadius: 10,
  },
});
export default Viewpagesearchbar;
