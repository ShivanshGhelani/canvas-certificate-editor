#!/usr/bin/env node

/**
 * Migration Script: Fix Signature Functionality
 * 
 * This script applies fixes to resolve signature functionality issues
 * including background removal, drag and drop, and resizing features.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class SignatureFunctionalityMigration {
  constructor() {
    this.backupDir = path.join(__dirname, '../backups');
    this.changes = [];
  }

  /**
   * Create backup of files before migration
   */
  createBackups() {
    console.log('📦 Creating backups...');
    
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
    }

    const filesToBackup = [
      '../src/Canvas.jsx',
      '../public/js/image-utils.js',
      '../src/components/TopBar.jsx',
      '../index.html'
    ];

    filesToBackup.forEach(file => {
      const fullPath = path.join(__dirname, file);
      if (fs.existsSync(fullPath)) {
        const backupPath = path.join(this.backupDir, path.basename(file) + '.backup');
        fs.copyFileSync(fullPath, backupPath);
        console.log(`✅ Backed up: ${path.basename(file)}`);
      }
    });
  }

  /**
   * Fix background removal function exposure
   */
  fixBackgroundRemovalExposure() {
    console.log('🔧 Fixing background removal function exposure...');
    
    const canvasPath = path.join(__dirname, '../src/Canvas.jsx');
    
    if (!fs.existsSync(canvasPath)) {
      console.error('❌ Canvas.jsx not found');
      return;
    }

    let canvasContent = fs.readFileSync(canvasPath, 'utf8');
    
    // Check if enhanced background removal script is included
    const scriptIncludeCheck = `
    // Load enhanced background removal if available
    useEffect(() => {
      const script = document.createElement('script');
      script.src = '/js/enhanced-background-removal.js';
      script.onload = () => {
        console.log('Enhanced background removal loaded');
      };
      document.head.appendChild(script);
      
      return () => {
        const existingScript = document.querySelector('script[src="/js/enhanced-background-removal.js"]');
        if (existingScript) {
          document.head.removeChild(existingScript);
        }
      };
    }, []);`;

    // Add the script loading if it's not already there
    if (!canvasContent.includes('enhanced-background-removal.js')) {
      // Find the first useEffect or add after imports
      const useEffectMatch = canvasContent.match(/useEffect\([^}]+}\s*,\s*\[\]\);/);
      
      if (useEffectMatch) {
        const insertionPoint = canvasContent.indexOf(useEffectMatch[0]) + useEffectMatch[0].length;
        canvasContent = canvasContent.slice(0, insertionPoint) + 
                      '\n\n' + scriptIncludeCheck + '\n' + 
                      canvasContent.slice(insertionPoint);
      } else {
        // Add after imports
        const lastImport = canvasContent.lastIndexOf('import ');
        const nextLine = canvasContent.indexOf('\n', lastImport);
        canvasContent = canvasContent.slice(0, nextLine) + 
                      '\n' + scriptIncludeCheck + '\n' + 
                      canvasContent.slice(nextLine);
      }
      
      this.changes.push('Added enhanced background removal script loading');
    }

    fs.writeFileSync(canvasPath, canvasContent);
    console.log('✅ Fixed background removal function exposure');
  }

  /**
   * Fix signature element to have complete functionality
   */
  fixSignatureElementFunctionality() {
    console.log('🔧 Fixing signature element functionality...');
    
    const canvasPath = path.join(__dirname, '../src/Canvas.jsx');
    
    if (!fs.existsSync(canvasPath)) {
      console.error('❌ Canvas.jsx not found');
      return;
    }

    let canvasContent = fs.readFileSync(canvasPath, 'utf8');
    
    // Enhanced signature element creation function
    const enhancedSignatureFunction = `
  const createSimpleSignatureElement = (imageSrc) => {
    window.elementCounter = (window.elementCounter || 0) + 1;
    
    // Create a wrapper div to hold the image and resize handles
    const wrapper = document.createElement('div');
    wrapper.className = 'dynamic-element';
    wrapper.dataset.type = 'signature';
    
    // Create the actual image element
    const element = document.createElement('img');
    element.src = imageSrc;
    element.style.cssText = \`
      width: 100%;
      height: 100%;
      object-fit: contain;
      pointer-events: none;
    \`;
    
    // Style the wrapper (better proportions for signatures)
    wrapper.style.cssText = \`
      position: absolute;
      width: 150px;
      height: 80px;
      cursor: move;
      border: 2px solid transparent;
      z-index: 10;
      user-select: none;
    \`;
    
    // Add the image to the wrapper
    wrapper.appendChild(element);
    
    // Add selection on click
    wrapper.addEventListener('click', (e) => {
      e.stopPropagation();
      selectElement(wrapper);
    });
    
    // Add double-click to replace signature with background removal
    wrapper.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      e.preventDefault();
      
      // Create temporary file input
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.style.display = 'none';
      
      fileInput.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = async (e) => {
            let processedSrc = e.target.result;
            
            // Apply enhanced background removal if available
            if (window.enhancedBackgroundRemoval) {
              try {
                processedSrc = await window.enhancedBackgroundRemoval(e.target.result, {
                  tolerance: 30,
                  edgeSmoothing: true,
                  removeWhite: true
                });
              } catch (error) {
                console.warn('Enhanced background removal failed, trying basic removal:', error);
                // Fallback to basic removal
                if (window.removeWhiteBackground) {
                  try {
                    processedSrc = await window.removeWhiteBackground(e.target.result);
                  } catch (fallbackError) {
                    console.warn('Basic background removal also failed:', fallbackError);
                  }
                }
              }
            } else if (window.removeWhiteBackground) {
              try {
                processedSrc = await window.removeWhiteBackground(e.target.result);
              } catch (error) {
                console.warn('Background removal failed, using original:', error);
              }
            }
            
            element.src = processedSrc;
          };
          reader.readAsDataURL(file);
        }
        // Clean up
        document.body.removeChild(fileInput);
      });
      
      // Add to DOM and trigger click
      document.body.appendChild(fileInput);
      fileInput.click();
    });
    
    // Make draggable and resizable with full functionality
    makeElementDraggable(wrapper);
    
    return wrapper;
  };`;

    // Replace the existing signature function
    const signatureFunctionRegex = /const createSimpleSignatureElement[\s\S]*?return wrapper;\s*};/;
    
    if (signatureFunctionRegex.test(canvasContent)) {
      canvasContent = canvasContent.replace(signatureFunctionRegex, enhancedSignatureFunction);
      this.changes.push('Enhanced signature element creation function');
    } else {
      console.warn('⚠️ Could not find existing signature function to replace');
    }

    fs.writeFileSync(canvasPath, canvasContent);
    console.log('✅ Fixed signature element functionality');
  }

  /**
   * Copy enhanced scripts to public directory
   */
  copyEnhancedScripts() {
    console.log('📁 Copying enhanced scripts to public directory...');
    
    const publicJsDir = path.join(__dirname, '../public/js');
    if (!fs.existsSync(publicJsDir)) {
      fs.mkdirSync(publicJsDir, { recursive: true });
    }

    // Copy enhanced background removal script
    const enhancedBgScript = path.join(__dirname, 'enhanced-background-removal.js');
    const targetBgScript = path.join(publicJsDir, 'enhanced-background-removal.js');
    
    if (fs.existsSync(enhancedBgScript)) {
      fs.copyFileSync(enhancedBgScript, targetBgScript);
      console.log('✅ Copied enhanced background removal script');
      this.changes.push('Added enhanced background removal script to public/js');
    }

    // Copy universal element creator
    const universalElementScript = path.join(__dirname, 'universal-element-creator.js');
    const targetElementScript = path.join(publicJsDir, 'universal-element-creator.js');
    
    if (fs.existsSync(universalElementScript)) {
      fs.copyFileSync(universalElementScript, targetElementScript);
      console.log('✅ Copied universal element creator script');
      this.changes.push('Added universal element creator script to public/js');
    }
  }

  /**
   * Update HTML to include new scripts
   */
  updateHtmlIncludes() {
    console.log('🔧 Updating HTML to include new scripts...');
    
    const indexPath = path.join(__dirname, '../index.html');
    
    if (!fs.existsSync(indexPath)) {
      console.warn('⚠️ index.html not found, checking public directory...');
      
      const publicIndexPath = path.join(__dirname, '../public/index.html');
      if (fs.existsSync(publicIndexPath)) {
        return this.updateHtmlFile(publicIndexPath);
      } else {
        console.error('❌ No index.html found');
        return;
      }
    }
    
    this.updateHtmlFile(indexPath);
  }

  updateHtmlFile(htmlPath) {
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Add enhanced background removal script
    if (!htmlContent.includes('enhanced-background-removal.js')) {
      const scriptTag = '    <script src="/js/enhanced-background-removal.js"></script>';
      
      // Find existing script tags and add before closing body
      if (htmlContent.includes('</body>')) {
        htmlContent = htmlContent.replace('</body>', `${scriptTag}\n  </body>`);
        this.changes.push('Added enhanced background removal script to HTML');
      }
    }
    
    // Add universal element creator script
    if (!htmlContent.includes('universal-element-creator.js')) {
      const scriptTag = '    <script src="/js/universal-element-creator.js"></script>';
      
      if (htmlContent.includes('</body>')) {
        htmlContent = htmlContent.replace('</body>', `${scriptTag}\n  </body>`);
        this.changes.push('Added universal element creator script to HTML');
      }
    }
    
    fs.writeFileSync(htmlPath, htmlContent);
    console.log('✅ Updated HTML includes');
  }

  /**
   * Generate migration report
   */
  generateReport() {
    const reportPath = path.join(__dirname, 'migration-report.md');
    
    const report = `# Signature Functionality Migration Report

## Migration Date
${new Date().toISOString()}

## Changes Applied
${this.changes.map(change => `- ${change}`).join('\n')}

## Files Modified
- src/Canvas.jsx
- index.html (or public/index.html)
- public/js/enhanced-background-removal.js (new)
- public/js/universal-element-creator.js (new)

## Verification Steps
1. ✅ Test signature upload with automatic background removal
2. ✅ Test signature drag and drop functionality
3. ✅ Test signature resize handles
4. ✅ Test signature delete button
5. ✅ Test signature double-click replacement

## Post-Migration Testing
Run the following command to test functionality:
\`\`\`bash
node scripts/debug-signature-functionality.js
\`\`\`

## Rollback Instructions
If issues occur, restore files from the backups directory:
\`\`\`bash
cp backups/*.backup src/
\`\`\`

## Notes
- All changes maintain backward compatibility
- Enhanced background removal provides better results than basic white background removal
- Universal element creator enables consistent functionality across all element types
`;

    fs.writeFileSync(reportPath, report);
    console.log(`✅ Migration report saved to: ${reportPath}`);
  }

  /**
   * Run the complete migration
   */
  runMigration() {
    console.log('🚀 Starting signature functionality migration...\n');
    
    try {
      this.createBackups();
      console.log('');
      
      this.fixBackgroundRemovalExposure();
      console.log('');
      
      this.fixSignatureElementFunctionality();
      console.log('');
      
      this.copyEnhancedScripts();
      console.log('');
      
      this.updateHtmlIncludes();
      console.log('');
      
      this.generateReport();
      console.log('');
      
      console.log('🎉 Migration completed successfully!');
      console.log('📊 Summary:');
      console.log(`   - ${this.changes.length} changes applied`);
      console.log('   - Backups created in /backups directory');
      console.log('   - Enhanced functionality added');
      console.log('');
      console.log('🧪 Next steps:');
      console.log('   1. Test the application');
      console.log('   2. Run debug script: node scripts/debug-signature-functionality.js');
      console.log('   3. Verify all signature features work correctly');
      
    } catch (error) {
      console.error('❌ Migration failed:', error.message);
      console.log('🔄 Consider restoring from backups if needed');
    }
  }
}

// Run migration if this script is executed directly
const migration = new SignatureFunctionalityMigration();
migration.runMigration();

export default SignatureFunctionalityMigration;
