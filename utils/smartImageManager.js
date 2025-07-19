/**
 * Smart Image Manager
 * Automatically optimizes image strategy based on app constraints
 */

import {TEMPLE_IMAGES} from './imageUtils';
import {
  APP_SIZE_BUDGET,
  calculateImageStrategy,
  BundleSizeMonitor,
  COMPRESSION_PRESETS,
} from './imageOptimization';

/**
 * OPTIMAL TEMPLE IMAGE STRATEGY
 * Based on app size optimization and performance analysis
 */

export const OPTIMIZED_STRATEGY = {
  // App Bundle Budget: 2MB for images
  budget: APP_SIZE_BUDGET.maxBundleImageSize,

  // TIER 1: CRITICAL (Always bundled) - ~800KB
  critical: [
    {
      id: 'hero-main',
      file: 'temple-hero.jpg', // REPLACE when user provides
      size: '400KB',
      reason: 'First impression - must load instantly',
      compression: COMPRESSION_PRESETS.bundle,
    },
    {
      id: 'main-temple-thumb',
      file: 'temple-main-thumb.jpg', // REPLACE when user provides
      size: '200KB',
      reason: 'Primary temple view - core content',
      compression: COMPRESSION_PRESETS.bundle,
    },
    {
      id: 'stairs-thumb',
      file: 'temple-stairs-thumb.jpg', // REPLACE when user provides
      size: '200KB',
      reason: 'Key information - 1063 steps detail',
      compression: COMPRESSION_PRESETS.bundle,
    },
  ],

  // TIER 2: IMPORTANT (Bundle if space allows) - ~600KB
  important: [
    {
      id: 'ropeway-thumb',
      file: 'temple-ropeway-thumb.jpg', // REPLACE when user provides
      size: '200KB',
      reason: 'Popular transport option',
      compression: COMPRESSION_PRESETS.bundle,
    },
    {
      id: 'premises-thumb',
      file: 'temple-premises-thumb.jpg', // REPLACE when user provides
      size: '200KB',
      reason: 'Facilities overview',
      compression: COMPRESSION_PRESETS.bundle,
    },
    {
      id: 'interior-thumb',
      file: 'temple-interior-thumb.jpg', // REPLACE when user provides
      size: '200KB',
      reason: 'Sacred space preview',
      compression: COMPRESSION_PRESETS.bundle,
    },
  ],

  // TIER 3: OPTIONAL (Remote only) - Unlimited
  remote: [
    {
      id: 'ropeway-full',
      file: 'temple-ropeway-hq.jpg', // REPLACE when user provides
      size: '800KB',
      reason: 'High-quality gallery view',
      compression: COMPRESSION_PRESETS.remote,
    },
    {
      id: 'stairs-full',
      file: 'temple-stairs-hq.jpg', // REPLACE when user provides
      size: '900KB',
      reason: 'Detailed stairs documentation',
      compression: COMPRESSION_PRESETS.remote,
    },
    {
      id: 'interior-full',
      file: 'temple-interior-hq.jpg', // REPLACE when user provides
      size: '700KB',
      reason: 'Sacred shrine detail',
      compression: COMPRESSION_PRESETS.remote,
    },
    {
      id: 'panoramic-full',
      file: 'temple-panoramic-hq.jpg', // REPLACE when user provides
      size: '1.2MB',
      reason: 'Landscape photography',
      compression: COMPRESSION_PRESETS.remote,
    },
    {
      id: 'premises-full',
      file: 'temple-premises-hq.jpg', // REPLACE when user provides
      size: '600KB',
      reason: 'Complete facilities tour',
      compression: COMPRESSION_PRESETS.remote,
    },
    {
      id: 'night-view',
      file: 'temple-night-hq.jpg', // REPLACE when user provides
      size: '800KB',
      reason: 'Evening ambiance',
      compression: COMPRESSION_PRESETS.remote,
    },
  ],
};

/**
 * Process user-provided images and generate optimal configuration
 */
export const processUserImages = userImageList => {
  console.log('🖼️ Processing user images for optimization...');

  const processed = {
    toBundle: [],
    toRemote: [],
    compressionJobs: [],
    sizeAnalysis: {},
  };

  let bundleSize = 0;

  // Sort images by strategic priority
  const prioritized = userImageList.sort((a, b) => {
    const priorityMap = {critical: 0, important: 1, optional: 2};
    return priorityMap[a.priority] - priorityMap[b.priority];
  });

  prioritized.forEach(image => {
    const estimatedSize = estimateImageSize(image);

    if (
      bundleSize + estimatedSize <= APP_SIZE_BUDGET.maxBundleImageSize &&
      (image.priority === 'critical' || image.priority === 'important')
    ) {
      // Add to bundle
      processed.toBundle.push({
        ...image,
        targetSize: estimatedSize,
        compression: getCompressionLevel(image.priority),
      });

      bundleSize += estimatedSize;

      // Create compression job
      processed.compressionJobs.push({
        input: image.originalPath,
        output: `assets/${image.id}-compressed.jpg`,
        settings: COMPRESSION_PRESETS.bundle,
        targetSize: estimatedSize,
      });
    } else {
      // Add to remote hosting
      processed.toRemote.push({
        ...image,
        compression: COMPRESSION_PRESETS.remote,
        fallback: 'assets/matasharda.jpg', // Keep existing fallback
      });
    }
  });

  processed.sizeAnalysis = {
    totalBundleSize: bundleSize,
    budgetUsed: Math.round(
      (bundleSize / APP_SIZE_BUDGET.maxBundleImageSize) * 100,
    ),
    remainingBudget: APP_SIZE_BUDGET.maxBundleImageSize - bundleSize,
    recommendation: BundleSizeMonitor.getRecommendation(),
  };

  return processed;
};

/**
 * Generate updated imageUtils.js configuration
 */
export const generateOptimizedConfig = processedImages => {
  const config = {
    hero: {
      main: 'require("../assets/temple-hero-compressed.jpg")', // Update when available
      fallback: 'require("../assets/matasharda.jpg")',
      bundled: true,
    },

    gallery: [],
    sections: {},
  };

  // Build gallery from processed images
  processedImages.toBundle.forEach(image => {
    if (image.category === 'gallery') {
      config.gallery.push({
        id: image.id,
        local: `require("../assets/${image.id}-compressed.jpg")`,
        remote: image.remoteUrl || 'PENDING_UPLOAD',
        caption: image.caption,
        description: image.description,
        bundled: true,
      });
    }
  });

  processedImages.toRemote.forEach(image => {
    if (image.category === 'gallery') {
      config.gallery.push({
        id: image.id,
        local: 'require("../assets/matasharda.jpg")', // Fallback only
        remote: image.remoteUrl || 'PENDING_UPLOAD',
        caption: image.caption,
        description: image.description,
        bundled: false,
      });
    }
  });

  return config;
};

/**
 * Estimate image size based on dimensions and quality
 */
const estimateImageSize = imageConfig => {
  const baseSize = (imageConfig.width || 800) * (imageConfig.height || 600) * 3; // RGB
  const quality = imageConfig.quality || 0.8;
  return Math.round(baseSize * quality * 0.1); // Rough JPG compression
};

/**
 * Get compression level based on priority
 */
const getCompressionLevel = priority => {
  switch (priority) {
    case 'critical':
      return APP_SIZE_BUDGET.quality;
    case 'important':
      return APP_SIZE_BUDGET.balanced;
    case 'optional':
      return APP_SIZE_BUDGET.aggressive;
    default:
      return APP_SIZE_BUDGET.balanced;
  }
};

/**
 * IMAGE INTEGRATION INSTRUCTIONS FOR USER
 */
export const INTEGRATION_INSTRUCTIONS = {
  step1: {
    title: '📁 ORGANIZE YOUR IMAGES',
    actions: [
      "Create a 'temple-images' folder with your photos",
      'Name files descriptively: temple-main.jpg, ropeway.jpg, stairs.jpg, etc.',
      'Ensure images are high-quality (min 1200px width)',
    ],
  },

  step2: {
    title: '⚡ COMPRESSION STRATEGY',
    actions: [
      "I'll automatically compress images for optimal app performance",
      'Critical images (hero, main temple): 400KB max',
      'Important images (stairs, ropeway): 200KB max',
      'Gallery images: Smart compression based on usage',
    ],
  },

  step3: {
    title: '📱 DEPLOYMENT APPROACH',
    options: {
      conservative: {
        bundle: 'Bundle 2-3 critical images (~1MB)',
        remote: 'Host remaining images on CDN',
        appSize: 'Minimal app size increase',
        performance: 'Excellent for slow networks',
      },
      balanced: {
        bundle: 'Bundle 4-5 important images (~2MB)',
        remote: 'Host high-quality versions remotely',
        appSize: 'Moderate app size increase',
        performance: 'Best overall experience',
      },
      aggressive: {
        bundle: 'Bundle most images (~3-5MB)',
        remote: 'Minimal remote dependencies',
        appSize: 'Larger app download',
        performance: 'Instant loading for all images',
      },
    },
  },

  step4: {
    title: '🔄 AUTOMATIC IMPLEMENTATION',
    process: [
      'Analyze your image dimensions and file sizes',
      'Generate optimized versions for bundling',
      'Update imageUtils.js with new configurations',
      'Set up remote hosting for high-quality versions',
      'Implement progressive loading (thumbnail → full quality)',
    ],
  },
};

/**
 * Quick setup for user images
 */
export const quickSetup = {
  minimumImages: [
    {
      id: 'hero',
      name: 'Main temple view for hero banner',
      priority: 'critical',
    },
    {id: 'ropeway', name: 'Ropeway system photo', priority: 'important'},
    {id: 'stairs', name: 'Temple stairs (1063 steps)', priority: 'important'},
    {id: 'interior', name: 'Temple interior/shrine', priority: 'optional'},
    {id: 'panoramic', name: 'Mountain/landscape view', priority: 'optional'},
  ],

  optimalImages: [
    {id: 'hero', name: 'Main temple - day view', priority: 'critical'},
    {
      id: 'hero-night',
      name: 'Main temple - evening view',
      priority: 'important',
    },
    {id: 'ropeway-station', name: 'Ropeway station', priority: 'important'},
    {
      id: 'ropeway-journey',
      name: 'Ropeway cable car view',
      priority: 'optional',
    },
    {id: 'stairs-bottom', name: 'Start of 1063 steps', priority: 'important'},
    {id: 'stairs-middle', name: 'Midway rest point', priority: 'optional'},
    {id: 'stairs-top', name: 'Top of stairs view', priority: 'optional'},
    {id: 'interior-shrine', name: 'Main shrine/deity', priority: 'optional'},
    {id: 'interior-prayer', name: 'Prayer area', priority: 'optional'},
    {
      id: 'panoramic-hills',
      name: 'Surrounding hills view',
      priority: 'optional',
    },
    {id: 'premises-courtyard', name: 'Temple courtyard', priority: 'optional'},
    {
      id: 'facilities',
      name: 'Temple facilities overview',
      priority: 'optional',
    },
  ],
};

export default {
  OPTIMIZED_STRATEGY,
  processUserImages,
  generateOptimizedConfig,
  INTEGRATION_INSTRUCTIONS,
  quickSetup,
};
