# ✅ Automatic Template Layout System

## 🎯 What This Does

Your certificate editor now **automatically adjusts** the layout based on the template you select! 

### 🚀 **Smart Layout Features**

#### **Automatic Positioning**
- **Signature areas** move to optimal positions based on template design
- **Title positioning** adjusts for different background styles
- **Content areas** resize and reposition for better visual balance
- **Authority titles** change to match event types

#### **Event-Specific Signatures**
Each template category has appropriate authority titles:

- **📚 Seminars**: Organizer → Head of Department → Principal
- **🏆 Sports**: Coach → Sports Director → Principal  
- **💻 Tech Events**: Tech Lead → Department Head → Director
- **🛠️ Workshops**: Instructor/Trainer → Coordinator → Director
- **🎭 Non-Tech Events**: Event Coordinator → Faculty Head → Principal

#### **Dynamic Layout Adjustments**
- **Title sizes** automatically scale based on template style
- **Signature spacing** adjusts to prevent overlap with background elements
- **Content positioning** optimizes readability for each template
- **Responsive positioning** maintains proportions across different screen sizes

### 🎨 **How It Works**

#### **1. Template Selection**
When you select any template from:
- Seminars, Sports, Tech Events, Workshops, or Non-Tech Events

#### **2. Automatic Detection**
The system automatically:
- ✅ Applies the background image
- ✅ Adjusts signature positions
- ✅ Updates authority titles
- ✅ Optimizes title and content positioning
- ✅ Ensures proper spacing and alignment

#### **3. Smart Positioning**
Each template has pre-configured:
- **Signature coordinates** (left/top percentages)
- **Title positioning** (top margin and font size)
- **Content area** dimensions and spacing
- **Authority roles** appropriate for the event type

### 📐 **Layout Configurations**

Each template includes layout data like:
```javascript
layout: {
  titlePosition: { top: '15%', fontSize: '48px' },
  contentArea: { top: '30%', height: '40%' },
  signatureArea: { top: '80%', layout: 'horizontal' },
  signatures: [
    { position: { left: '15%', top: '85%' }, title: 'Organizer' },
    { position: { left: '42.5%', top: '85%' }, title: 'Head of Department' },
    { position: { left: '70%', top: '85%' }, title: 'Principal' }
  ]
}
```

### 🔄 **Reset Function**

- **Default Layout**: Click "Reset to Default" to restore original positioning
- **Template Switch**: Layouts automatically update when switching templates
- **Flexible Editing**: You can still manually adjust elements after automatic positioning

### 🎉 **Benefits**

✅ **No Manual Positioning**: Elements automatically place themselves optimally
✅ **Professional Results**: Each template looks professionally designed
✅ **Event-Appropriate**: Authority titles match the event type
✅ **Time Saving**: No need to manually adjust layouts for different templates
✅ **Consistent Quality**: Every certificate looks polished and well-positioned
✅ **Responsive Design**: Works across different screen sizes and export formats

### 🚀 **Usage**

1. **Select any template** from Templates → Category → Template
2. **Watch automatic adjustment** - signatures and titles reposition instantly
3. **Customize as needed** - you can still manually adjust after auto-positioning
4. **Export your certificate** - layout is preserved in PDF/PNG exports

Your certificate editor now provides a **professional, automated design experience** that adapts intelligently to each template style! 🎨✨
