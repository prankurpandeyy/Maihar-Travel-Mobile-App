/**
 * Image Optimization Utilities
 * Handles compression, sizing, and format optimization for temple images
 */

import {Dimensions, PixelRatio} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const pixelDensity = PixelRatio.get();

// Optimal image dimensions for different use cases
export const IMAGE_SPECS = {
  // Hero image - shown prominently at top
  hero: {
    width: screenWidth,
    height: Math.round(screenHeight * 0.3),
    quality: 0.85,
    format: 'jpg',
    maxFileSize: '400KB', // Keep hero image reasonable
    priority: 'high', // Bundle with app
  },

  // Gallery thumbnails - shown in horizontal scroll
  galleryThumbnail: {
    width: 200,
    height: 150,
    quality: 0.75,
    format: 'jpg',
    maxFileSize: '150KB', // Small for quick loading
    priority: 'low', // Can be remote
  },

  // Gallery full size - shown in modal
  galleryFull: {
    width: screenWidth,
    height: screenHeight * 0.8,
    quality: 0.8,
    format: 'jpg',
    maxFileSize: '600KB', // Higher quality for modal view
    priority: 'low', // Definitely remote
  },

  // Section images - shown in accordions
  section: {
    width: screenWidth - 32, // Account for padding
    height: 200,
    quality: 0.8,
    format: 'jpg',
    maxFileSize: '300KB', // Medium quality
    priority: 'medium', // Some bundled, some remote
  },

  // Fallback/placeholder - always bundled
  placeholder: {
    width: 100,
    height: 100,
    quality: 0.6,
    format: 'jpg',
    maxFileSize: '50KB', // Very small
    priority: 'critical', // Always bundled
  },
};

// App size budget management
export const APP_SIZE_BUDGET = {
  // Total image budget for app bundle
  maxBundleImageSize: 2 * 1024 * 1024, // 2MB for all bundled images

  // Image categories by priority
  critical: ['hero', 'placeholder'], // Must be bundled
  important: ['section-main'], // Consider bundling
  optional: ['gallery', 'section-detail'], // Prefer remote

  // Compression levels
  aggressive: 0.6, // For thumbnails
  balanced: 0.75, // For normal images
  quality: 0.85, // For hero/important images
};

/**
 * Calculate optimal image strategy based on app size constraints
 */
export const calculateImageStrategy = imageList => {
  let bundleSize = 0;
  const strategy = {
    bundle: [],
    remote: [],
    totalBundleSize: 0,
    recommendations: [],
  };

  // Sort images by priority
  const sortedImages = imageList.sort((a, b) => {
    const priorityOrder = {critical: 0, important: 1, optional: 2};
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  sortedImages.forEach(image => {
    const estimatedSize = estimateImageSize(image);

    if (
      image.priority === 'critical' ||
      (bundleSize + estimatedSize < APP_SIZE_BUDGET.maxBundleImageSize &&
        image.priority === 'important')
    ) {
      strategy.bundle.push(image);
      bundleSize += estimatedSize;
    } else {
      strategy.remote.push(image);
    }
  });

  strategy.totalBundleSize = bundleSize;

  // Add recommendations
  if (bundleSize > APP_SIZE_BUDGET.maxBundleImageSize * 0.8) {
    strategy.recommendations.push(
      'Consider moving some images to remote hosting',
    );
  }

  if (strategy.remote.length > strategy.bundle.length) {
    strategy.recommendations.push('Implement robust offline fallback strategy');
  }

  return strategy;
};

/**
 * Estimate image file size based on dimensions and quality
 */
const estimateImageSize = imageConfig => {
  const {width, height, quality} = imageConfig;
  const pixels = width * height;

  // Rough estimation: JPG compression results in ~3-5 bytes per pixel at 0.8 quality
  const baseSize = pixels * 4; // 4 bytes per pixel (rough)
  const compressionFactor = quality || 0.8;

  return Math.round(baseSize * compressionFactor);
};

/**
 * Generate optimized image configurations for temple images
 */
export const generateImageConfigs = imageData => {
  const configs = {};

  Object.keys(imageData).forEach(imageKey => {
    const image = imageData[imageKey];

    configs[imageKey] = {
      // Local version (compressed for bundle)
      local: {
        ...IMAGE_SPECS.section,
        source: image.localPath,
        compressed: true,
      },

      // Remote version (higher quality)
      remote: {
        ...IMAGE_SPECS.galleryFull,
        source: image.remotePath,
        compressed: false,
      },

      // Thumbnail version
      thumbnail: {
        ...IMAGE_SPECS.galleryThumbnail,
        source: image.thumbnailPath || image.localPath,
        compressed: true,
      },
    };
  });

  return configs;
};

/**
 * Image compression settings for different scenarios
 */
export const COMPRESSION_PRESETS = {
  // For app bundle - prioritize size
  bundle: {
    quality: 0.7,
    maxWidth: 800,
    maxHeight: 600,
    format: 'jpg',
    stripMetadata: true,
  },

  // For remote hosting - balance quality and size
  remote: {
    quality: 0.85,
    maxWidth: 1200,
    maxHeight: 900,
    format: 'jpg',
    stripMetadata: true,
  },

  // For thumbnails - prioritize loading speed
  thumbnail: {
    quality: 0.6,
    maxWidth: 300,
    maxHeight: 225,
    format: 'jpg',
    stripMetadata: true,
  },
};

/**
 * Performance optimization recommendations
 */
export const OPTIMIZATION_RECOMMENDATIONS = {
  appSize: {
    small: 'Bundle 2-3 critical images (~1MB), remote for rest',
    medium: 'Bundle 4-5 important images (~2-3MB), remote for galleries',
    large: 'Bundle most images (~5MB+), consider WebP format',
  },

  network: {
    fast: 'Use higher quality remote images, minimal local bundle',
    slow: 'Bundle more images locally, compress remote heavily',
    offline: 'Bundle all critical images, implement extensive caching',
  },

  usage: {
    gallery: 'Lazy load, thumbnail → full size progression',
    hero: 'Bundle locally for immediate impact',
    sections: 'Mix of local (important) and remote (detailed)',
  },
};

/**
 * Real-time bundle size monitor
 */
export const BundleSizeMonitor = {
  currentSize: 0,
  maxSize: APP_SIZE_BUDGET.maxBundleImageSize,

  addImage(imageSize) {
    this.currentSize += imageSize;
    return this.getRemainingBudget();
  },

  getRemainingBudget() {
    return Math.max(0, this.maxSize - this.currentSize);
  },

  getUsagePercentage() {
    return Math.round((this.currentSize / this.maxSize) * 100);
  },

  canAddImage(imageSize) {
    return this.currentSize + imageSize <= this.maxSize;
  },

  getRecommendation() {
    const usage = this.getUsagePercentage();

    if (usage < 50) return 'Can safely add more images to bundle';
    if (usage < 80)
      return 'Approaching bundle size limit, consider remote images';
    if (usage < 100)
      return 'Bundle nearly full, prioritize only critical images';
    return 'Bundle size exceeded, move images to remote hosting';
  },
};

export default {
  IMAGE_SPECS,
  APP_SIZE_BUDGET,
  calculateImageStrategy,
  generateImageConfigs,
  COMPRESSION_PRESETS,
  OPTIMIZATION_RECOMMENDATIONS,
  BundleSizeMonitor,
};
