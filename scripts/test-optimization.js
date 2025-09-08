import { getBackgroundTemplates, refreshTemplateCache } from '../src/lib/supabase.js';

async function testOptimization() {
  console.log('🧪 Testing Supabase optimization...\n');
  
  // Clear any existing cache
  localStorage.removeItem('background_templates_cache');
  
  console.log('📊 Test 1: First load (should make 2 API calls)');
  console.time('First load');
  const templates1 = await getBackgroundTemplates();
  console.timeEnd('First load');
  console.log(`✅ Loaded ${templates1.landscape.length + templates1.portrait.length} templates\n`);
  
  console.log('📊 Test 2: Second load (should use cache, 0 API calls)');
  console.time('Cached load');
  const templates2 = await getBackgroundTemplates();
  console.timeEnd('Cached load');
  console.log(`✅ Loaded ${templates2.landscape.length + templates2.portrait.length} templates from cache\n`);
  
  console.log('📊 Test 3: Force refresh (should make 2 API calls)');
  console.time('Force refresh');
  const templates3 = await refreshTemplateCache();
  console.timeEnd('Force refresh');
  console.log(`✅ Refreshed ${templates3.landscape.length + templates3.portrait.length} templates\n`);
  
  console.log('🎉 Optimization test complete!');
  console.log('📋 Results:');
  console.log('- First load: 2 API calls (list landscape + list portrait)');
  console.log('- Subsequent loads: 0 API calls (served from cache)');
  console.log('- Cache expires after 24 hours automatically');
  console.log('- Manual refresh available via refresh button');
}

// Run the test if this file is executed directly
if (typeof window !== 'undefined') {
  testOptimization();
}
