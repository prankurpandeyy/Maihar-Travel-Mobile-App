import {View, StyleSheet, Text} from 'react-native';
import {Card, Title, Paragraph, Button, IconButton} from 'react-native-paper';

const FacilityCard = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <Title>Facilities at Sharda Mata Temple</Title>
          <Paragraph>
            Enjoy a range of facilities to enhance your visit.
          </Paragraph>
        </Card.Content>

        <View style={styles.iconRow}>
          <IconButton icon="stairs" size={24} onPress={() => {}} />

          <Paragraph style={styles.iconDescription}>1063 Steps</Paragraph>
          <IconButton icon="vanity-light" size={24} onPress={() => {}} />
          <Paragraph style={styles.iconDescription}>Ropeway Service</Paragraph>
        </View>

        <View style={styles.iconRow}>
          <IconButton icon="water" size={24} onPress={() => {}} />
          <Paragraph style={styles.iconDescription}>Drinking Water</Paragraph>
          <IconButton icon="shoe-formal" size={24} onPress={() => {}} />
          <Paragraph style={styles.iconDescription}>Shoe Storage</Paragraph>
        </View>

        <View style={styles.iconRow}>
          <IconButton icon="power-plug" size={24} onPress={() => {}} />
          <Paragraph style={styles.iconDescription}>Power Backup</Paragraph>
          <IconButton icon="toilet" size={24} onPress={() => {}} />
          <Paragraph style={styles.iconDescription}>Washrooms</Paragraph>
        </View>

        <View style={styles.iconRow}>
          <IconButton icon="chair-school" size={24} onPress={() => {}} />
          <Paragraph style={styles.iconDescription}>Sitting Benches</Paragraph>
          <IconButton icon="camera" size={24} onPress={() => {}} />
          <Paragraph style={styles.iconDescription}>CCTV Security</Paragraph>
        </View>
        <View style={styles.iconRow}>
          <IconButton icon="parking" size={24} onPress={() => {}} />
          <Paragraph style={styles.iconDescription}>Vehicle Parking</Paragraph>
          <IconButton icon="medical-bag" size={24} onPress={() => {}} />
          <Paragraph style={styles.iconDescription}>Medical Facility</Paragraph>
        </View>
        <View style={styles.iconRow}>
          <IconButton icon="food" size={24} onPress={() => {}} />
          <Paragraph style={styles.iconDescription}>Annakoot Prasad</Paragraph>
          <IconButton icon="human-wheelchair" size={24} onPress={() => {}} />
          <Paragraph style={styles.iconDescription}>
            Wheelchair Facility
          </Paragraph>
        </View>
      </Card>
      <View>
        <View style={styles.textContainer}>
          <Text style={styles.boldText}>Note :</Text>
          <Text style={styles.italicText}>
            The Annakoot Prasad at Mata Sharda Temple offers free meals on a
            first-come, first-served basis. Tokens are required, and meals are
            served daily from 12:00 PM to 3:00 PM. You can also explore other
            hotels for your stay here is the list :
          </Text>
          <Button
            mode="contained"
            style={styles.styledButton}
            onPress={() => navigation.navigate('View')}>
            HOTELS
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  iconDescription: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
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
  },
  italicText: {
    fontStyle: 'italic',
    marginBottom: 10,
    fontSize: 15,
    textAlign: 'center',
    color: 'black',
  },
});

export default FacilityCard;
