import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {
  BottomNavigation,
  Provider as PaperProvider,
  TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TrainRoute = () => (
  <Text style={styles.contentText}>
    Maihar is well connected to other major cities of the country via regular
    trains. Railway Station(s): Maihar (MYR){' '}
  </Text>
);
const BusRoute = () => (
  <Text style={styles.contentText}>
    You can easily get regular buses to Maihar from other major cities of the
    country. Bus Station(s): Maihar
  </Text>
);
const FlightRoute = () => (
  <Text style={styles.contentText}>
    {' '}
    There are no regular flights from other major cities of the country to
    Maihar. Nearest airport is Khajuraho Airport. Maihar 106 km away Khajuraho
    Airport (HJR), Khajuraho, Madhya Pradesh Maihar 145 km away Jabalpur Airport
    (JLR), Jabalpur, Madhya Pradesh
  </Text>
);

const CustomTabBar = ({navigationState, navigation, onIndexChange}) => {
  return (
    <View style={styles.tabBar}>
      {navigationState.routes.map((route, index) => (
        <TouchableRipple
          key={route.key}
          style={styles.tab}
          onPress={() => onIndexChange(index)}>
          <View style={styles.tabItem}>
            <Icon
              name={route.icon}
              size={24}
              color={navigationState.index === index ? '#6200ee' : '#222'}
            />
            <Text
              style={[
                styles.tabText,
                navigationState.index === index ? styles.tabTextActive : null,
              ]}>
              {route.title}
            </Text>
            <Text style={styles.extraText}>{route.extraText}</Text>
          </View>
        </TouchableRipple>
      ))}
    </View>
  );
};

const Howtoreach = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'train',
      title: 'Train',
      icon: 'train',
    },
    {key: 'bus', title: 'Bus', icon: 'bus'},
    {
      key: 'flight',
      title: 'Flight',
      icon: 'airplane',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    train: TrainRoute,
    bus: BusRoute,
    flight: FlightRoute,
  });

  return (
    <PaperProvider>
      <View style={styles.container}>
        {renderScene({route: routes[index]})}
        <CustomTabBar
          navigationState={{index, routes}}
          onIndexChange={setIndex}
        />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    // backgroundColor: '#f5f5f5',
    color: 'black',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    color: 'red',
  },
  tabTextActive: {
    color: 'blue',
  },
  extraText: {
    fontSize: 10,
    color: 'black',
  },
  contentText: {
    fontSize: 16,
    textAlign: 'center',
    margin: 16,
    color: 'black',
  },
});

export default Howtoreach;
