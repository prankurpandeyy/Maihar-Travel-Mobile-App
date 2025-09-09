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
  temple: require('../assets/Mata_Sharda_Image.jpeg'),
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
  // Main hero image - Using panoramic drone view for stunning first impression
  hero: {
    main: require('../assets/Mandir_Roof_Mountain_Drone_View.jpeg'), // Panoramic drone view
    fallback: require('../assets/Mandir_Day_View.jpeg'), // Day view backup
  },

  // Gallery images - Real temple photos optimized for mobile
  //   gallery: [
  //     {
  //       id: 'panoramic-view',
  //       local: require('../assets/Mandir_Roof_Mountain_Drone_View.jpeg'),
  //       caption: 'Panoramic Temple View',
  //       description:
  //         'Breathtaking aerial drone view of Sharda Mata Temple and surrounding Trikut Hills',
  //       tags: ['panoramic', 'aerial', 'mountains'],
  //     },
  //     {
  //       id: 'main-temple-day',
  //       local: require('../assets/Mandir_Day_View.jpeg'),
  //       caption: 'Temple Day View',
  //       description:
  //         'Beautiful daytime view of Sharda Mata Temple showcasing the architectural grandeur',
  //       tags: ['temple', 'daytime', 'architecture'],
  //     },
  //     {
  //       id: 'temple-evening',
  //       local: require('../assets/Mandir_Evening_View.jpeg'),
  //       caption: 'Temple Evening View',
  //       description:
  //         'Serene evening view of the temple as the sun sets over Maihar',
  //       tags: ['temple', 'evening', 'sunset'],
  //     },
  //     {
  //       id: 'temple-night',
  //       local: require('../assets/Mandir_At_Night_From_Front.jpeg'),
  //       caption: 'Temple Illuminated at Night',
  //       description:
  //         'Magnificent night view showing the temple beautifully illuminated',
  //       tags: ['temple', 'night', 'illuminated'],
  //     },
  //     {
  //       id: 'temple-night-top',
  //       local: require('../assets/Mandir_Night_View_From_Top.jpeg'),
  //       caption: 'Night View from Summit',
  //       description: 'Spectacular night view of the temple complex from the top',
  //       tags: ['temple', 'night', 'summit'],
  //     },
  //     {
  //       id: 'temple-with-devotees',
  //       local: require('../assets/Mandir_Day_View_With_People.jpeg'),
  //       caption: 'Temple with Devotees',
  //       description: 'Temple bustling with devotees during peak visiting hours',
  //       tags: ['temple', 'devotees', 'crowd'],
  //     },
  //     {
  //       id: 'mata-sharda-deity',
  //       local: require('../assets/Mata_Sharda_Image.jpeg'),
  //       caption: 'Sacred Mata Sharda Deity',
  //       description:
  //         'Divine image of Mata Sharda, the presiding deity of the temple',
  //       tags: ['deity', 'sacred', 'mata-sharda'],
  //     },
  //     {
  //       id: 'temple-main-gate',
  //       local: require('../assets/Maindir_Main_Gate.jpeg'),
  //       caption: 'Temple Main Entrance',
  //       description: 'Grand main gate entrance to the Sharda Mata Temple complex',
  //       tags: ['entrance', 'gate', 'architecture'],
  //     },
  //     {
  //       id: 'temple-side-day',
  //       local: require('../assets/Mandir_side_View_at_day.jpeg'),
  //       caption: 'Temple Side View',
  //       description:
  //         'Beautiful side perspective of the temple during bright daylight',
  //       tags: ['temple', 'side-view', 'daytime'],
  //     },
  //     {
  //       id: 'temple-side-alternate',
  //       local: require('../assets/Mandir_Side_View.jpeg'),
  //       caption: 'Temple Side Perspective',
  //       description: 'Alternative side view showcasing the temple architecture',
  //       tags: ['temple', 'side-view', 'architecture'],
  //     },
  //     {
  //       id: 'temple-empty-view',
  //       local: require('../assets/Mandir_View_empty.jpeg'),
  //       caption: 'Peaceful Temple View',
  //       description: 'Serene view of the temple complex during quiet hours',
  //       tags: ['temple', 'peaceful', 'quiet'],
  //     },
  //     {
  //       id: 'ropeway-top-view',
  //       local: require('../assets/Ropway_from_Top_View.jpg'),
  //       caption: 'Ropeway Aerial View',
  //       description:
  //         'Aerial view of the modern ropeway system connecting to the temple',
  //       tags: ['ropeway', 'aerial', 'transport'],
  //     },
  //     {
  //       id: 'ropeway-center-view',
  //       local: require('../assets/Ropway_View_From_Center.jpg'),
  //       caption: 'Ropeway Journey View',
  //       description:
  //         'Scenic view from the ropeway offering panoramic mountain vistas',
  //       tags: ['ropeway', 'journey', 'scenic'],
  //     },
  //     {
  //       id: 'aalha-talab',
  //       local: require('../assets/aalha_talab.jpg'),
  //       caption: 'Aalha Talab',
  //       description: 'Sacred Aalha Talab (pond) located near the temple complex',
  //       tags: ['pond', 'sacred', 'water'],
  //     },
  //   ],

  //   // Section-specific images - Optimized for contextual use
  //   sections: {
  //     ropeway: {
  //       local: require('../assets/Ropway_View_From_Center.jpg'),
  //       caption: 'Modern Ropeway System',
  //       description: 'Convenient cable car service to temple',
  //     },
  //     stairs: {
  //       local: require('../assets/Maindir_Main_Gate.jpeg'),
  //       caption: 'Temple Pathway',
  //       description: 'Sacred pathway leading to the temple',
  //     },
  //     facilities: {
  //       local: require('../assets/Mandir_Side_View.jpeg'),
  //       caption: 'Temple Facilities',
  //       description: 'Facilities and amenities around temple',
  //     },
  //     premises: {
  //       local: require('../assets/Mandir_View_empty.jpeg'),
  //       caption: 'Temple Complex',
  //       description: 'Complete temple premises and surroundings',
  //     },
  //   },
  // };
  gallery: [
    {
      id: 'panoramic-view',
      local: require('../assets/Mandir_Roof_Mountain_Drone_View.jpeg'),
      caption: 'मंदिर का पैनोरमिक दृश्य',
      description:
        'शारदा माता मंदिर और त्रिकूट पर्वतों का आश्चर्यजनक हवाई ड्रोन दृश्य',
      tags: ['पैनोरमिक', 'हवाई', 'पहाड़'],
    },
    {
      id: 'main-temple-day',
      local: require('../assets/Mandir_Day_View.jpeg'),
      caption: 'मंदिर का दिन का दृश्य',
      description:
        'शारदा माता मंदिर का खूबसूरत दिन का दृश्य, वास्तुकला की भव्यता के साथ',
      tags: ['मंदिर', 'दिन', 'वास्तुकला'],
    },
    {
      id: 'temple-evening',
      local: require('../assets/Mandir_Evening_View.jpeg'),
      caption: 'मंदिर का सांझ का दृश्य',
      description: 'सांझ का शांत दृश्य, जब माईहर पर सूर्य अस्त हो रहा होता है',
      tags: ['मंदिर', 'शाम', 'सूर्यास्त'],
    },
    {
      id: 'temple-night',
      local: require('../assets/Mandir_At_Night_From_Front.jpeg'),
      caption: 'मंदिर रात में प्रकाशित',
      description: 'रात का भव्य दृश्य जिसमें मंदिर खूबसूरती से रोशन है',
      tags: ['मंदिर', 'रात', 'प्रकाशित'],
    },
    {
      id: 'temple-night-top',
      local: require('../assets/Mandir_Night_View_From_Top.jpeg'),
      caption: 'संकलन से रात का दृश्य',
      description: 'मंदिर परिसर का शीर्ष से शानदार रात का दृश्य',
      tags: ['मंदिर', 'रात', 'शीर्ष'],
    },
    {
      id: 'temple-with-devotees',
      local: require('../assets/Mandir_Day_View_With_People.jpeg'),
      caption: 'भक्तों के साथ मंदिर',
      description: 'मंदिर में peak visiting hours के दौरान भक्तों की हलचल',
      tags: ['मंदिर', 'भक्त', 'भीड़'],
    },
    {
      id: 'mata-sharda-deity',
      local: require('../assets/Mata_Sharda_Image.jpeg'),
      caption: 'पवित्र माता शारदा की मूर्ति',
      description: 'मंदिर की मुख्य देवी माता शारदा की दिव्य छवि',
      tags: ['देवी', 'पवित्र', 'माता-शारदा'],
    },
    {
      id: 'temple-main-gate',
      local: require('../assets/Maindir_Main_Gate.jpeg'),
      caption: 'मंदिर का मुख्य प्रवेश द्वार',
      description: 'शारदा माता मंदिर परिसर का भव्य मुख्य द्वार',
      tags: ['प्रवेश', 'द्वार', 'वास्तुकला'],
    },
    {
      id: 'temple-side-day',
      local: require('../assets/Mandir_side_View_at_day.jpeg'),
      caption: 'मंदिर का पार्श्व दृश्य',
      description: 'सुप्रभात में मंदिर का खूबसूरत पार्श्व दृश्य',
      tags: ['मंदिर', 'साइड-व्यू', 'दिन'],
    },
    {
      id: 'temple-side-alternate',
      local: require('../assets/Mandir_Side_View.jpeg'),
      caption: 'मंदिर का वैकल्पिक पार्श्व दृश्य',
      description: 'मंदिर की वास्तुकला को दिखाते हुए वैकल्पिक साइड व्यू',
      tags: ['मंदिर', 'साइड-व्यू', 'वास्तुकला'],
    },
    {
      id: 'temple-empty-view',
      local: require('../assets/Mandir_View_empty.jpeg'),
      caption: 'शांत मंदिर दृश्य',
      description: 'मंदिर परिसर का शांत और एकाकी दृश्य',
      tags: ['मंदिर', 'शांत', 'एकाकी'],
    },
    {
      id: 'ropeway-top-view',
      local: require('../assets/Ropway_from_Top_View.jpg'),
      caption: 'रोपवे का हवाई दृश्य',
      description: 'मंदिर से जुड़ी आधुनिक रोपवे प्रणाली का हवाई दृश्य',
      tags: ['रोपवे', 'हवाई', 'परिवहन'],
    },
    {
      id: 'ropeway-center-view',
      local: require('../assets/Ropway_View_From_Center.jpg'),
      caption: 'रोपवे यात्रा दृश्य',
      description: 'रोपवे से खूबसूरत पर्वतीय नज़ारे का दृश्य',
      tags: ['रोपवे', 'यात्रा', 'सुदृश्य'],
    },
    {
      id: 'aalha-talab',
      local: require('../assets/aalha_talab.jpg'),
      caption: 'आल्हा तालाब',
      description: 'मंदिर परिसर के पास स्थित पवित्र आल्हा तालाब',
      tags: ['तालाब', 'पवित्र', 'पानी'],
    },
  ],

  // सेक्शन-विशिष्ट चित्र - संदर्भ के अनुसार अनुकूलित
  sections: {
    ropeway: {
      local: require('../assets/Ropway_View_From_Center.jpg'),
      caption: 'आधुनिक रोपवे प्रणाली',
      description: 'मंदिर तक सुविधाजनक केबल कार सेवा',
    },
    stairs: {
      local: require('../assets/Maindir_Main_Gate.jpeg'),
      caption: 'मंदिर का मार्ग',
      description: 'मंदिर तक पहुंचने वाला पवित्र मार्ग',
    },
    facilities: {
      local: require('../assets/Mandir_Side_View.jpeg'),
      caption: 'मंदिर की सुविधाएँ',
      description: 'मंदिर के आसपास की सुविधाएँ और व्यवस्थाएं',
    },
    premises: {
      local: require('../assets/Mandir_View_empty.jpeg'),
      caption: 'मंदिर परिसर',
      description: 'मंदिर का पूरा परिसर और आसपास का क्षेत्र',
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
  } catch (error) {
    // Silently handle preload errors
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
