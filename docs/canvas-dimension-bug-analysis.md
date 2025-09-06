# 🐛 Canvas Dimension Bug Analysis

## Issue Summary
User reports that A4 landscape dimensions (3508×2480px at 300 DPI) are not being applied correctly despite recent updates.

## Root Cause Identified
The `drawBackground()` function in `/public/js/core.js` is **overriding the canvas dimensions** by resetting them to the CSS wrapper's `offsetWidth` and `offsetHeight`.

### Problem Code (Line 9-10 in core.js)
```javascript
canvas.width = wrapper.offsetWidth;   // ❌ OVERRIDES A4 dimensions
canvas.height = wrapper.offsetHeight; // ❌ OVERRIDES A4 dimensions  
```

## Technical Analysis

### Current Flow:
1. ✅ Canvas.jsx sets: `<canvas width="3508" height="2480">`
2. ✅ Layout.jsx reset sets: `canvas.width = 3508; canvas.height = 2480;`
3. ❌ **core.js drawBackground() OVERWRITES to wrapper size**
4. ❌ User sees incorrect dimensions

### CSS Wrapper Impact:
- Wrapper CSS: `width: 297mm; height: 210mm;`
- Browser renders as: ~1123px × 794px (depending on screen DPI)
- drawBackground() sets canvas to these display dimensions
- **Result: Canvas loses 300 DPI specification**

## Files Affected

### 1. `/public/js/core.js` (PRIMARY ISSUE)
- **Line 9-10**: Canvas dimension override
- **Impact**: Destroys A4 300 DPI dimensions every time background redraws
- **Frequency**: Called on window resize, template changes, background redraws

### 2. `/src/Canvas.jsx`  
- **Status**: Correctly set to 3508×2480
- **Issue**: Gets overridden by core.js

### 3. `/src/components/Layout.jsx`
- **Status**: Correctly manages dimensions in handleTemplateReset()
- **Issue**: Changes get overridden when drawBackground() is called

## Impact Assessment

### User Experience:
- ❌ A4 300 DPI dimensions not maintained
- ❌ Print quality compromised 
- ❌ Exported files have wrong resolution
- ❌ Professional print specifications not met

### Technical Debt:
- Core.js assumes canvas should match display wrapper
- No separation between display size and canvas resolution
- Background redraw destroys dimension settings

## Solution Strategy

### Option 1: Fix drawBackground() (RECOMMENDED)
- Remove dimension override in core.js
- Preserve existing canvas dimensions
- Maintain A4 300 DPI specification

### Option 2: Conditional Dimension Setting
- Check if canvas already has correct A4 dimensions
- Only override if dimensions are not already set correctly

### Option 3: Display vs Resolution Separation
- Maintain 300 DPI canvas internally
- Use CSS transform for display scaling
- More complex but cleaner architecture

## Files to Create/Update

### 🔧 Fix Files:
1. **core.js** - Remove dimension override
2. **Test script** - Verify dimension persistence

### 📁 Documentation:
1. **Bug resolution summary** - Document the fix
2. **Dimension management guide** - Prevent future issues

## Implementation Priority
🚨 **HIGH PRIORITY** - This breaks the core A4 300 DPI requirement
