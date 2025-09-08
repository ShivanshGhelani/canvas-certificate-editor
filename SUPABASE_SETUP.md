# Supabase Background Templates Setup

This guide explains how to set up Supabase storage as a CDN for background templates.

## Prerequisites

1. Supabase project created
2. Environment variables set in `.env`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## Storage Structure

The backgrounds are organized in Supabase storage as follows:

```
campusconnect/               # Bucket name
├── backgrounds/
│   ├── landscape/          # Landscape orientation templates
│   │   ├── template1.png
│   │   ├── template2.png
│   │   └── ...
│   └── portrait/           # Portrait orientation templates
│       ├── template1.png
│       ├── template2.png
│       └── ...
```

## Setup Instructions

### 1. Create Storage Bucket

In your Supabase dashboard:

1. Go to Storage
2. Create a new bucket named `campusconnect`
3. Make it **public** for CDN access
4. Create folders: `backgrounds/landscape/` and `backgrounds/portrait/`

### 2. Upload Existing Backgrounds

Run the upload script to transfer your current background files:

```bash
npm run upload-backgrounds
```

This script will:
- Create the bucket if it doesn't exist
- Upload all landscape templates to `backgrounds/landscape/`
- Upload all portrait templates to `backgrounds/portrait/`
- Show progress and success/failure counts

### 3. Verify Setup

After upload, your templates will be available at:
```
https://gygschntnaivagnbwmgw.supabase.co/storage/v1/object/public/campusconnect/backgrounds/landscape/filename.png
https://gygschntnaivagnbwmgw.supabase.co/storage/v1/object/public/campusconnect/backgrounds/portrait/filename.png
```

## Features

- **Dynamic Loading**: Templates are loaded from Supabase on app startup
- **Auto-categorization**: Landscape and portrait templates auto-switch canvas dimensions
- **Loading States**: UI shows loading spinner while fetching templates
- **Error Handling**: Graceful fallback if templates fail to load
- **CDN Performance**: Fast loading via Supabase's global CDN

## Adding New Templates

To add new templates:

1. **Via Supabase Dashboard**: Upload directly to the appropriate folder
2. **Via Upload Script**: Add filenames to the script and re-run
3. **Via App**: Use the "Upload Custom Background" button in the modal

Templates will appear automatically in the app after upload.

## File Formats Supported

- PNG
- JPG/JPEG
- Recommended: PNG for transparency support

## Troubleshooting

1. **Templates not loading**: Check console for error messages
2. **Upload fails**: Verify Supabase credentials and bucket permissions
3. **Images not displaying**: Check file paths and public access settings
