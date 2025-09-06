/**
 * Fix Script: Restore Default Background to Original Landscape Format
 * 
 * This script fixes the issue where the default background was changed from
 * landscape to portrait orientation, breaking the original design.
 * 
 * The fix maintains the new template system while restoring the default background.
 */

// Backup current state before making changes
function backupCurrentState() {
  const canvas = document.getElementById('background-canvas');
  const wrapper = document.getElementById('certificate-wrapper');
  
  const currentState = {
    canvas: {
      width: canvas?.width || 0,
      height: canvas?.height || 0
    },
    wrapper: {
      width: wrapper?.style.width || getComputedStyle(wrapper)?.width || '',
      height: wrapper?.style.height || getComputedStyle(wrapper)?.height || ''
    },
    timestamp: new Date().toISOString()
  };
  
  console.log('📋 Current state backed up:', currentState);
  return currentState;
}

// Apply the fix to restore landscape default background
function applyDefaultBackgroundFix() {
  console.log('🔧 Applying default background fix...');
  
  // Step 1: Backup current state
  const backup = backupCurrentState();
  
  // Step 2: Check if we need to fix (detect if currently in wrong orientation)
  const canvas = document.getElementById('background-canvas');
  const wrapper = document.getElementById('certificate-wrapper');
  
  if (!canvas || !wrapper) {
    console.error('❌ Required elements not found');
    return false;
  }
  
  const isCurrentlyPortrait = canvas.height > canvas.width;
  
  if (!isCurrentlyPortrait) {
    console.log('✅ Canvas is already in landscape orientation - no fix needed');
    return true;
  }
  
  console.log('🔄 Converting from portrait to landscape...');
  
  // Step 3: Apply the fix only if no template is currently loaded
  const hasTemplate = document.querySelector('.template-element') || 
                     window.templateManager?.getCurrentTemplate?.() ||
                     window.currentBackgroundImage;
  
  if (hasTemplate) {
    console.log('📐 Template detected - keeping portrait orientation for template');
    return true;
  }
  
  // Step 4: Restore original landscape dimensions
  canvas.width = 1123;   // Original landscape width
  canvas.height = 794;   // Original landscape height
  
  console.log(`📏 Canvas dimensions restored: ${canvas.width}x${canvas.height}`);
  
  // Step 5: Update CSS for landscape orientation
  const style = wrapper.style;
  style.width = '297mm';   // A4 landscape width
  style.height = '210mm';  // A4 landscape height
  
  console.log('📐 CSS dimensions restored to landscape');
  
  // Step 6: Redraw background with original function
  if (window.drawBackground && typeof window.drawBackground === 'function') {
    try {
      window.drawBackground();
      console.log('🎨 Background redrawn successfully');
    } catch (error) {
      console.error('❌ Error redrawing background:', error);
      return false;
    }
  } else {
    console.warn('⚠️ drawBackground function not available');
  }
  
  console.log('✅ Default background fix applied successfully');
  return true;
}

// Enhanced fix that detects template state and applies appropriate orientation
function smartOrientationFix() {
  console.log('🧠 Running smart orientation detection...');
  
  const canvas = document.getElementById('background-canvas');
  const wrapper = document.getElementById('certificate-wrapper');
  
  if (!canvas || !wrapper) {
    console.error('❌ Required elements not found');
    return false;
  }
  
  // Detect current state
  const hasTemplate = checkForActiveTemplate();
  const currentOrientation = canvas.width > canvas.height ? 'landscape' : 'portrait';
  
  console.log(`📊 Current state: ${currentOrientation}, Template active: ${hasTemplate}`);
  
  // Apply appropriate orientation
  if (hasTemplate) {
    // Use portrait for templates
    if (currentOrientation !== 'portrait') {
      applyPortraitOrientation(canvas, wrapper);
    }
  } else {
    // Use landscape for default
    if (currentOrientation !== 'landscape') {
      applyLandscapeOrientation(canvas, wrapper);
    }
  }
  
  return true;
}

function checkForActiveTemplate() {
  // Check multiple indicators for active template
  const templateElements = document.querySelectorAll('.template-element');
  const templateManager = window.templateManager?.getCurrentTemplate?.();
  const customBackground = window.currentBackgroundImage;
  const templateClass = document.body.classList.contains('template-active');
  
  return templateElements.length > 0 || templateManager || customBackground || templateClass;
}

function applyLandscapeOrientation(canvas, wrapper) {
  console.log('🔄 Applying landscape orientation...');
  
  canvas.width = 1123;
  canvas.height = 794;
  wrapper.style.width = '297mm';
  wrapper.style.height = '210mm';
  
  // Redraw background
  if (window.drawBackground) {
    window.drawBackground();
  }
  
  console.log('✅ Landscape orientation applied');
}

function applyPortraitOrientation(canvas, wrapper) {
  console.log('🔄 Applying portrait orientation...');
  
  canvas.width = 2480;
  canvas.height = 3508;
  wrapper.style.width = '210mm';
  wrapper.style.height = '297mm';
  
  console.log('✅ Portrait orientation applied');
}

// Validation function to check if fix was successful
function validateFix() {
  const canvas = document.getElementById('background-canvas');
  const wrapper = document.getElementById('certificate-wrapper');
  
  if (!canvas || !wrapper) {
    return { success: false, error: 'Elements not found' };
  }
  
  const hasTemplate = checkForActiveTemplate();
  const isLandscape = canvas.width > canvas.height;
  const expectedOrientation = hasTemplate ? 'portrait' : 'landscape';
  const actualOrientation = isLandscape ? 'landscape' : 'portrait';
  
  const success = expectedOrientation === actualOrientation;
  
  return {
    success,
    hasTemplate,
    expectedOrientation,
    actualOrientation,
    canvasDimensions: { width: canvas.width, height: canvas.height },
    wrapperDimensions: { 
      width: wrapper.style.width || getComputedStyle(wrapper).width, 
      height: wrapper.style.height || getComputedStyle(wrapper).height 
    }
  };
}

// Main execution function
function executeFix() {
  console.log('🚀 Starting default background fix...');
  
  try {
    const result = smartOrientationFix();
    if (result) {
      const validation = validateFix();
      if (validation.success) {
        console.log('✅ Fix completed successfully');
        console.log('📊 Validation result:', validation);
        return true;
      } else {
        console.error('❌ Fix validation failed:', validation);
        return false;
      }
    } else {
      console.error('❌ Fix application failed');
      return false;
    }
  } catch (error) {
    console.error('❌ Error during fix execution:', error);
    return false;
  }
}

// Export functions
if (typeof module !== 'undefined') {
  module.exports = {
    applyDefaultBackgroundFix,
    smartOrientationFix,
    validateFix,
    executeFix
  };
}

// Auto-execute fix when DOM is ready
if (typeof window !== 'undefined') {
  // Execute fix when elements are available
  function tryExecuteFix() {
    const canvas = document.getElementById('background-canvas');
    const wrapper = document.getElementById('certificate-wrapper');
    
    if (canvas && wrapper) {
      executeFix();
    } else {
      // Retry after a short delay
      setTimeout(tryExecuteFix, 500);
    }
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryExecuteFix);
  } else {
    tryExecuteFix();
  }
}
