/**
 * Image Utilities for Temple Information App
 * Handles local assets, remote URLs, and optimization strategies
 */

// Image Source Types
export const IMAGE_TYPES = {
  LOCAL: 'local',
  REMOTE: 'remote',
  URI: 'uri',
};

// Default placeholder images
export const PLACEHOLDER_IMAGES = {
  temple: require('../assets/matasharda.jpg'),
  loading: null, // Will use skeleton loader
  error: null, // Will use error icon
};

/**
 * Create image source object based on type
 * @param {string|object} source - Image source
 * @param {string} type - Image type (local, remote, uri)
 * @returns {object} - React Native Image source object
 */
export const createImageSource = (source, type = IMAGE_TYPES.LOCAL) => {
  switch (type) {
    case IMAGE_TYPES.LOCAL:
      return typeof source === 'string' ? {uri: source} : source;

    case IMAGE_TYPES.REMOTE:
      return {
        uri: source,
        cache: 'force-cache', // Use cached version if available
        headers: {
          'Cache-Control': 'max-age=3600', // Cache for 1 hour
        },
      };

    case IMAGE_TYPES.URI:
      return {uri: source};

    default:
      return PLACEHOLDER_IMAGES.temple;
  }
};

/**
 * Temple Image Configuration
 * Define all temple-related images with fallbacks
 */
export const TEMPLE_IMAGES = {
  // Main hero image - Using highest quality main temple view
  hero: {
    main: require('../assets/maa-sharda-temple (1).jpg'), // 89KB - Best quality main view
    fallback: require('../assets/maa-sharda-temple.jpg'), // 68KB - Backup main view
  },

  // Gallery images - Real temple photos optimized for mobile
  gallery: [
    {
      id: 'main-temple',
      local: require('../assets/maa-sharda-temple.jpg'), // 68KB
      caption: 'Maa Sharda Temple',
      description:
        'Beautiful view of Sharda Mata Temple perched on Trikut Hills',
      tags: ['temple', 'main-view', 'architecture'],
    },
    {
      id: 'temple-entrance',
      local: require('../assets/entrance-of-sharda-temple.jpg'), // 55KB
      caption: 'Temple Entrance',
      description: 'Sacred entrance to Sharda Mata Temple',
      tags: ['entrance', 'gateway', 'sacred'],
    },
    {
      id: 'ropeway',
      local: require('../assets/the-ropeway.jpg'), // 26KB
      caption: 'Ropeway Service',
      description: 'Modern ropeway connecting base to temple premises',
      tags: ['ropeway', 'transport', 'scenic'],
    },
    {
      id: 'temple-view',
      local: require('../assets/the-temple.jpg'), // 27KB
      caption: 'Temple View',
      description: 'Majestic view of the temple complex',
      tags: ['temple', 'architecture', 'view'],
    },
    {
      id: 'panoramic-view',
      local: require('../assets/way-back-from-sharda.jpg'), // 44KB
      caption: 'Return Journey View',
      description: 'Breathtaking view during return journey from temple',
      tags: ['panoramic', 'landscape', 'journey'],
    },
    {
      id: 'maihar-area',
      local: require('../assets/maihar.jpg'), // 23KB
      caption: 'Maihar Region',
      description: 'Beautiful Maihar area surrounding the temple',
      tags: ['maihar', 'area', 'landscape'],
    },
    {
      id: 'temple-gallery',
      local: require('../assets/sharda_mata_images.jpg'), // 333KB - High quality composite
      caption: 'Temple Gallery',
      description: 'Comprehensive view of Sharda Mata Temple collection',
      tags: ['gallery', 'collection', 'detailed'],
    },
    {
      id: 'temple-alternate',
      local: require('../assets/maa-sharda-temple (2).jpg'), // 34KB
      caption: 'Temple Alternate View',
      description: 'Different perspective of the sacred temple',
      tags: ['temple', 'alternate', 'perspective'],
    },
  ],

  // Section-specific images - Optimized for contextual use
  sections: {
    ropeway: {
      local: require('../assets/the-ropeway.jpg'), // 26KB - Perfect for ropeway section
      caption: 'Modern Ropeway System',
      description: 'Convenient cable car service to temple',
    },
    stairs: {
      local: require('../assets/entrance-of-sharda-temple.jpg'), // 55KB - Shows entrance/pathway
      caption: 'Temple Pathway',
      description: 'Sacred pathway leading to the temple',
    },
    facilities: {
      local: require('../assets/maihar.jpg'), // 23KB - Shows area facilities
      caption: 'Temple Facilities',
      description: 'Facilities and amenities in Maihar area',
    },
    premises: {
      local: require('../assets/maa-sharda-temple.jpg'), // 68KB - Shows temple complex
      caption: 'Temple Complex',
      description: 'Complete temple premises and surroundings',
    },
  },
};

/**
 * Get optimized image source with fallback strategy
 * @param {string} imageId - Image identifier
 * @param {string} preferredType - Preferred source type (local/remote)
 * @returns {object} - Image source with fallback
 */
export const getTempleImage = (imageId, preferredType = IMAGE_TYPES.LOCAL) => {
  // For gallery images
  const galleryImage = TEMPLE_IMAGES.gallery.find(img => img.id === imageId);
  if (galleryImage) {
    if (preferredType === IMAGE_TYPES.REMOTE && galleryImage.remote) {
      return createImageSource(galleryImage.remote, IMAGE_TYPES.REMOTE);
    }
    return createImageSource(galleryImage.local, IMAGE_TYPES.LOCAL);
  }

  // For section images
  if (TEMPLE_IMAGES.sections[imageId]) {
    const sectionImage = TEMPLE_IMAGES.sections[imageId];
    if (preferredType === IMAGE_TYPES.REMOTE && sectionImage.remote) {
      return createImageSource(sectionImage.remote, IMAGE_TYPES.REMOTE);
    }
    return createImageSource(sectionImage.local, IMAGE_TYPES.LOCAL);
  }

  // Fallback to hero image
  return createImageSource(TEMPLE_IMAGES.hero.main, IMAGE_TYPES.LOCAL);
};

/**
 * Get all gallery images with preferred source type
 * @param {string} preferredType - Preferred source type
 * @returns {array} - Array of image objects for gallery
 */
export const getGalleryImages = (preferredType = IMAGE_TYPES.LOCAL) => {
  return TEMPLE_IMAGES.gallery.map(img => ({
    ...img,
    source:
      preferredType === IMAGE_TYPES.REMOTE && img.remote
        ? createImageSource(img.remote, IMAGE_TYPES.REMOTE)
        : createImageSource(img.local, IMAGE_TYPES.LOCAL),
  }));
};

/**
 * Image optimization settings
 */
export const IMAGE_SETTINGS = {
  // Quality settings
  quality: {
    thumbnail: 0.7,
    normal: 0.8,
    high: 0.9,
  },

  // Size constraints
  maxDimensions: {
    thumbnail: {width: 150, height: 150},
    normal: {width: 800, height: 600},
    high: {width: 1200, height: 900},
  },

  // Cache settings
  cache: {
    maxAge: 3600, // 1 hour
    maxSize: 50 * 1024 * 1024, // 50MB
  },

  // Loading settings
  loading: {
    timeout: 10000, // 10 seconds
    retryAttempts: 3,
    retryDelay: 1000, // 1 second
  },
};

/**
 * Preload critical images for better performance
 * @param {array} imageIds - Array of image IDs to preload
 */
export const preloadImages = async (imageIds = []) => {
  const preloadPromises = imageIds.map(async imageId => {
    try {
      const imageSource = getTempleImage(imageId);
      if (imageSource.uri) {
        // For remote images, we can implement prefetching
        // For local images, they're already bundled
        return Promise.resolve();
      }
      return Promise.resolve();
    } catch (error) {
      console.warn(`Failed to preload image: ${imageId}`, error);
      return Promise.resolve(); // Don't fail the whole preload process
    }
  });

  try {
    await Promise.allSettled(preloadPromises);
    console.log('Image preloading completed');
  } catch (error) {
    console.warn('Some images failed to preload:', error);
  }
};

/**
 * Add new remote images (useful for dynamic content)
 * @param {object} imageData - Image data object
 */
export const addRemoteImage = imageData => {
  const {id, url, caption, description, tags = [], section} = imageData;

  const newImage = {
    id,
    local: PLACEHOLDER_IMAGES.temple, // Fallback to local placeholder
    remote: url,
    caption,
    description,
    tags,
  };

  if (section && TEMPLE_IMAGES.sections[section]) {
    // Add to specific section
    TEMPLE_IMAGES.sections[section] = {
      ...TEMPLE_IMAGES.sections[section],
      remote: url,
    };
  } else {
    // Add to gallery
    TEMPLE_IMAGES.gallery.push(newImage);
  }
};

export default {
  IMAGE_TYPES,
  TEMPLE_IMAGES,
  createImageSource,
  getTempleImage,
  getGalleryImages,
  preloadImages,
  addRemoteImage,
  IMAGE_SETTINGS,
};
