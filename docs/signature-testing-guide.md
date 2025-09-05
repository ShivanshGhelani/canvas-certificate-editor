# Signature Functionality Testing Guide

## Overview

This document provides comprehensive testing procedures for the signature functionality fixes, including automatic background removal, drag and drop, and resizing features.

## Pre-Testing Setup

### 1. Environment Check
```bash
# Ensure you're in the project root
cd e:\canvas\canvas-certificate-editor

# Check if Node.js is available
node --version

# Check if scripts are executable
ls -la scripts/
```

### 2. Run Diagnostic Script
```bash
# Run the diagnostic script to identify issues
node scripts/debug-signature-functionality.js
```

### 3. Apply Migration (if needed)
```bash
# Apply the migration to fix identified issues
node scripts/fix-signature-functionality.js
```

## Manual Testing Procedures

### Test 1: Basic Signature Upload

**Objective**: Verify signature upload functionality works correctly

**Steps**:
1. Open the application in a browser
2. Click the "Signature" button in the top toolbar
3. Select an image file (preferably with white/light background)
4. Verify the signature appears on the canvas

**Expected Results**:
- ✅ File dialog opens when clicking signature button
- ✅ Image uploads successfully
- ✅ Signature appears positioned in the center of the canvas
- ✅ Image maintains proper aspect ratio

**Common Issues**:
- ❌ File dialog doesn't open → Check TopBar.jsx signature button handler
- ❌ Image doesn't appear → Check Canvas.jsx createSimpleSignatureElement function
- ❌ Image appears but positioning is wrong → Check positioning logic in upload handler

### Test 2: Automatic Background Removal

**Objective**: Verify automatic background removal works for signatures

**Steps**:
1. Prepare test images:
   - White background signature
   - Light gray background signature
   - Transparent background signature
2. Upload each image using the signature button
3. Observe background removal results

**Expected Results**:
- ✅ White backgrounds become transparent
- ✅ Light backgrounds become transparent (based on tolerance)
- ✅ Signature content remains intact
- ✅ Edge quality is maintained

**Common Issues**:
- ❌ No background removal → Check if removeWhiteBackground function is loaded
- ❌ Poor quality removal → Adjust tolerance settings
- ❌ Signature content removed → Check algorithm parameters

**Test Images to Use**:
```
Create test images with:
1. Pure white background (#FFFFFF)
2. Light gray background (#F5F5F5)
3. Complex background (to test algorithm limits)
4. Already transparent background
```

### Test 3: Drag and Drop Functionality

**Objective**: Verify signatures can be dragged around the canvas

**Steps**:
1. Upload a signature image
2. Click and hold on the signature
3. Drag to different positions on the canvas
4. Release the mouse button
5. Repeat with different positions

**Expected Results**:
- ✅ Signature follows mouse movement during drag
- ✅ Cursor changes to indicate dragging state
- ✅ Signature stays within canvas boundaries
- ✅ Position updates smoothly without jitter

**Common Issues**:
- ❌ Signature doesn't move → Check makeElementDraggable function attachment
- ❌ Dragging is jumpy → Check mouse event handling
- ❌ Signature moves outside canvas → Check boundary constraints

### Test 4: Resize Functionality

**Objective**: Verify signatures can be resized using handles

**Steps**:
1. Upload a signature image
2. Click on the signature to select it
3. Verify resize handles appear around the signature
4. Drag each corner handle to resize
5. Drag edge handles to resize in one direction
6. Test minimum size constraints

**Expected Results**:
- ✅ 8 resize handles appear when signature is selected (4 corners + 4 edges)
- ✅ Corner handles resize proportionally
- ✅ Edge handles resize in one dimension
- ✅ Minimum size constraints prevent signature from becoming too small
- ✅ Resize handles have appropriate cursors

**Handle Testing Matrix**:
| Handle | Position | Expected Cursor | Expected Behavior |
|--------|----------|----------------|-------------------|
| NW | Top-left | nw-resize | Resize from top-left corner |
| N | Top-center | n-resize | Resize height from top |
| NE | Top-right | ne-resize | Resize from top-right corner |
| E | Right-center | e-resize | Resize width from right |
| SE | Bottom-right | se-resize | Resize from bottom-right corner |
| S | Bottom-center | s-resize | Resize height from bottom |
| SW | Bottom-left | sw-resize | Resize from bottom-left corner |
| W | Left-center | w-resize | Resize width from left |

### Test 5: Delete Functionality

**Objective**: Verify signatures can be deleted

**Steps**:
1. Upload a signature image
2. Click on the signature to select it
3. Verify delete button (×) appears
4. Click the delete button
5. Confirm deletion in the dialog
6. Test canceling deletion

**Expected Results**:
- ✅ Red delete button appears when signature is selected
- ✅ Confirmation dialog appears when delete button is clicked
- ✅ Signature is removed when deletion is confirmed
- ✅ Signature remains when deletion is canceled
- ✅ Delete button has hover effects

### Test 6: Double-Click Replacement

**Objective**: Verify double-clicking allows signature replacement

**Steps**:
1. Upload a signature image
2. Double-click on the signature
3. Select a different image file
4. Verify the signature is replaced
5. Test with background removal images

**Expected Results**:
- ✅ File dialog opens on double-click
- ✅ New image replaces the old one
- ✅ Background removal is applied to replacement image
- ✅ Position and size are maintained

### Test 7: Selection and Visual Feedback

**Objective**: Verify visual feedback works correctly

**Steps**:
1. Upload a signature image
2. Click on the signature to select it
3. Click elsewhere to deselect
4. Hover over the signature without selecting
5. Test with multiple signatures

**Expected Results**:
- ✅ Selected signature has blue border
- ✅ Resize handles and delete button appear when selected
- ✅ Hover effects work (subtle border change)
- ✅ Only one signature can be selected at a time
- ✅ Clicking elsewhere deselects current signature

### Test 8: Feature Parity with Logo Elements

**Objective**: Verify signatures have the same functionality as logos

**Steps**:
1. Upload both a logo and a signature
2. Compare available functionality:
   - Drag and drop
   - Resize handles
   - Delete button
   - Double-click replacement
   - Selection behavior
   - Visual feedback

**Expected Results**:
- ✅ All features work identically between logos and signatures
- ✅ Visual styling is consistent
- ✅ Behavior is predictable and consistent

## Browser Compatibility Testing

### Test Matrix

| Browser | Version | Drag & Drop | Resize | Background Removal | Delete | Notes |
|---------|---------|-------------|--------|-------------------|---------|-------|
| Chrome | Latest | ✅ | ✅ | ✅ | ✅ | Full support expected |
| Firefox | Latest | ✅ | ✅ | ✅ | ✅ | Full support expected |
| Safari | Latest | ⚠️ | ⚠️ | ⚠️ | ✅ | Check canvas support |
| Edge | Latest | ✅ | ✅ | ✅ | ✅ | Full support expected |

## Performance Testing

### Test 9: Large Image Handling

**Objective**: Verify performance with large signature images

**Steps**:
1. Upload a high-resolution signature image (>2MB)
2. Test background removal performance
3. Test drag and resize responsiveness
4. Monitor browser memory usage

**Expected Results**:
- ✅ Large images are processed within reasonable time (<5 seconds)
- ✅ UI remains responsive during processing
- ✅ Memory usage is reasonable
- ✅ No browser crashes or freezes

### Test 10: Multiple Signatures

**Objective**: Verify performance with multiple signature elements

**Steps**:
1. Upload 5+ signature images
2. Test selection switching between signatures
3. Test drag and drop performance
4. Test resize performance

**Expected Results**:
- ✅ All signatures remain functional
- ✅ Performance remains smooth
- ✅ Selection switching works correctly
- ✅ No interference between elements

## Regression Testing

### Test 11: Existing Functionality Preservation

**Objective**: Verify that signature fixes don't break existing features

**Steps**:
1. Test logo upload and manipulation
2. Test text element creation and editing
3. Test background upload and management
4. Test PDF export functionality
5. Test all toolbar functions

**Expected Results**:
- ✅ All existing features work as before
- ✅ No new bugs introduced
- ✅ UI consistency maintained

## Automated Testing

### Unit Tests

```javascript
// Example test structure for signature functionality
describe('Signature Functionality', () => {
  test('createSimpleSignatureElement creates valid element', () => {
    // Test implementation
  });
  
  test('background removal processes images correctly', () => {
    // Test implementation
  });
  
  test('resize handles work correctly', () => {
    // Test implementation
  });
});
```

### Integration Tests

```javascript
describe('Signature Integration', () => {
  test('signature upload flow works end-to-end', () => {
    // Test implementation
  });
  
  test('signature manipulation preserves data', () => {
    // Test implementation
  });
});
```

## Troubleshooting Guide

### Common Issues and Solutions

#### Background Removal Not Working
- **Symptom**: Images upload but background isn't removed
- **Possible Causes**:
  - `removeWhiteBackground` function not loaded
  - Script loading order issues
  - Browser compatibility issues
- **Solutions**:
  - Check browser console for errors
  - Verify script includes in HTML
  - Test with different browsers

#### Resize Handles Not Appearing
- **Symptom**: Selection works but no resize handles
- **Possible Causes**:
  - `addResizeHandles` function not attached
  - CSS conflicts hiding handles
  - Z-index issues
- **Solutions**:
  - Check element selection code
  - Inspect CSS styles
  - Verify handle creation logic

#### Drag and Drop Not Working
- **Symptom**: Can't move signature around canvas
- **Possible Causes**:
  - `makeElementDraggable` not called
  - Event listener conflicts
  - Pointer events disabled
- **Solutions**:
  - Verify drag function attachment
  - Check for event propagation issues
  - Test mouse event handling

## Test Result Documentation

### Test Report Template

```markdown
# Signature Functionality Test Report

## Test Date: [DATE]
## Tester: [NAME]
## Browser: [BROWSER VERSION]

### Test Results Summary
- Total Tests: 11
- Passed: X
- Failed: X
- Skipped: X

### Failed Tests Details
[List any failed tests with details]

### Performance Notes
[Any performance observations]

### Recommendations
[Suggestions for improvements]
```

## Conclusion

This testing guide provides comprehensive coverage of the signature functionality fixes. Follow these procedures to verify that all signature features work correctly and maintain consistency with existing logo functionality.

Remember to test across different browsers and with various image types to ensure robust functionality.
