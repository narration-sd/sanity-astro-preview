import type { CSSProperties } from 'react'
import { createClient } from '@sanity/client'
import { useEffect, useState } from 'react'
import { LiveQueryProvider, useLiveQuery } from '@sanity/preview-kit'
import { eAtomData } from '../store/atomData.ts'

function SharerChild (props) {
  const { preAuthor:initialData, query } = props
  const [previewData, loading]
    = useLiveQuery(initialData, query, {})
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
    return ( /* (loading is taken care of via the msg) */
    <>
      <h2>Preview Data from Sanity Content Lake {msg}</h2>
      <p>{ previewData ? JSON.stringify(previewData) : ' no previewData yet' }</p>
    </>
  )
}
function OperateQuery (props) {
  const { query, client, token, initialData } = props

  const children =
    <SharerChild
      preAuthor={initialData}
      query={query}
    />

  return (
    <LiveQueryProvider
      client={client}
      token={token}
      logger={console}> // this last is for preview-kit's use
      {children}
    </LiveQueryProvider>
  )
}

export function PreviewSubscription (props) {

  const {
    query, clientConfig, previewDrafts = true,
    show = false } = props // *todo* true previewDrafts?

  if (!clientConfig || !clientConfig.token) {
    const msg = 'You need to provide a clientConfig, ' +
      'including a token able to read Drafts...'
    console.log(msg)
    throw new Error (msg)
  }

  const [ initialData, setInitialData ] = useState(null);

  // *todo* revert this to api provider, so LiveWuery points get
  // *todo* included -- possibly driven also from this component's props
  const client = createClient(clientConfig)

  useEffect (() => {
    let ignore = false; // this is the React anti-race trick...

    const getData = async () => {
      await client.fetch(query)
        .then((json) => {
          if (!ignore) {
            setInitialData(json)
          }
        })
        .catch (err => {
          throw new Error ('getData query: ' + query + ' not found: ' + err)
        })
    }

    getData()
    return () => {
      ignore = true;
    };
  }, []);

  const showStyle:CSSProperties = show
    ? { visibility: 'visible' }
    : { visibility: 'hidden', height: 0, width: 0 }

  return (
    <div style={showStyle}>
      <h2>This is a PreviewSubscription on {JSON.stringify(eAtomData)}</h2>
      <p>query is: {query}</p>
      <p>previewDrafts is: {previewDrafts ? 'true' : 'false'}</p>
      <p>initialData was: {JSON.stringify(initialData)}</p>

      <OperateQuery
        query={query}
        client={client}
        token={clientConfig.token}
        previewDrafts={previewDrafts}
        initialData={initialData}
      />
    </div>
  )
}