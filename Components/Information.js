import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import {List, Divider, Button, Alert} from 'react-native-paper';
import React from 'react';
import Tables from './Tables';

import Facilitycard from './Facilitycard';
import Feedback from './Feedback';
import Howtoreach from './Howtoreach';

const Information = ({navigation}) => {
  // Mandir Timing Data
  const tableHeadMandirShedule = ['Day', 'Darshan Session', 'Timing'];
  const tableDataMandirTiming = [
    ['Daily', 'Temple Opening Timings', '05:00AM'],
    ['Daily', 'Morning Darshan Timings', '05:00AM--08:00AM'],
    ['Daily', 'Evening Darshan Timings', '04:00PM--09:00PM'],
    ['Daily', 'Temple Closing Timings', '09:00PM'],
  ];
  // Ropway Data
  const tableHeadRopeway = ['Day', 'Ropeway Details', 'Timing'];
  const tableDataRopeway = [
    ['Daily', 'Temple Opening Timings', '05:00AM'],
    ['Daily', 'Morning Ropeway Timings', '05:00AM--08:00AM'],
    ['Daily', 'Evening Ropeway Timings', '04:00PM--09:00PM'],
    ['Daily', 'Temple Closing Timings', '09:00PM'],
  ];
  // open url

  return (
    <View>
      <List.AccordionGroup>
        <List.Accordion title="History of the Temple" id="1">
          <List.Item />
          <View style={styles.textContainer}>
            <Text style={styles.historyText}>
              Maihar Devi Temple in Madhya Pradesh, known locally as Sharda
              Devi, is a renowned Hindu temple dedicated to Goddess Shakti.
              Located on Trikut Hills in Satna, it requires pilgrims to climb
              1063 steps or use a ropeway. The temple, associated with Sringeri
              Mutt, features shrines for Lord Bala Ganapathi, Lord Muruga, and
              Acharya Sri Sankara. It hosts three daily pujas and major
              festivals, including the 10-day Navarathri.
            </Text>
          </View>
          <Tables
            tableData={tableDataMandirTiming}
            tableHead={tableHeadMandirShedule}
          />
        </List.Accordion>
        <Divider />
        <List.Accordion title="How To Reach Temple " id="2">
          <Howtoreach />
        </List.Accordion>
        <Divider />

        <List.Accordion title="Facilities" id="3">
          <Facilitycard navigation={navigation} />
        </List.Accordion>
        <Divider />
        <List.Accordion title="Ropway" id="4">
          <Tables tableData={tableDataRopeway} tableHead={tableHeadRopeway} />

          <View style={styles.textContainerFacility}>
            <Text style={styles.boldText}>Note :</Text>
            <Text style={styles.italicText}>
              Ropeway tickets for Sharda Mata Temple can be booked both online
              and offline.Book online tickets here : For offline booking, visit
              the Ropeway Center in the temple premises. Note that after the
              ropeway, you will need to climb approximately 50 stairs to reach
              the temple for darshan.
            </Text>
            <Button
              icon="ticket-confirmation"
              mode="contained"
              style={styles.styledButton}
              onPress={() =>
                Linking.openURL('https://uat.ropeways.com/online-booking')
              }>
              <Text>Book Ropway Tickets Online</Text>
            </Button>
          </View>
        </List.Accordion>
        <Divider />
        <List.Accordion title="Feedback and Greviences" id="5">
          <Feedback />
        </List.Accordion>
      </List.AccordionGroup>
      <Divider />
    </View>
  );
};
const styles = StyleSheet.create({
  textContainer: {
    marginTop: -30,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    // backgroundColor: '#F0F8FF',
    color: 'black',
  },
  historyText: {
    fontSize: 15,
    textAlign: 'justify',
    color: 'black',
  },
  styledButton: {
    marginTop: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },
  textContainerFacility: {
    margin: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
  },
  italicText: {
    fontStyle: 'italic',
    marginBottom: 0,
    fontSize: 15,
    textAlign: 'center',
    color: 'black',
  },
});

export default Information;
