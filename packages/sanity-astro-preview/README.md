# sanity-astro-preview

## Introduction

Just bullet points at moment...tbd

- in React, but works with any Astro-capable framework -- Vue, Svelte, Solid, etc..

- connectivity all arranged internally, requiring 1 code line in a using application page to get the preview data

- preview package wire size: ~58 KB 

- the subscription component props are likely self-evident, but will be doc'd here

## Usage

### PreviewSubscription component 

Put this on your previewing Astro page.astro

It won't show or take up layout space unless a `show` prop would be added.

Then follow it with your viewing component, which must be written in a framework, not in Astro, as both it and the subscription must run on the client.

You can see how this works, using the required `client:only="framework"`, in this source example taken from the demo.

```typescript jsx, js
---
import Layout from '../layouts/Layout.astro'
import { PreviewSubscription } from '@narration-sd/sanity-astro-preview'
import { AuthorView as AuthorViewReact } from '../components/react/AuthorView'

const authorQuery = `*[_type == "author"][0]{ ... }`

const clientConfig = {
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  token: import.meta.env.PUBLIC_SANITY_VIEWER_TOKEN,
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION,
  useCdn: (process.env.NODE_ENV === 'production'),
}

if (!clientConfig.projectId) {
  throw new Error ('clientConfig no projectId -- .env file missing?')
}

const aString = 'a string for your thoughts'
const projectId = clientConfig.projectId
---
  <Layout>
    <h2>Dynamic React Duo Demo</h2>

    <PreviewSubscription
      query={authorQuery}
      clientConfig={clientConfig}
      token={clientConfig.token}
      client:only="react"
    />
    <AuthorViewReact client:only="react"/>
  </Layout>
```

### Your viewing component

This can be any component in an Astro-compatible framework that you prefer, so long as you configure it to run only in the client.

(An Astro `.astro` component can't operate for live previews because it can execute only on the server, so this means frameworks like Vue, React, Svelte, etc..)

In your framework component, which is probably a variant or a props-switchable of the one you use for the page in your production app, you'll bring the preview data in by quite simple means.

#### Obtaining the Live Preview data

You'll include an import line for the communicating Nanostores atom, and one more for their library function to interpret it properly for your app framework. 

Then you'll get the resolved and reactive data by calling the function on it.

In React, it looks like this:

```typescript jsx
import {eAtomData} from '@narration-sd/sanity-astro-preview'
import {useStore} from '@nanostores/react'

// at your point of use to display reactively
const atomAuth:any = useStore(eAtomData)
```

This is just a model, and you can handle TypeScript types in any way you may prefer.

#### Viewing component considerations

A few things to keep in mind for the page and your component in it:

- be sure your clientConfig includes the token necessary to be able to view previews

- provide your query as a string with all portions filled in -- if you are using params, do this via template literals substitution. Only you know values for them, in your code.... 

- note that the subscription component isn't going to show anything or take up layout space, unless you also provide a prop `show`, in which case it will show you some debug information

- You'll provide your own AuthorView.jsx, etc. to format the appropriate preview for the schema. 

- Your View presenter must be in a framework, not Astro (.astro), as it will be rendered on the client, but you can use any of those supported by Astro, as it's on its own island.

#### Example React source

- In React, your View might look something like this (which uses utilities from the demo):

```typescript jsx
// be sure not to forget this -- it's your data connection!
import {eAtomData} from '@narration-sd/sanity-astro-preview'
import {useStore} from '@nanostores/react'

import {getSanityImageURL, formatBlogPostDate} from '../../utils/helpers'
import SanityPortableText from './SanityPortableText.tsx'
import './author.css' // *todo a rather temporary measure...

export const AuthorView = (props: any) => {
  const pageData:any = useStore(eAtomData)

  const imageUrl = (theAuthor: any) => {
    const url = theAuthor.image
      ? getSanityImageURL(theAuthor.image).width(360).url()
      : ''
    return url
  }
  return (
    <div>
      {
        typeof pageData._originalId !== 'undefined' &&
        <div>
          <article className="theAuthor-preview__article">
            <h2>Author Live (React)</h2>
            <div className="theAuthor-block">
              <div className="theAuthor-row">
                <img className="theAuthor-main__img" loading="lazy"
                     src={imageUrl(pageData)}/>
                <h3>{pageData.name}</h3>
              </div>
            </div>
            <div>
              <div>
                <a href="{`/theAuthor/{pageData.slug.current}`}">
                  {((pageData?._originalId).indexOf('drafts.') >= 0)
                    ? 'Draft: ' : 'Published: '}
                </a>
                <time className="publish-date">
                  {formatBlogPostDate(pageData._updatedAt)}
                </time>
              </div>
              <div>
                <h2>Bio</h2>
                <div className="bio">
                  <SanityPortableText value={pageData.bio}/>
                </div>
              </div>
              <div>
                <h3> Contacts</h3>
                <div>
                  {
                    pageData.contacts.map((contact: string, index: number) => {
                      return <p key={index} className="contact">{contact}</p>
                    })
                  }
                </div>
              </div>
            </div>
          </article>
        </div>
      }
    </div>
  )
}
```