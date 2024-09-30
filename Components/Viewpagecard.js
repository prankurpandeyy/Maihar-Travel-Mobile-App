// import React from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
// } from 'react-native';
// import DataSpinner from './DataSpinner';

// const Viewpagecard = ({navigation, filteredHotelsByName, isLoading}) => {
//   return (
//     <View style={styles.container}>
//       {isLoading ? (
//         <DataSpinner />
//       ) : filteredHotelsByName.length > 0 ? (
//         filteredHotelsByName.map(hotel =>
//           hotel.isHotelFlagged ? (
//             <TouchableOpacity key={hotel.$id} style={styles.noCard}>
//               <View style={styles.textContainer}>
//                 <Text style={styles.hotelName}>{hotel.HotelName}</Text>
//                 <Text style={styles.detailsText}>
//                   The Hotel is Flagged By Authorties,Can't View More Details.
//                   Please Contact Admin.
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           ) : (
//             <TouchableOpacity
//               key={hotel.$id}
//               onPress={() =>
//                 navigation.navigate('Details', {hotelId: hotel.$id})
//               }
//               style={styles.card}>
//               <View style={styles.textContainer}>
//                 <Text style={styles.hotelName}>{hotel.HotelName}</Text>
//                 <Text style={styles.hotelPrice}>
//                   {' '}
//                   Price:
//                   {hotel.HotelRentMin}-{hotel.HotelRentMax}
//                 </Text>
//                 <Text style={styles.detailsText}>View More Details</Text>
//               </View>
//             </TouchableOpacity>
//           ),
//         )
//       ) : (
//         <Text style={styles.noHotelsText}>No hotels found</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 8,
//   },
//   card: {
//     marginVertical: 5,
//     padding: 8,
//     backgroundColor: 'white',
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//     flexDirection: 'row',
//     borderWidth: 2,
//     borderColor: '#6f76f7', // Sky-500 equivalent
//   },
//   image: {
//     width: '50%',
//     height: 160,
//     borderRadius: 8,
//   },
//   textContainer: {
//     width: '100%',
//     paddingLeft: 16,
//     justifyContent: 'center',
//   },
//   hotelName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'black',
//     width: '100%',
//   },
//   hotelPrice: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'red',
//     width: '100%',
//   },
//   detailsText: {
//     color: '#4b5563', // Gray-600 equivalent
//     marginTop: 8,
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     width: '100%',
//   },
//   noHotelsText: {
//     textAlign: 'center',
//     color: '#ef4444', // Red-500 equivalent
//     marginTop: 16,
//   },
//   noCard: {
//     marginVertical: 5,
//     padding: 8,
//     backgroundColor: 'white',
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//     flexDirection: 'row',
//     borderWidth: 2,
//     borderColor: '#ef4444', // Red-500 equivalent
//   },
// });

// export default Viewpagecard;
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DataSpinner from './DataSpinner';

const Viewpagecard = ({navigation, filteredHotelsByName, isLoading}) => {
  return (
    <View style={styles.container}>
      {isLoading ? (
        <DataSpinner />
      ) : filteredHotelsByName.length > 0 ? (
        filteredHotelsByName.map(hotel =>
          hotel.isHotelFlagged ? (
            <TouchableOpacity key={hotel.$id} style={styles.noCard}>
              <View style={styles.textContainer}>
                <Text style={styles.hotelName}>{hotel.HotelName}</Text>
                <Text style={styles.detailsText}>
                  The Hotel is Flagged By Authorities. Can't View More Details.
                  Please Contact Admin.
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              key={hotel.$id}
              onPress={() =>
                navigation.navigate('Details', {hotelId: hotel.$id})
              }
              style={styles.card}>
              <View style={styles.textContainer}>
                <Text style={styles.hotelName}>{hotel.HotelName}</Text>
                <Text style={styles.hotelPrice}>
                  Price: {hotel.HotelRentMin} - {hotel.HotelRentMax}
                </Text>
                <Text style={styles.detailsText}>View More Details</Text>
              </View>
            </TouchableOpacity>
          ),
        )
      ) : (
        <Text style={styles.noHotelsText}>No hotels found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  card: {
    marginVertical: 5,
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#6f76f7', // Sky-500 equivalent
  },
  textContainer: {
    width: '100%',
    paddingLeft: 16,
    justifyContent: 'center',
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  hotelPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
  detailsText: {
    color: '#4b5563', // Gray-600 equivalent
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noHotelsText: {
    textAlign: 'center',
    color: '#ef4444', // Red-500 equivalent
    marginTop: 16,
  },
  noCard: {
    marginVertical: 5,
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#ef4444', // Red-500 equivalent
  },
});

export default Viewpagecard;
