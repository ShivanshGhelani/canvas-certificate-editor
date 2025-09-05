#!/usr/bin/env node

/**
 * Signature Functionality Debug Script
 * 
 * This script helps debug and test signature-related functionality
 * including background removal, drag and drop, and resizing features.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class SignatureDebugger {
  constructor() {
    this.issues = [];
    this.fixes = [];
  }

  /**
   * Check if background removal function is properly exposed
   */
  checkBackgroundRemovalExposure() {
    console.log('🔍 Checking background removal function exposure...');
    
    const canvasPath = path.join(__dirname, '../src/Canvas.jsx');
    const imageUtilsPath = path.join(__dirname, '../public/js/image-utils.js');
    
    try {
      const canvasContent = fs.readFileSync(canvasPath, 'utf8');
      const imageUtilsContent = fs.readFileSync(imageUtilsPath, 'utf8');
      
      // Check if removeWhiteBackground is defined in image-utils.js
      if (!imageUtilsContent.includes('function removeWhiteBackground')) {
        this.issues.push('❌ removeWhiteBackground function not found in image-utils.js');
      } else {
        console.log('✅ removeWhiteBackground function found in image-utils.js');
      }
      
      // Check if function is properly exposed in Canvas.jsx
      if (!canvasContent.includes('window.removeWhiteBackground')) {
        this.issues.push('❌ removeWhiteBackground not exposed to window object in Canvas.jsx');
      } else {
        console.log('✅ removeWhiteBackground exposed to window object');
      }
      
      // Check for script inclusion
      const indexPath = path.join(__dirname, '../index.html');
      if (fs.existsSync(indexPath)) {
        const indexContent = fs.readFileSync(indexPath, 'utf8');
        if (!indexContent.includes('image-utils.js')) {
          this.issues.push('❌ image-utils.js not included in index.html');
        } else {
          console.log('✅ image-utils.js included in HTML');
        }
      }
      
    } catch (error) {
      this.issues.push(`❌ Error reading files: ${error.message}`);
    }
  }

  /**
   * Check signature element functionality completeness
   */
  checkSignatureElementFeatures() {
    console.log('🔍 Checking signature element features...');
    
    const canvasPath = path.join(__dirname, '../src/Canvas.jsx');
    
    try {
      const canvasContent = fs.readFileSync(canvasPath, 'utf8');
      
      // Check if createSimpleSignatureElement exists
      if (!canvasContent.includes('createSimpleSignatureElement')) {
        this.issues.push('❌ createSimpleSignatureElement function not found');
      } else {
        console.log('✅ createSimpleSignatureElement function found');
        
        // Check if it includes resize handles
        const signatureFunctionMatch = canvasContent.match(
          /const createSimpleSignatureElement[\s\S]*?return wrapper;\s*};/
        );
        
        if (signatureFunctionMatch && signatureFunctionMatch[0]) {
          const signatureFunction = signatureFunctionMatch[0];
          
          // Check if makeElementDraggable is called (which adds resize handles)
          if (!signatureFunction.includes('makeElementDraggable')) {
            this.issues.push('❌ Signature element missing resize handles (makeElementDraggable not called)');
            this.fixes.push('🔧 Add makeElementDraggable call to signature elements');
          } else {
            console.log('✅ Signature element has resize handles (via makeElementDraggable)');
          }
          
          // Check if selectElement is called (which adds delete button via showDeleteButton)
          if (!signatureFunction.includes('selectElement')) {
            this.issues.push('❌ Signature element missing delete button (selectElement not called)');
            this.fixes.push('🔧 Add selectElement call to signature elements');
          } else {
            console.log('✅ Signature element has delete button (via selectElement)');
          }
        }
      }
      
    } catch (error) {
      this.issues.push(`❌ Error checking signature features: ${error.message}`);
    }
  }

  /**
   * Check for code duplication between logo and signature elements
   */
  checkCodeDuplication() {
    console.log('🔍 Checking for code duplication...');
    
    const canvasPath = path.join(__dirname, '../src/Canvas.jsx');
    
    try {
      const canvasContent = fs.readFileSync(canvasPath, 'utf8');
      
      // Check if both logo and signature creation functions exist
      const hasLogoFunction = canvasContent.includes('createSimpleLogoElement');
      const hasSignatureFunction = canvasContent.includes('createSimpleSignatureElement');
      
      if (hasLogoFunction && hasSignatureFunction) {
        console.log('✅ Both logo and signature creation functions exist');
        
        // Basic duplication check - look for similar patterns
        const logoMatches = canvasContent.match(/createSimpleLogoElement[\s\S]*?return wrapper;/);
        const signatureMatches = canvasContent.match(/createSimpleSignatureElement[\s\S]*?return wrapper;/);
        
        if (logoMatches && signatureMatches) {
          const logoCode = logoMatches[0];
          const signatureCode = signatureMatches[0];
          
          // Simple similarity check
          const logoLines = logoCode.split('\n').map(line => line.trim()).filter(line => line);
          const signatureLines = signatureCode.split('\n').map(line => line.trim()).filter(line => line);
          
          let similarLines = 0;
          logoLines.forEach(logoLine => {
            if (signatureLines.some(sigLine => 
              this.calculateSimilarity(logoLine, sigLine) > 0.8
            )) {
              similarLines++;
            }
          });
          
          const similarity = similarLines / logoLines.length;
          if (similarity > 0.7) {
            this.issues.push('⚠️ High code duplication detected between logo and signature functions');
            this.fixes.push('🔧 Refactor common functionality into shared base function');
          } else {
            console.log('✅ Acceptable code similarity between logo and signature functions');
          }
        }
      }
      
    } catch (error) {
      this.issues.push(`❌ Error checking code duplication: ${error.message}`);
    }
  }

  /**
   * Calculate string similarity (simple algorithm)
   */
  calculateSimilarity(str1, str2) {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = this.levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }

  /**
   * Calculate Levenshtein distance
   */
  levenshteinDistance(str1, str2) {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }

  /**
   * Generate migration script for fixing issues
   */
  generateMigrationScript() {
    console.log('🔧 Generating migration script...');
    
    const migrationScript = `
/**
 * Signature Functionality Migration Script
 * Auto-generated on ${new Date().toISOString()}
 */

// Issues found:
${this.issues.map(issue => `// ${issue}`).join('\n')}

// Recommended fixes:
${this.fixes.map(fix => `// ${fix}`).join('\n')}

// Migration steps:
// 1. Ensure image-utils.js is properly loaded
// 2. Fix background removal function exposure
// 3. Add missing resize handles to signature elements
// 4. Add missing delete buttons to signature elements
// 5. Implement consistent double-click functionality

console.log('Migration script generated. Review and apply fixes manually.');
`;

    const migrationPath = path.join(__dirname, 'signature-functionality-migration.js');
    fs.writeFileSync(migrationPath, migrationScript);
    console.log(`✅ Migration script saved to: ${migrationPath}`);
  }

  /**
   * Run all diagnostic checks
   */
  runDiagnostics() {
    console.log('🚀 Starting signature functionality diagnostics...\n');
    
    this.checkBackgroundRemovalExposure();
    console.log('');
    
    this.checkSignatureElementFeatures();
    console.log('');
    
    this.checkCodeDuplication();
    console.log('');
    
    // Summary
    console.log('📊 DIAGNOSTIC SUMMARY');
    console.log('====================');
    
    if (this.issues.length === 0) {
      console.log('🎉 No issues found! Signature functionality appears to be working correctly.');
    } else {
      console.log(`❌ Found ${this.issues.length} issue(s):`);
      this.issues.forEach(issue => console.log(`   ${issue}`));
      
      if (this.fixes.length > 0) {
        console.log(`\n🔧 Recommended fixes (${this.fixes.length}):`);
        this.fixes.forEach(fix => console.log(`   ${fix}`));
      }
      
      this.generateMigrationScript();
    }
    
    console.log('\n✅ Diagnostics complete!');
  }
}

// Run diagnostics if this script is executed directly
const signatureDebugger = new SignatureDebugger();
signatureDebugger.runDiagnostics();

export default SignatureDebugger;
