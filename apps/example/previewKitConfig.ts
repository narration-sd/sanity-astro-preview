import { type ClientConfig } from '@sanity/client'
import { type PreviewKitConfig } from '@narration-sd/sanity-astro-preview'

// n.b. you could move these into your astro.config and import
// from there in your app, if preferred

export const clientConfig:ClientConfig = {
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  token: import.meta.env.PUBLIC_SANITY_VIEWER_TOKEN,
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION,
  useCdn: (process.env.NODE_ENV === 'production'),
}

export const kitConfig:PreviewKitConfig = {
  staticServer:import.meta.env.PUBLIC_SANITY_STATIC_SERVER === 'true',
  perspective: 'previewDrafts',
}