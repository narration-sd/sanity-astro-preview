import { useEffect, useState, createContext, useContext } from 'react'
import type { CSSProperties } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { createClient, type QueryParams, type ClientConfig } from '@sanity/client'
import { LiveQueryProvider, useLiveQuery } from '@sanity/preview-kit'

import { ePreviewData, type PreviewType } from '../store/atomData.ts'

export type PreviewKitConfig = {
  isLive?:boolean,
  perspective?:string,
  staticServer?:boolean,
  studioBasePath?:string,
}

type InitData = {
  clientConfig: object,
  initialData: object,
  params: QueryParams,
  kitConfig:object,
  query: string
}
const InitContext = createContext<InitData>({} as InitData)

const ErrorFallback = (props) => {
  const { error } = props
  return (
    <>
      <h1>Unexpected Error</h1>
      <h3>error: {error.message}</h3>
    </>
  )
}

const SharerChild = (/*props*/) => {
  const {
    initialData = {},
    query= '',
    params= {}
  } = useContext(InitContext)

  const [previewData, loading]
    = useLiveQuery(initialData, query, params)
  const msg = loading ? 'loading...' : 'updated'

  if (previewData) {
    
    const completePreview:PreviewType = {
      previewData: previewData,
      loading: loading
    }
    
    // here's the entire plot point...
    ePreviewData.set(completePreview)
  }

  return ( /* (loading notification is taken care of via the msg) */
    <>
      {
        previewData
          ? <>
              <h2>Preview Data from Sanity Content Lake ({msg})</h2>
              <p>{ JSON.stringify(previewData) }</p>
            </>
          : <>
              <h2>No Live Preview Data was returned...({msg})</h2>
              <h3>Query error is likely, on query: {query},
                params: {JSON.stringify(params)},
                or try 'show' prop on PreviewSubscription
              </h3>
            </>
      }
    </>
  )
}

const OperateQuery = (props) => {
  const { /*query, params,*/  client, token, /*initialData*/ } = props

  const children =
    <SharerChild />

  return (
    <LiveQueryProvider  // *todo* revisit about extra token prop...
      client={client}
      token={token}
      logger={console}
    >
      {children}
    </LiveQueryProvider>
  )
}

// this prepares us for any options that may arrive, checkign and assempling
const assembleFetchOptions = (
  kitConfig:PreviewKitConfig,
  clientConfig:ClientConfig,
):object => {

  if (Object.keys(clientConfig).length === 0 ||
    (kitConfig.perspective === 'previewDrafts' && !clientConfig.token)) {

    const msg = 'You need to provide a clientConfig, ' +
      'including a Viewer token if you want to preview Drafts...'
    throw new Error(msg)
  }

  // expandable on this if further preview-kit abilities need so
  const  fullFetchOptions =
    Object.assign({},
    kitConfig.perspective === 'previewDrafts'
      ? {
        perspective: kitConfig.perspective,
        token:clientConfig.token,
      }
      : {})
  return fullFetchOptions;
}

export type SubscriptionProps = {
  query:string,
  params:QueryParams,
  clientConfig: {
    projectId: string,
    dataset: string,
    token:string,
    apiVersion: string,
    useCdn: boolean,
  },
  kitConfig: PreviewKitConfig,
  show:boolean
}

export const PreviewSubscription = (props:SubscriptionProps) => {

  const {
    query= '',
    params = {},
    clientConfig = { projectId: null, token: null},
    kitConfig = {
      perspective: 'previewDrafts',
    },
    show = false
  } = props

  if (!clientConfig?.projectId) {
    throw new Error ('clientConfig no projectId -- is config or .env file missing?')
  }

  const [ initialData, setInitialData ] = useState(null);
  const [ queryError, setQueryError ] = useState(null);

  const client = createClient(clientConfig)
  const fetchOptions = assembleFetchOptions(kitConfig, clientConfig)

  /*
   We accomplish two things with this initial direct data access:
   - the current live data, if any, for preview-kit's use and our show prop
   - validation that there isn't something the matter with the query, as
     preview-kit doesn't seem to present errors, just null results
   */
  useEffect (() => {
    let ignore = false; // this is the React anti-race trick...

    const getData = async () => {
       await client.fetch(query, params, fetchOptions)
        .then((json) => {
          if (!ignore) {
            if (!json) {
              throw new Error('No Data')
            }
            setInitialData(json)
          }
        })
        .catch (err => {
          const msg = 'getData query: ' + query +
            ', params: ' + JSON.stringify(params) +
            ' not found: ' + err
          setQueryError(msg)
          throw new Error (msg)
        })
    }

    getData() // *todo* revisit here
    return () => {
      ignore = true;
    };
  }, []);

  const showStyle:CSSProperties = (show || queryError !== null)
    ? { visibility: 'visible' }
    : { visibility: 'hidden', height: 0, width: 0 }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <InitContext.Provider value={{
        initialData, query, params, clientConfig, kitConfig,
      }}>
        <div>
          {
            queryError
              ? <h3>Query Error: {queryError}</h3>
              : <div style={showStyle}>
                <h2>This is a PreviewSubscription on {JSON.stringify(ePreviewData)}</h2>
                <h3>
                  query is: {query},
                  params are: {JSON.stringify(params)},
                  perspective is: {kitConfig.perspective},
                  initialData was:
                </h3>
                <p>{JSON.stringify(initialData)}</p>

                <OperateQuery
                  client={client}
                  token={clientConfig.token}
                />
              </div>
          }
        </div>
      </InitContext.Provider>
    </ErrorBoundary>
  )
}