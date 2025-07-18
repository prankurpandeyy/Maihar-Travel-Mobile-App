import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import {COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS} from '../constants/theme';

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
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    ...SHADOWS.sm,
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
  },
  head: {
    height: 48,
    backgroundColor: COLORS.primary,
  },
  headText: {
    ...TYPOGRAPHY.body2,
    textAlign: 'center',
    fontWeight: 'bold',
    color: COLORS.textWhite,
  },
  row: {
    height: 44,
    backgroundColor: COLORS.surfaceVariant,
  },
  text: {
    ...TYPOGRAPHY.body2,
    textAlign: 'center',
    color: COLORS.textPrimary,
  },
});

export default SimpleTable;
