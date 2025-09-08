import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Storage bucket configuration
export const STORAGE_BUCKET = 'campusconnect';

// Helper function to get public URL for a file (static generation, no API call)
export const getPublicUrl = (filePath) => {
  return `${supabaseUrl}/storage/v1/object/public/${STORAGE_BUCKET}/${filePath}`;
};

// Helper function to upload file
export const uploadFile = async (filePath, file) => {
  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    });
  
  if (error) {
    console.error('Upload error:', error);
    throw error;
  }
  
  return data;
};

// Helper function to list files in a folder
export const listFiles = async (folderPath) => {
  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .list(folderPath);
  
  if (error) {
    console.error('List files error:', error);
    throw error;
  }
  
  return data;
};

// Background template URLs using Supabase CDN
export const getBackgroundTemplateUrl = (category, filename) => {
  return getPublicUrl(`backgrounds/${category}/${filename}`);
};

// Cache configuration
const CACHE_KEY = 'background_templates_cache';
const CACHE_EXPIRY_HOURS = 24; // Cache for 24 hours

// Helper function to check cache validity
const isCacheValid = (cacheData) => {
  if (!cacheData || !cacheData.timestamp) return false;
  const hoursSinceCache = (Date.now() - cacheData.timestamp) / (1000 * 60 * 60);
  return hoursSinceCache < CACHE_EXPIRY_HOURS;
};

// Optimized function to get all background templates with caching
export const getBackgroundTemplates = async () => {
  try {
    // Check cache first
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const parsed = JSON.parse(cachedData);
      if (isCacheValid(parsed)) {
        console.log('📋 Using cached background templates');
        return parsed.templates;
      }
    }

    console.log('🔄 Fetching fresh background templates from Supabase...');
    
    // Fetch file lists in parallel (only 2 API calls total)
    const [landscapeFiles, portraitFiles] = await Promise.all([
      listFiles('backgrounds/landscape'),
      listFiles('backgrounds/portrait')
    ]);
    
    // Generate URLs statically (no additional API calls)
    const templates = {
      landscape: landscapeFiles
        .filter(file => file.name.endsWith('.png') || file.name.endsWith('.jpg') || file.name.endsWith('.jpeg'))
        .map(file => getBackgroundTemplateUrl('landscape', file.name)),
      
      portrait: portraitFiles
        .filter(file => file.name.endsWith('.png') || file.name.endsWith('.jpg') || file.name.endsWith('.jpeg'))
        .map(file => getBackgroundTemplateUrl('portrait', file.name))
    };
    
    // Cache the results
    const cacheData = {
      templates,
      timestamp: Date.now()
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    
    console.log(`✅ Fetched and cached ${templates.landscape.length + templates.portrait.length} templates`);
    return templates;
  } catch (error) {
    console.error('Error fetching background templates:', error);
    
    // Try to use expired cache as fallback
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const parsed = JSON.parse(cachedData);
      console.log('⚠️ Using expired cache as fallback');
      return parsed.templates;
    }
    
    // Final fallback to empty arrays
    return {
      landscape: [],
      portrait: []
    };
  }
};

// Function to manually refresh template cache
export const refreshTemplateCache = async () => {
  localStorage.removeItem(CACHE_KEY);
  return await getBackgroundTemplates();
};
