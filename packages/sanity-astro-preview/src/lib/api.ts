import { createClient } from '@sanity/client'
import type { QueryParams } from '@sanity/client'

// *todo now that we know how to use it, see about bringing back in. For features, and cleanere
// const clientConfig = {
//   projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
//   dataset: import.meta.env.PUBLIC_SANITY_DATASET,
//   token: import.meta.env.PUBLIC_SANITY_EDITOR_TOKEN, // actually only viewer req'd for preview...
//   apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION,
//   useCdn: false, // (process.env.NODE_ENV === 'production'), // *todo* for local dev
// }
//
// if (!clientConfig.projectId) {
//   throw new Error ('main no projectId')
// }

let client = null
export const setupClient = (clientConfig) => {
  if (!client) { // people stutter....
    client = createClient (clientConfig)
    console.log ('CLIENT set up')
  }
  return client
}

const checkClient = () => {
  if (!client) {
    throw new Error ("Sanity client not set on PreviewSubscription...")
  }
}
// Shared on the server and the browser
// export const client = createClient(clientConfig)

// Only defined on the server, passed to the browser via a `loader`
// export const token =
//   typeof process === 'undefined' ? '' : process.env.PUBLIC_SANITY_API_READ_TOKEN!
// const token = import.meta.env.PUBLIC_SANITY_VIEWER_TOKEN


const DEFAULT_PARAMS = {} as QueryParams
// type QueryResponse = {
//   author:object
// }
export type SanityFetchArgs = {
  previewDrafts?: boolean // *todo* fix this nonsense as a type, exported to use
  query: string
  params?: QueryParams
  token:string
}
// Utility for fetching data on the server, that can toggle between published and preview drafts
export async function
  sanityFetch<QueryResponse>({
                               query,
                               previewDrafts,
                               params = DEFAULT_PARAMS,
                               token
                             }: SanityFetchArgs): Promise<QueryResponse> {
  checkClient()
  if (previewDrafts && !token) {
    throw new Error(
      'The `PUBLIC_SANITY_VIEWER_TOKEN environment variable is required.',
    )
  }
  return client.fetch/*<QueryResponse>*/( // *todo* type QueryResponse
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


export const initialData = (args) => {
  const { query, previewDrafts, params = {}, token } = args
  checkClient()

  return sanityFetch<any>({
    previewDrafts,
    query: query,
    params: params,
    token
  })
}