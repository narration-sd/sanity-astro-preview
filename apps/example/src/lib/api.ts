import { createClient } from '@sanity/client'
import type { QueryParams } from '@sanity/client'

const clientConfig = {
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  token: import.meta.env.PUBLIC_SANITY_EDITOR_TOKEN, // actually only viewer req'd for preview...
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION,
  useCdn: false, // (process.env.NODE_ENV === 'production'), // *todo* for local dev
}

if (!clientConfig.projectId) {
  throw new Error ('clientConfig no projectId -- .env file missing?')
}

// Shared on the server and the browser
export const client = createClient(clientConfig)

// Only defined on the server, passed to the browser via a `loader`
// export const token =
//   typeof process === 'undefined' ? '' : process.env.PUBLIC_SANITY_API_READ_TOKEN!
export const token = import.meta.env.PUBLIC_SANITY_VIEWER_TOKEN

const DEFAULT_PARAMS = {} as QueryParams

// Utility for fetching data on the server, that can toggle between published and preview drafts
export async function sanityFetch<QueryResponse>({
                                                   previewDrafts,
                                                   query,
                                                   params = DEFAULT_PARAMS,
                                                 }: {
  previewDrafts?: boolean
  query: string
  params?: QueryParams
}): Promise<QueryResponse> {
  if (previewDrafts && !token) {
    throw new Error(
      'The `PUBLIC_SANITY_VIEWER_TOKEN environment variable is required.',
    )
  }
  return client.fetch<QueryResponse>(
    query,
    params,
    previewDrafts
      ? {
        token,
        perspective: 'previewDrafts',
      }
      : {},
  )
}
