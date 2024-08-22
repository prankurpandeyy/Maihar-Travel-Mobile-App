import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';

const SimpleTable = ({tableHead, tableData}) => {
  return (
    <View style={styles.container}>
      <Table borderStyle={styles.tableBorder}>
        <Row data={tableHead} style={styles.head} textStyle={styles.headText} />
        <Rows data={tableData} style={styles.row} textStyle={styles.text} />
      
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 3,
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: '#ddd',
  },
  head: {
    height: 40,
    backgroundColor: '#f1f1f1',
  },
  headText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  row: {
    height: 40,
    backgroundColor: '#fff',
  },
  text: {
    textAlign: 'center',
    color: '#555',
  },
});

export default SimpleTable;
