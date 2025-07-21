import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Animated,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  PixelRatio,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  RADIUS,
  SHADOWS,
} from '../../constants/theme';

// Responsive utilities for mobile optimization
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const scale = screenWidth / 375; // Base iPhone 6/7/8 width
const moderateScale = (size, factor = 0.5) => size + (scale - 1) * factor;
const isTablet = screenWidth >= 768;

const OptimizedImage = ({
  source,
  style,
  resizeMode = 'cover',
  placeholder,
  onPress,
  caption,
  showLoadingIndicator = true,
  errorIcon = 'image-broken-variant',
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const handleLoad = () => {
    setLoading(false);
    setError(false);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  const handleRetry = () => {
    setError(false);
    setLoading(true);
    fadeAnim.setValue(0);
  };

  const ImageComponent = (
    <View style={[styles.container, style]}>
      {/* Loading Placeholder */}
      {loading && (
        <View style={[styles.placeholder, StyleSheet.absoluteFillObject]}>
          {placeholder || (
            <View style={styles.defaultPlaceholder}>
              {showLoadingIndicator && (
                <ActivityIndicator size="small" color={COLORS.primary} />
              )}
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          )}
        </View>
      )}

      {/* Error State */}
      {error && (
        <TouchableOpacity
          style={[styles.errorContainer, StyleSheet.absoluteFillObject]}
          onPress={handleRetry}>
          <Icon name={errorIcon} size={32} color={COLORS.textLight} />
          <Text style={styles.errorText}>Tap to retry</Text>
        </TouchableOpacity>
      )}

      {/* Actual Image */}
      {!error && (
        <Animated.View style={{opacity: fadeAnim}}>
          <Image
            source={source}
            style={[styles.image, style]}
            resizeMode={resizeMode}
            onLoad={handleLoad}
            onError={handleError}
            {...props}
          />
        </Animated.View>
      )}

      {/* Caption Overlay */}
      {caption && !loading && !error && (
        <View style={styles.captionOverlay}>
          <Text style={styles.captionText}>{caption}</Text>
        </View>
      )}
    </View>
  );

  return onPress ? (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      {ImageComponent}
    </TouchableOpacity>
  ) : (
    ImageComponent
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderRadius: moderateScale(RADIUS.lg),
    overflow: 'hidden',
    backgroundColor: COLORS.surfaceVariant,
    // Responsive sizing
    maxWidth: isTablet ? screenWidth * 0.8 : '100%',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    // High-DPI support
    resizeMode: 'cover',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceVariant,
    minHeight: moderateScale(120), // Responsive minimum height
  },
  defaultPlaceholder: {
    alignItems: 'center',
    paddingVertical: moderateScale(SPACING.md),
  },
  loadingText: {
    ...TYPOGRAPHY.caption,
    fontSize: moderateScale(TYPOGRAPHY.caption.fontSize),
    color: COLORS.textLight,
    marginTop: moderateScale(SPACING.xs),
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceVariant,
    minHeight: moderateScale(120),
  },
  errorText: {
    ...TYPOGRAPHY.caption,
    fontSize: moderateScale(TYPOGRAPHY.caption.fontSize),
    color: COLORS.textLight,
    marginTop: moderateScale(SPACING.xs),
    textAlign: 'center',
    paddingHorizontal: moderateScale(SPACING.sm),
  },
  captionOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: moderateScale(SPACING.sm),
    // Better backdrop filter for text readability
    borderBottomLeftRadius: moderateScale(RADIUS.lg),
    borderBottomRightRadius: moderateScale(RADIUS.lg),
  },
  captionText: {
    ...TYPOGRAPHY.caption,
    fontSize: moderateScale(TYPOGRAPHY.caption.fontSize),
    color: COLORS.textWhite,
    textAlign: 'center',
    lineHeight: moderateScale(16),
  },
});

export default OptimizedImage;
 