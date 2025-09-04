# Text Element Feature Documentation

## Overview
This implementation provides a complete text editing system for the Certificate Editor with the following features:

### ✅ Implemented Features
- **Add Text Button**: Click "Text" in the toolbar to add new text elements
- **Default Text**: New elements start with "Enter Text"
- **Drag & Drop**: Text elements are fully draggable within the certificate canvas
- **Resizing**: Visual resize handles with corner drag points
- **Double-click Editing**: Double-click any text to enter edit mode
- **Text Toolbar**: Rich formatting controls appear when text is selected
- **Font Properties**: Font family, size, color, weight, style, alignment support
- **Selection Management**: Clean selection/deselection with visual feedback
- **Delete Functionality**: Delete button appears when text is selected

## Architecture

### Components Structure
```
src/
├── components/
│   ├── TextElement.jsx      # Individual draggable text component
│   ├── TextToolbar.jsx      # Floating formatting toolbar
│   ├── TopBar.jsx           # Updated with Text button
│   └── Layout.jsx           # Updated to connect components
├── hooks/
│   └── useTextElements.js   # State management hook
└── Canvas.jsx               # Main canvas with text rendering
```

### Key Components

#### 1. TextElement.jsx
- Handles individual text element behavior
- Manages dragging, resizing, editing states
- Provides selection visual feedback
- Supports all text formatting properties

#### 2. TextToolbar.jsx
- Floating toolbar that appears when text is selected
- Font family dropdown with preview
- Font size controls with +/- buttons
- Color picker with visual preview
- Bold, italic formatting toggles
- Text alignment controls (left, center, right)

#### 3. useTextElements.js
- Custom React hook for state management
- Manages array of text elements
- Handles CRUD operations (create, read, update, delete)
- Manages selection state
- Provides helper functions

#### 4. Updated Components
- **TopBar.jsx**: Added onAddText prop and handler
- **Layout.jsx**: Connected text functionality between components
- **Canvas.jsx**: Integrated text element rendering and toolbar

## Usage

### For Users
1. **Adding Text**: Click the "Text" button in the toolbar
2. **Moving Text**: Click and drag any text element
3. **Editing Text**: Double-click to enter edit mode
4. **Formatting**: Select text to show formatting toolbar
5. **Deleting**: Click the red × button when text is selected

### For Developers

#### Adding New Text Elements Programmatically
```javascript
// Access through the canvas ref
const handleAddText = () => {
  canvasRef.current.addTextElement();
};
```

#### Customizing Text Properties
```javascript
// Add text with custom properties
addTextElement({
  text: "Custom Text",
  position: { x: 200, y: 100 },
  fontSize: 32,
  fontFamily: "Helvetica",
  color: "#ff0000",
  fontWeight: "bold"
});
```

#### State Management
```javascript
const {
  textElements,           // Array of all text elements
  selectedElementId,      // Currently selected element ID
  addTextElement,         // Function to add new element
  updateTextElement,      // Function to update element
  deleteTextElement,      // Function to delete element
  selectTextElement,      // Function to select element
  deselectAll,           // Function to clear selection
  getSelectedElement,    // Get selected element object
  updateSelectedElement  // Update selected element
} = useTextElements();
```

## Technical Details

### Text Element Properties
```javascript
{
  id: "text-1",                    // Unique identifier
  text: "Enter Text",              // Text content
  position: { x: 150, y: 150 },   // Position in pixels
  fontSize: 24,                    // Font size in pixels
  fontFamily: "Arial",             // Font family name
  color: "#000000",                // Hex color code
  fontWeight: "normal",            // "normal" | "bold"
  fontStyle: "normal",             // "normal" | "italic"
  textAlign: "left"                // "left" | "center" | "right"
}
```

### Event Handling
- **Mouse Events**: Drag, resize, selection
- **Keyboard Events**: Enter to finish editing, Escape to cancel
- **Focus Events**: Auto-focus when entering edit mode
- **Canvas Events**: Click outside to deselect

### Styling Features
- **Visual Feedback**: Blue outline for selection
- **Resize Handles**: Corner drag points with visual indicators
- **Hover Effects**: Subtle hover states for better UX
- **Z-index Management**: Proper layering during drag operations

## Performance Considerations

### Optimizations Implemented
- **Event Delegation**: Efficient mouse event handling
- **State Updates**: Batched updates for smooth performance
- **Re-render Optimization**: React.memo and useCallback usage
- **DOM Manipulation**: Direct manipulation for drag operations

### Memory Management
- **Event Cleanup**: Proper event listener removal
- **State Cleanup**: Clean component unmounting
- **Reference Management**: Proper ref handling

## Future Enhancements

### Planned Features
- [ ] Text rotation support
- [ ] Multi-line text editing
- [ ] Text shadows and effects
- [ ] Copy/paste functionality
- [ ] Undo/redo system
- [ ] Keyboard shortcuts
- [ ] Text templates and presets

### Possible Improvements
- [ ] Touch/mobile support
- [ ] Accessibility features
- [ ] Advanced typography controls
- [ ] Text animation support
- [ ] Group selection and operations

## Browser Compatibility
- ✅ Modern Chrome, Firefox, Safari, Edge
- ✅ CSS Grid and Flexbox support required
- ✅ ES6+ JavaScript features used
- ✅ Responsive design for different screen sizes

## Testing
The implementation includes test utilities in `test-text-elements.js` for browser console testing:

```javascript
// Test adding text elements
window.testTextFunctions.testAddText();

// Test text element interactions
window.testTextFunctions.testTextElement();
```
