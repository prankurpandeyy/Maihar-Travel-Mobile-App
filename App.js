import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import Homepage from './Pages/Homepage';
import Viewpage from './Pages/Viewpage';
import Detailspage from './Pages/Detailspage';
import Informationpage from './Pages/Informationpage';
import {COLORS} from './constants/theme';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primary}
        translucent={false}
      />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: COLORS.textWhite,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShadowVisible: true,
        }}>
        <Stack.Screen
          name="Home"
          component={Homepage}
          options={{
            title: 'Maihar Travel',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="View"
          component={Viewpage}
          options={{
            title: 'Hotels Near Sharda Mata Temple',
          }}
        />
        <Stack.Screen
          name="Details"
          component={Detailspage}
          options={{
            title: 'Hotel Details',
          }}
        />
        <Stack.Screen
          name="Information"
          component={Informationpage}
          options={{
            title: 'Temple Information',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
