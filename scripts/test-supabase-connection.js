import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://gygschntnaivagnbwmgw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5Z3NjaG50bmFpdmFnbmJ3bWd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0MDQ2MTMsImV4cCI6MjA2NTk4MDYxM30.UKLTge4DV5MT-MahETeN6WUwJdN8O4vBiACv1mZUCLQ';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('🔍 Testing Supabase connection...');
  
  // Test 1: List all buckets
  console.log('\n📋 Listing all buckets:');
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  
  if (listError) {
    console.error('❌ Error listing buckets:', listError);
  } else {
    console.log('✅ Available buckets:', buckets.map(b => `${b.name} (${b.public ? 'public' : 'private'})`));
  }
  
  // Test 2: Check specific bucket
  if (buckets && buckets.length > 0) {
    const campusconnectBucket = buckets.find(b => b.name === 'campusconnect');
    if (campusconnectBucket) {
      console.log('\n✅ Found campusconnect bucket:', campusconnectBucket);
      
      // Test 3: List files in the bucket
      console.log('\n📁 Listing files in campusconnect bucket:');
      const { data: files, error: filesError } = await supabase.storage
        .from('campusconnect')
        .list('', { limit: 10 });
        
      if (filesError) {
        console.error('❌ Error listing files:', filesError);
      } else {
        console.log('📄 Files/folders:', files.map(f => `${f.name} (${f.metadata ? 'file' : 'folder'})`));
      }
    } else {
      console.log('\n❌ campusconnect bucket not found');
    }
  }
}

testConnection().catch(console.error);
