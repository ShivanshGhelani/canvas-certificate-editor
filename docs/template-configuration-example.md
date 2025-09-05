# Example Template Configuration

## How to Add Your Background Images

Copy this example and modify it with your own image details:

```javascript
// In /public/js/template-manager.js, update the templates array:

this.templates = [
  // Your first background template
  {
    id: 'my-academic-template',                    // Unique ID (no spaces)
    name: 'My Academic Certificate',               // Display name
    description: 'Custom academic certificate background',
    category: 'academic',                          // Category for filtering
    preview: '/backgrounds/templates/my-academic-preview.jpg',   // Optional preview
    background: '/backgrounds/templates/my-academic.jpg'         // Main background image
  },
  
  // Your second background template
  {
    id: 'my-corporate-template',
    name: 'My Corporate Award',
    description: 'Professional corporate certificate',
    category: 'corporate',
    preview: '/backgrounds/templates/my-corporate-preview.jpg',
    background: '/backgrounds/templates/my-corporate.jpg'
  },
  
  // Your third background template
  {
    id: 'my-modern-template',
    name: 'My Modern Design',
    description: 'Contemporary certificate background',
    category: 'modern',
    preview: '/backgrounds/templates/my-modern-preview.jpg',
    background: '/backgrounds/templates/my-modern.jpg'
  },
  
  // Add more templates as needed...
];
```

## File Structure

Your files should be organized like this:

```
/public/backgrounds/templates/
├── my-academic.jpg              ← Your main background image
├── my-academic-preview.jpg      ← Thumbnail (optional)
├── my-corporate.jpg             ← Your main background image  
├── my-corporate-preview.jpg     ← Thumbnail (optional)
├── my-modern.jpg                ← Your main background image
├── my-modern-preview.jpg        ← Thumbnail (optional)
└── ... (more of your images)
```

## Categories Available

- `academic` - For educational certificates, diplomas
- `corporate` - For business awards, employee recognition  
- `modern` - For contemporary, minimalist designs
- `classic` - For traditional, formal certificates
- `minimal` - For simple, clean backgrounds

## Quick Start Steps

1. **Place your background images** in `/public/backgrounds/templates/`

2. **Edit `/public/js/template-manager.js`** and replace the templates array with your configuration

3. **Save and refresh** your certificate editor

4. **Click "Templates"** to see your backgrounds available for selection

That's it! Your background images are now ready to use as templates.
