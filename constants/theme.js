export const COLORS = {
  // Primary Brand Colors
  primary: '#2E86C1',
  primaryLight: '#5DADE2',
  primaryDark: '#1B4F72',

  // Secondary Colors
  secondary: '#E67E22',
  secondaryLight: '#F39C12',
  secondaryDark: '#D35400',

  // Gradient Colors
  gradientStart: '#5DADE2',
  gradientEnd: '#2E86C1',
  gradientSecondary: '#F39C12',

  // Background Colors
  background: '#F8F9FA',
  surface: '#FFFFFF',
  surfaceVariant: '#F5F7FA',

  // Text Colors
  text: '#2C3E50',
  textPrimary: '#2C3E50',
  textSecondary: '#5D6D7E',
  textLight: '#85929E',
  textWhite: '#FFFFFF',

  // Status Colors
  success: '#27AE60',
  warning: '#F39C12',
  error: '#E74C3C',
  info: '#3498DB',

  // Accent Colors
  accent: '#9B59B6',
  accentLight: '#BB8FCE',

  // Border and Divider
  border: '#E5E7EB',
  divider: '#D5DBDB',

  // Shadow
  shadow: '#000000',

  // Hotel Card Colors
  hotelCard: '#FFFFFF',
  hotelCardBorder: '#E8F4FD',
  flaggedCard: '#FADBD8',
  flaggedBorder: '#E74C3C',
};

export const TYPOGRAPHY = {
  // Font Families
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },

  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
  },

  // Font Weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
};

export const RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  full: 999,
};

export const SHADOWS = {
  sm: {
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
};

export const ANIMATIONS = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
};

// Common Styles
export const COMMON_STYLES = {
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.md,
  },
  gradient: {
    flex: 1,
  },
  button: {
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.text,
  },
};
