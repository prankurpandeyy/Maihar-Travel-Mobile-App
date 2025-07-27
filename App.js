import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import Homepage from './Pages/Homepage';
import Viewpage from './Pages/Viewpage';
import Detailspage from './Pages/Detailspage';
import Informationpage from './Pages/Informationpage';
import Legalpage from './Pages/Legalpage';
import {COLORS} from './constants/theme';
import {LanguageProvider, useLanguage} from './contexts/LanguageContext';
import {getTranslatedText} from './constants/translations';

const Stack = createNativeStackNavigator();

// Custom theme that matches your app's design system
const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    accent: COLORS.secondary,
    background: COLORS.background,
    surface: COLORS.surface,
    text: COLORS.textPrimary,
    onSurface: COLORS.textPrimary,
    placeholder: COLORS.textSecondary,
    backdrop: COLORS.backdrop || 'rgba(0, 0, 0, 0.5)',
    onBackground: COLORS.textPrimary,
    notification: COLORS.error,
    error: COLORS.error,
    disabled: COLORS.textLight,
    outline: COLORS.border,
    // Additional Paper v5 colors
    secondary: COLORS.secondary,
    onPrimary: COLORS.textWhite,
    onSecondary: COLORS.textWhite,
    onError: COLORS.textWhite,
    surfaceVariant: COLORS.surfaceVariant,
    onSurfaceVariant: COLORS.textSecondary,
    inverseSurface: COLORS.textPrimary,
    inverseOnSurface: COLORS.textWhite,
    inversePrimary: COLORS.primaryLight,
  },
  roundness: 12, // Matches your RADIUS system
};

// Navigation component that uses language context
const AppNavigator = () => {
  const {language} = useLanguage();

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
            title: getTranslatedText('Maihar Darshan', language),
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="View"
          component={Viewpage}
          options={{
            title: getTranslatedText(
              'Hotels Near Sharda Mata Temple',
              language,
            ),
          }}
        />
        <Stack.Screen
          name="Details"
          component={Detailspage}
          options={{
            title: getTranslatedText('Hotel Details', language),
          }}
        />
        <Stack.Screen
          name="Information"
          component={Informationpage}
          options={{
            title: getTranslatedText('Temple Information', language),
          }}
        />
        <Stack.Screen
          name="Legal"
          component={Legalpage}
          options={{
            title: getTranslatedText('Legal & Privacy', language),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function App() {
  return (
    <LanguageProvider>
      <PaperProvider theme={customTheme}>
        <AppNavigator />
      </PaperProvider>
    </LanguageProvider>
  );
}

export default App;
