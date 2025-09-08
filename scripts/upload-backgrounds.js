import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase configuration
const supabaseUrl = 'https://gygschntnaivagnbwmgw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5Z3NjaG50bmFpdmFnbmJ3bWd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0MDQ2MTMsImV4cCI6MjA2NTk4MDYxM30.UKLTge4DV5MT-MahETeN6WUwJdN8O4vBiACv1mZUCLQ';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const BUCKET_NAME = 'campusconnect';

// Background files mapping
const backgroundFiles = {
  landscape: [
    'BlackGoldElegantSeminarCertificateLandscape (1).png',
    'NavyTurqoiseModernTechnologyBusinessWebinarCertificate.png',
    'SimpleWhiteNeumorphicAchievementCertificate.png',
    'BlackandwhitesimplecertificateA4Landscape (1).png',
    'BlackIllustrativeFunnyAwardCertificate (1).png',
    'BlackIllustrativeFunnyAwardCertificate.png',
    'Gemini_Generated_Image_1tnmtk1tnmtk1tnm (1).png',
    'Gemini_Generated_Image_5g23lc5g23lc5g23.png',
    'Gemini_Generated_Image_7y7s517y7s517y7s (1).png',
    'Gemini_Generated_Image_hk7r68hk7r68hk7r.png',
    'Gemini_Generated_Image_k5egwk5egwk5egwk (1).png',
    'Gemini_Generated_Image_oixnz9oixnz9oixn (1).png',
    'Gemini_Generated_Image_pxan4rpxan4rpxan.png',
    'Gemini_Generated_Image_u1klj6u1klj6u1kl.png',
    'Gemini_Generated_Image_v3iqs5v3iqs5v3iq.png'
  ],
  portrait: [
    'seminar-professional-navy.png',
    'seminar-corporate-gray.png',
    'seminar-elegant-gold.png',
    'seminar-formal-green.png',
    'seminar-luxury-black.png',
    'seminar-modern-white.png',
    'seminar-premium-purple.png',
    'seminar-classic-blue.png',
    'sports-champion-gold.png',
    'sports-achievement-red.png',
    'sports-medal-silver.png',
    'sports-victory-blue.png',
    'sports-winner-green.png',
    'sports-competition-orange.png',
    'tech-innovation-blue.png',
    'tech-digital-excellence.png',
    'tech-coding-competition.png',
    'tech-conference-modern.png',
    'tech-ai-ml-event.png',
    'tech-cybersecurity-event.png',
    'tech-hackathon-event.png',
    'workshop-skills-development.png',
    'workshop-creative-arts.png',
    'workshop-professional-training.png',
    'workshop-technical-skills.png',
    'workshop-leadership-development.png',
    'event-cultural-celebration.png',
    'event-arts-festival.png',
    'event-community-service.png',
    'event-social-gathering.png',
    'event-volunteer-service.png',
    'event-literary-achievement.png',
    'event-general-achievement.png'
  ]
};

async function createBucketIfNotExists() {
  console.log('🔍 Testing bucket access...');
  
  // Test direct access to the bucket instead of listing all buckets
  try {
    const { data: files, error: testError } = await supabase.storage
      .from(BUCKET_NAME)
      .list('', { limit: 1 });
      
    if (testError) {
      console.error('❌ Cannot access bucket:', testError);
      return false;
    }
    
    console.log('✅ Bucket is accessible');
  } catch (error) {
    console.error('❌ Error accessing bucket:', error);
    return false;
  }
  
  // Create the backgrounds folder structure if it doesn't exist
  console.log('📁 Ensuring folder structure exists...');
  await createFolderStructure();
  
  return true;
}

async function createFolderStructure() {
  try {
    // Create a dummy file to ensure the folder structure exists
    const dummyContent = new Uint8Array([]);
    
    // Create landscape folder
    await supabase.storage
      .from(BUCKET_NAME)
      .upload('backgrounds/landscape/.keep', dummyContent, { upsert: true });
    
    // Create portrait folder  
    await supabase.storage
      .from(BUCKET_NAME)
      .upload('backgrounds/portrait/.keep', dummyContent, { upsert: true });
    
    console.log('✅ Folder structure created');
  } catch (error) {
    console.log('ℹ️ Folder structure creation attempted (may already exist)');
  }
}

async function uploadFile(localPath, supabasePath) {
  try {
    if (!fs.existsSync(localPath)) {
      console.log(`⚠️ File not found: ${localPath}`);
      return false;
    }
    
    const fileBuffer = fs.readFileSync(localPath);
    
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(supabasePath, fileBuffer, {
        cacheControl: '3600',
        upsert: true,
        contentType: 'image/png'
      });
    
    if (error) {
      console.error(`❌ Upload failed for ${supabasePath}:`, error);
      return false;
    }
    
    console.log(`✅ Uploaded: ${supabasePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error uploading ${supabasePath}:`, error);
    return false;
  }
}

async function uploadBackgrounds() {
  console.log('🚀 Starting background upload to Supabase...');
  
  // Create bucket if it doesn't exist
  const bucketReady = await createBucketIfNotExists();
  if (!bucketReady) {
    console.error('❌ Failed to ensure bucket exists');
    return;
  }
  
  let totalUploaded = 0;
  let totalFailed = 0;
  
  // Upload landscape backgrounds
  console.log('\n📂 Uploading landscape backgrounds...');
  for (const filename of backgroundFiles.landscape) {
    const localPath = path.join(__dirname, '..', 'public', 'backgrounds', 'templates', 'landscape', filename);
    const supabasePath = `backgrounds/landscape/${filename}`;
    
    const success = await uploadFile(localPath, supabasePath);
    if (success) {
      totalUploaded++;
    } else {
      totalFailed++;
    }
  }
  
  // Upload portrait backgrounds (from portrait folder)
  console.log('\n📂 Uploading portrait backgrounds...');
  for (const filename of backgroundFiles.portrait) {
    const localPath = path.join(__dirname, '..', 'public', 'backgrounds', 'templates', 'portrait', filename);
    const supabasePath = `backgrounds/portrait/${filename}`;
    
    const success = await uploadFile(localPath, supabasePath);
    if (success) {
      totalUploaded++;
    } else {
      totalFailed++;
    }
  }
  
  console.log('\n📊 Upload Summary:');
  console.log(`✅ Successfully uploaded: ${totalUploaded} files`);
  console.log(`❌ Failed uploads: ${totalFailed} files`);
  
  if (totalUploaded > 0) {
    console.log('\n🎉 Upload completed! Your backgrounds are now available via Supabase CDN.');
    console.log(`🔗 Bucket URL: https://gygschntnaivagnbwmgw.supabase.co/storage/v1/object/public/${BUCKET_NAME}/`);
  }
}

// Run the upload
uploadBackgrounds().catch(console.error);
