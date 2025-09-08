import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://gygschntnaivagnbwmgw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5Z3NjaG50bmFpdmFnbmJ3bWd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0MDQ2MTMsImV4cCI6MjA2NTk4MDYxM30.UKLTge4DV5MT-MahETeN6WUwJdN8O4vBiACv1mZUCLQ';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testDirectAccess() {
  console.log('🔍 Testing direct bucket access...');
  
  // Test direct access to campusconnect bucket
  console.log('\n📁 Trying to list files in campusconnect bucket directly:');
  const { data: files, error: filesError } = await supabase.storage
    .from('campusconnect')
    .list('', { limit: 10 });
    
  if (filesError) {
    console.error('❌ Error accessing campusconnect bucket:', filesError);
  } else {
    console.log('✅ Successfully accessed campusconnect bucket!');
    console.log('📄 Files/folders:', files.map(f => `${f.name} (${f.metadata ? 'file' : 'folder'})`));
  }
  
  // Test creating a folder by uploading a .keep file
  console.log('\n📁 Testing folder creation (backgrounds/landscape/):');
  const dummyContent = new Uint8Array([]);
  
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('campusconnect')
    .upload('backgrounds/landscape/.keep', dummyContent, { 
      upsert: true,
      contentType: 'text/plain'
    });
    
  if (uploadError) {
    console.error('❌ Error creating folder:', uploadError);
  } else {
    console.log('✅ Successfully created backgrounds/landscape/ folder!');
  }
  
  // Test creating portrait folder
  console.log('\n📁 Testing folder creation (backgrounds/portrait/):');
  const { data: uploadData2, error: uploadError2 } = await supabase.storage
    .from('campusconnect')
    .upload('backgrounds/portrait/.keep', dummyContent, { 
      upsert: true,
      contentType: 'text/plain'
    });
    
  if (uploadError2) {
    console.error('❌ Error creating folder:', uploadError2);
  } else {
    console.log('✅ Successfully created backgrounds/portrait/ folder!');
  }
}

testDirectAccess().catch(console.error);
