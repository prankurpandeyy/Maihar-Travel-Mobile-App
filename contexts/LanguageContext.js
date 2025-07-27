import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the Language Context
const LanguageContext = createContext();

// Language storage key
const LANGUAGE_STORAGE_KEY = 'app_language';

// Language Context Provider
export const LanguageProvider = ({children}) => {
  const [language, setLanguage] = useState('en'); // Default to English
  const [isLoading, setIsLoading] = useState(true);

  // Load saved language on app start
  useEffect(() => {
    loadSavedLanguage();
  }, []);

  const loadSavedLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
    } catch (error) {
      console.log('Error loading saved language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLanguage = async () => {
    const newLanguage = language === 'en' ? 'hi' : 'en';
    setLanguage(newLanguage);

    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
    } catch (error) {
      console.log('Error saving language:', error);
    }
  };

  const setLanguageValue = async newLanguage => {
    setLanguage(newLanguage);

    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
    } catch (error) {
      console.log('Error saving language:', error);
    }
  };

  const value = {
    language,
    toggleLanguage,
    setLanguage: setLanguageValue,
    isLoading,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the Language Context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Helper function to get translated text (deprecated - use translations.js)
export const getTranslatedText = (englishText, hindiText, language) => {
  return language === 'hi' ? hindiText : englishText;
};

// Import the comprehensive translation system
export {
  getTranslatedText as t,
  getTranslation,
} from '../constants/translations';
