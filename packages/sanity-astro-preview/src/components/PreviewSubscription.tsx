import { useEffect, useState, type CSSProperties } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { createClient } from '@sanity/client'
import { LiveQueryProvider, useLiveQuery } from '@sanity/preview-kit'

import { eAtomData } from '../store/atomData.ts'

const ErrorFallback = (props) => {
  const { error } = props
  // console.log('ErrorBoundary called, props: ' + JSON.stringify(error))
  // const err = JSON.stringify(error)
  return (
    <>
      <h1>Unexpected Error</h1>
      <h3>error: {error.message}</h3>
    </>
  )
}

const SharerChild = (props) => {
  const { preAuthor:initialData, query, params } = props
  const [previewData, loading]
    = useLiveQuery(initialData, query, params)
  const msg = loading ? 'loading...' : 'updated'

  if (previewData) {
    
    // let's add in the loading flag, if useful
    const previewDataWithLoading =
      Object.assign(previewData, {
        loading: loading
      })

    // here's the whole plot point...
    // console.log('plot point, set previewData...'
    eAtomData.set(previewDataWithLoading)
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
                params: {JSON.stringify(params)}</h3>
            </>
      }
    </>
  )
}

const OperateQuery = (props) => {
  const { query, params,  client, token, initialData } = props

  const children =
    <SharerChild
      preAuthor={initialData}
      query={query}
      params={params}
    />

  return (
    <LiveQueryProvider
      client={client}
      token={token}
      logger={console}
    >
      {children}
    </LiveQueryProvider>
  )
}

export const PreviewSubscription = (props) => {

  const {
    query, params = {}, clientConfig, previewDrafts = true,
    show = false } = props // *todo* true previewDrafts?

  if (!clientConfig || !clientConfig.token) {
    const msg = 'You need to provide a clientConfig, ' +
      'including a token able to read Drafts...'
    console.log(msg)
    throw new Error (msg)
  }

  const [ initialData, setInitialData ] = useState(null);
  const [ queryError, setQueryError ] = useState(null);

  // *todo* revert this to api provider, so LiveQuery points get
  // *todo* included -- possibly driven also from this component's props
  const client = createClient(clientConfig)

  useEffect (() => {
    let ignore = false; // this is the React anti-race trick...

    const getData = async () => {
      await client.fetch(query, params)
        .then((json) => {
          if (!ignore) {
            if (!json) {
              throw new Error('No Data Returned')
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

    getData()
    return () => {
      ignore = true;
    };
  }, []);

  const showStyle:CSSProperties = (show || queryError !== null)
    ? { visibility: 'visible' }
    : { visibility: 'hidden', height: 0, width: 0 }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div>
        {
          queryError
            ? <h3>Query Error: {queryError}</h3>
            : <div style={showStyle}>
              <h2>This is a PreviewSubscription on {JSON.stringify(eAtomData.value)}</h2>
              <h3>
                query is: {query},
                params are: {JSON.stringify(params)},
                previewDrafts is: {previewDrafts ? 'true' : 'false'},
                initialData was:
              </h3>
              <p>{JSON.stringify(initialData)}</p>

              <OperateQuery
                query={query}
                params={params}
                client={client}
                token={clientConfig.token}
                previewDrafts={previewDrafts}
                initialData={initialData}
              />
            </div>
        }
      </div>
    </ErrorBoundary>
  )
}