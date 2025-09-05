# Background Template Setup Guide

## 📁 How to Add Your Background Image Templates

### Step 1: Prepare Your Images

1. **Background Images**: Your main certificate background images
   - Recommended size: 1123×794 pixels (certificate dimensions)
   - Format: JPG, PNG, or WebP
   - High quality for professional printing

2. **Preview Images** (Optional): Smaller thumbnail versions
   - Recommended size: 200×120 pixels
   - Used for template selection preview
   - If not provided, placeholders will be shown

### Step 2: Add Images to the Project

1. **Place your background images** in this folder:
   ```
   /public/backgrounds/templates/
   ```

2. **Naming Convention** (suggested):
   ```
   academic-blue.jpg          (main background)
   academic-blue-preview.jpg  (thumbnail - optional)
   
   corporate-gold.jpg
   corporate-gold-preview.jpg
   
   modern-gradient.jpg
   modern-gradient-preview.jpg
   ```

### Step 3: Update Template Configuration

Edit the template configuration in `/public/js/template-manager.js`:

```javascript
this.templates = [
  {
    id: 'your-template-id',           // Unique identifier
    name: 'Your Template Name',        // Display name
    description: 'Template description', // Short description
    category: 'academic',              // Category (academic, corporate, modern, classic, minimal)
    preview: '/backgrounds/templates/your-preview.jpg',     // Preview image path
    background: '/backgrounds/templates/your-background.jpg' // Main background path
  },
  // Add more templates here...
];
```

### Step 4: Template Categories

Choose from these categories for better organization:
- **academic**: Academic certificates, diplomas
- **corporate**: Business awards, corporate certificates  
- **modern**: Contemporary, minimalist designs
- **classic**: Traditional, formal certificates
- **minimal**: Simple, clean backgrounds

### Step 5: Test Your Templates

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Open the certificate editor**

3. **Click "Templates" or "Background" → "Choose Template"**

4. **Select your template** from the modal

## 🎨 Template Examples

### Example 1: Academic Certificate
```javascript
{
  id: 'university-diploma',
  name: 'University Diploma',
  description: 'Traditional university diploma background',
  category: 'academic',
  preview: '/backgrounds/templates/university-diploma-preview.jpg',
  background: '/backgrounds/templates/university-diploma.jpg'
}
```

### Example 2: Corporate Award
```javascript
{
  id: 'employee-award',
  name: 'Employee Excellence',
  description: 'Corporate employee recognition certificate',
  category: 'corporate',  
  preview: '/backgrounds/templates/employee-award-preview.jpg',
  background: '/backgrounds/templates/employee-award.jpg'
}
```

## 🔧 Advanced Customization

### Custom Background Generator
If you don't have image files, the system can generate placeholder backgrounds:

1. **Edit the drawing functions** in `template-manager.js`
2. **Create custom canvas backgrounds** programmatically
3. **Use gradients, borders, and decorative elements**

### Dynamic Categories
Add new categories by:
1. **Adding category button** in the template modal
2. **Updating the category filter** logic
3. **Adding new templates** with your custom category

## 📱 UI Integration

The template system integrates with your existing UI:

- **TopBar**: "Templates" button opens template selector
- **Background Menu**: "Choose Template" option
- **Modal Interface**: Category filtering and template preview
- **Canvas Integration**: Automatic background application

## 🚀 Quick Start

1. **Copy your background images** to `/public/backgrounds/templates/`
2. **Edit the templates array** in `/public/js/template-manager.js`
3. **Add your template configurations**
4. **Test in the certificate editor**

Your templates will be immediately available in the UI!

## 💡 Tips

- **High-resolution images** work best for professional printing
- **Consistent aspect ratios** ensure proper display
- **Descriptive names** help users choose appropriate templates
- **Category organization** improves user experience
- **Preview images** make selection easier (though optional)

The template system is designed to be flexible and easily extensible for your specific needs!
