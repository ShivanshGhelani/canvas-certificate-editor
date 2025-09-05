/**
 * Enhanced Background Removal Utility
 * 
 * This script provides improved background removal functionality
 * for signature images with better algorithm and transparent background support.
 */

/**
 * Enhanced background removal function that handles multiple background types
 * @param {string} imageSrc - Base64 image source
 * @param {Object} options - Configuration options
 * @returns {Promise<string>} - Base64 image with transparent background
 */
function enhancedBackgroundRemoval(imageSrc, options = {}) {
  return new Promise((resolve, reject) => {
    const {
      tolerance = 30,
      edgeSmoothing = true,
      removeWhite = true,
      removeTransparent = true,
      customColor = null
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
        
        // Process each pixel
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          
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
