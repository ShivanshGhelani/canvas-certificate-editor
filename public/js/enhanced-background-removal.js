/**
 * Enhanced Background Removal Utility
 * 
 * This script provides improved background removal functionality
 * for signature images with better algorithm and transparent background support.
 */

/**
 * Enhanced background removal function that handles multiple background types including shadows
 * @param {string} imageSrc - Base64 image source
 * @param {Object} options - Configuration options
 * @returns {Promise<string>} - Base64 image with transparent background and shadows removed
 */
function enhancedBackgroundRemoval(imageSrc, options = {}) {
  return new Promise((resolve, reject) => {
    const {
      tolerance = 30,
      shadowTolerance = 40,
      edgeSmoothing = true,
      removeWhite = true,
      removeTransparent = true,
      removeShadows = true,
      customColor = null,
      shadowDetectionSensitivity = 0.7
    } = options;

    const img = new Image();
    img.crossOrigin = "Anonymous";
    
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        
        // Draw the original image
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Determine background color to remove
        let targetR, targetG, targetB;
        
        if (customColor) {
          [targetR, targetG, targetB] = customColor;
        } else {
          // Sample corners to determine background color
          const corners = [
            [0, 0], // top-left
            [canvas.width - 1, 0], // top-right
            [0, canvas.height - 1], // bottom-left
            [canvas.width - 1, canvas.height - 1] // bottom-right
          ];
          
          const cornerColors = corners.map(([x, y]) => {
            const index = (y * canvas.width + x) * 4;
            return [data[index], data[index + 1], data[index + 2]];
          });
          
          // Use most common corner color as background
          targetR = Math.round(cornerColors.reduce((sum, color) => sum + color[0], 0) / 4);
          targetG = Math.round(cornerColors.reduce((sum, color) => sum + color[1], 0) / 4);
          targetB = Math.round(cornerColors.reduce((sum, color) => sum + color[2], 0) / 4);
        }
        
        // Process each pixel for background and shadow removal
        const shadowAreas = removeShadows ? detectShadowAreas(data, canvas.width, canvas.height, shadowDetectionSensitivity) : new Set();
        
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          const pixelIndex = i / 4;
          
          // Check if pixel should be made transparent
          let shouldRemove = false;
          
          // Remove white backgrounds
          if (removeWhite && isWhiteish(r, g, b, tolerance)) {
            shouldRemove = true;
          }
          
          // Remove transparent backgrounds
          if (removeTransparent && a < 255) {
            shouldRemove = true;
          }
          
          // Remove target background color
          const colorDiff = Math.sqrt(
            Math.pow(r - targetR, 2) + 
            Math.pow(g - targetG, 2) + 
            Math.pow(b - targetB, 2)
          );
          
          if (colorDiff < tolerance) {
            shouldRemove = true;
          }
          
          // Remove shadows
          if (removeShadows && shadowAreas.has(pixelIndex)) {
            const shadowIntensity = calculateShadowIntensity(r, g, b, targetR, targetG, targetB);
            if (shadowIntensity > shadowDetectionSensitivity) {
              shouldRemove = true;
            } else {
              // Partial transparency for light shadows
              const alpha = Math.max(0, Math.min(255, a * (1 - shadowIntensity * 0.5)));
              data[i + 3] = alpha;
            }
          }
          
          // Apply transparency
          if (shouldRemove) {
            data[i + 3] = 0; // Make transparent
          }
        }
        
        // Apply edge smoothing if enabled
        if (edgeSmoothing) {
          smoothEdges(data, canvas.width, canvas.height);
        }
        
        // Put processed image data back
        ctx.putImageData(imageData, 0, 0);
        
        // Return as base64
        resolve(canvas.toDataURL('image/png'));
        
      } catch (error) {
        reject(error);
      }
    };
    
    img.onerror = (error) => {
      reject(new Error('Failed to load image for background removal'));
    };
    
    img.src = imageSrc;
  });
}

/**
 * Check if a color is whitish based on tolerance
 */
function isWhiteish(r, g, b, tolerance) {
  const threshold = 255 - tolerance;
  return r > threshold && g > threshold && b > threshold;
}

/**
 * Smooth edges to reduce aliasing artifacts
 */
function smoothEdges(data, width, height) {
  const newData = new Uint8ClampedArray(data);
  
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const index = (y * width + x) * 4;
      
      // Skip if pixel is already opaque
      if (data[index + 3] === 255) continue;
      
      // Check neighbors
      const neighbors = [
        [(x-1), (y-1)], [x, (y-1)], [(x+1), (y-1)],
        [(x-1), y],                 [(x+1), y],
        [(x-1), (y+1)], [x, (y+1)], [(x+1), (y+1)]
      ];
      
      let opaqueCount = 0;
      let totalR = 0, totalG = 0, totalB = 0;
      
      neighbors.forEach(([nx, ny]) => {
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const nIndex = (ny * width + nx) * 4;
          if (data[nIndex + 3] > 0) {
            opaqueCount++;
            totalR += data[nIndex];
            totalG += data[nIndex + 1];
            totalB += data[nIndex + 2];
          }
        }
      });
      
      // Apply smoothing if we have opaque neighbors
      if (opaqueCount > 0 && data[index + 3] === 0) {
        const alpha = Math.min(255, opaqueCount * 32); // Gradual alpha
        newData[index] = totalR / opaqueCount;
        newData[index + 1] = totalG / opaqueCount;
        newData[index + 2] = totalB / opaqueCount;
        newData[index + 3] = alpha;
      }
    }
  }
  
  // Copy smoothed data back
  for (let i = 0; i < data.length; i++) {
    data[i] = newData[i];
  }
}

/**
 * Detect shadow areas in the image
 * @param {Uint8ClampedArray} data - Image data
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @param {number} sensitivity - Shadow detection sensitivity (0-1)
 * @returns {Set} - Set of pixel indices that are shadows
 */
function detectShadowAreas(data, width, height, sensitivity = 0.7) {
  const shadowPixels = new Set();
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      
      // Calculate luminance (brightness)
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      
      // Check if pixel is likely a shadow
      if (isShadowPixel(r, g, b, luminance, sensitivity)) {
        shadowPixels.add(index / 4);
      }
    }
  }
  
  // Apply morphological operations to clean up shadow detection
  return refineShadowDetection(shadowPixels, width, height, data);
}

/**
 * Check if a pixel is likely part of a shadow
 * @param {number} r - Red value
 * @param {number} g - Green value
 * @param {number} b - Blue value
 * @param {number} luminance - Calculated luminance
 * @param {number} sensitivity - Detection sensitivity
 * @returns {boolean} - True if pixel is likely a shadow
 */
function isShadowPixel(r, g, b, luminance, sensitivity) {
  // Shadows are typically:
  // 1. Darker than the background
  // 2. Have reduced saturation
  // 3. Maintain color ratios similar to the background
  
  // Check if pixel is in the shadow luminance range
  const shadowLuminanceRange = [0.3, 0.8]; // Adjust based on sensitivity
  const adjustedRange = [
    shadowLuminanceRange[0] * sensitivity,
    shadowLuminanceRange[1] * sensitivity
  ];
  
  if (luminance < adjustedRange[0] || luminance > adjustedRange[1]) {
    return false;
  }
  
  // Check if colors are desaturated (common in shadows)
  const maxChannel = Math.max(r, g, b);
  const minChannel = Math.min(r, g, b);
  const saturation = maxChannel === 0 ? 0 : (maxChannel - minChannel) / maxChannel;
  
  // Shadows typically have low saturation
  return saturation < 0.3 && luminance < 0.7;
}

/**
 * Calculate shadow intensity for a pixel
 * @param {number} r - Red value
 * @param {number} g - Green value
 * @param {number} b - Blue value
 * @param {number} bgR - Background red
 * @param {number} bgG - Background green
 * @param {number} bgB - Background blue
 * @returns {number} - Shadow intensity (0-1)
 */
function calculateShadowIntensity(r, g, b, bgR, bgG, bgB) {
  // Calculate how much darker this pixel is compared to background
  const pixelLuminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  const bgLuminance = (0.299 * bgR + 0.587 * bgG + 0.114 * bgB) / 255;
  
  if (bgLuminance === 0) return 0;
  
  const darkeningRatio = 1 - (pixelLuminance / bgLuminance);
  return Math.max(0, Math.min(1, darkeningRatio));
}

/**
 * Refine shadow detection using morphological operations
 * @param {Set} shadowPixels - Initial shadow pixel set
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @param {Uint8ClampedArray} data - Image data
 * @returns {Set} - Refined shadow pixel set
 */
function refineShadowDetection(shadowPixels, width, height, data) {
  const refined = new Set();
  
  for (const pixelIndex of shadowPixels) {
    const x = pixelIndex % width;
    const y = Math.floor(pixelIndex / width);
    
    // Check neighborhood to confirm shadow
    let shadowNeighbors = 0;
    let totalNeighbors = 0;
    
    for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        const nx = x + dx;
        const ny = y + dy;
        
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const nIndex = ny * width + nx;
          totalNeighbors++;
          if (shadowPixels.has(nIndex)) {
            shadowNeighbors++;
          }
        }
      }
    }
    
    // Keep pixel if it has enough shadow neighbors (reduces noise)
    const shadowRatio = shadowNeighbors / totalNeighbors;
    if (shadowRatio > 0.3) {
      refined.add(pixelIndex);
    }
  }
  
  return refined;
}

/**
 * Test the background removal function with sample image
 */
function testBackgroundRemoval() {
  console.log('🧪 Testing enhanced background removal...');
  
  // Create a test canvas with white background and colored content
  const testCanvas = document.createElement('canvas');
  testCanvas.width = 100;
  testCanvas.height = 100;
  const ctx = testCanvas.getContext('2d');
  
  // White background
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 100, 100);
  
  // Colored content
  ctx.fillStyle = 'blue';
  ctx.fillRect(25, 25, 50, 50);
  
  const testImageSrc = testCanvas.toDataURL();
  
  enhancedBackgroundRemoval(testImageSrc)
    .then(result => {
      console.log('✅ Background removal test passed');
      console.log('📊 Result length:', result.length);
    })
    .catch(error => {
      console.error('❌ Background removal test failed:', error);
    });
}

/**
 * Export functions for use in the main application
 */
if (typeof window !== 'undefined') {
  // Browser environment
  window.enhancedBackgroundRemoval = enhancedBackgroundRemoval;
  window.testBackgroundRemoval = testBackgroundRemoval;
  
  // Maintain backward compatibility
  window.removeWhiteBackground = (imageSrc, tolerance = 20) => {
    return enhancedBackgroundRemoval(imageSrc, { tolerance, removeWhite: true });
  };
  
  console.log('✅ Enhanced background removal functions loaded');
}

// Node.js environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    enhancedBackgroundRemoval,
    testBackgroundRemoval
  };
}

// Auto-test if in browser
if (typeof window !== 'undefined' && window.location) {
  // Run test after page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', testBackgroundRemoval);
  } else {
    testBackgroundRemoval();
  }
}
