## Introduction to `sanity-astro-preview`

This is package to provide Sanity's primary Live Preview package, `previww-kit`, transparently and simply in Astro projects.

There's a [Guides, Reference, and Faqs site](https://encounsel.com/docs) which will probably be most helpful in using it.

Here are some features:

- Should work to provide Live Previews for all component frameworks Astro and Nano Stores mutually support. At present this means React, VueJS, Svelte, Solid, Preact, Lit, and Angular (via the `@analogjs/astro-angular` integration)

- It's been tested so far on React and VueJs, and you can see some early demo code (soon improved) for those in the [GitHub Site](https://github.com/narration-sd/sanity-astro-preview) `apps/example` folder.

- The package size is small (11kB), and applying it to your code to gain Live Previews needs only a few simple lines.

- As in the examples, you'll simply add a visually silent `<PreviewSubscription />` component to your page to gain the preview data.

- there's comprehensive error-handling, along with a `show` ability to put debug information on screen, when that could help out with your development

### What's needed for Astro Live Previews

There are many advantages Astro makes possible, not the least of which is writing much of your site in it's own simple `.astro` format.

Live Previews will fit right in, but however you arrange this, including this package, you're going to need framework components which can run on the browser client, to successfully display them.

The [docs site](https://encounsel.com/docs) will lead you through understandings about this, and lays out a sensible procedure for building up those abilities where your Astro pages need them, an easy step at a time. 

The `/apps/example` code illustrates a simple conversion, and soon there will be a model there also of the time-saving 'components-in-components' way it adds, for efficiently doing this.

The rest of this Readme shows early patterns, and will be updated, but your best and most recent information will be found on the [docs site](https://encounsel.com/docs). 

## Usage

### The PreviewSubscription component

Put this on your previewing Astro page.astro

It won't show or take up layout space unless a `show` prop would be added.

Then follow it with your viewing component, which must be written in a framework, not in Astro, as both it and the subscription must run on the client.

You can see how this works, using the required `client:only="framework"`, in this source example taken from the demo.
### Astro Page Example
```typescript jsx, astro
---
import Layout from '../layouts/Layout.astro'
import { PreviewSubscription } from '@narration-sd/sanity-astro-preview'
import { AuthorView as AuthorViewReact } from '../components/react/AuthorView'

const query = `*[_type == $type ][0]{ ... }`
const params = { type: 'author'}
const token = import.meta.env.PUBLIC_SANITY_VIEWER_TOKEN

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
    <h2>Dynamic React Demo</h2>

    <!-- you can add a 'show' prop, to get on-page debugging -->
    <PreviewSubscription
        query={query}
        params={params}
        clientConfig={clientConfig}
        token={clientConfig.token}
        client:only="react" 
     />
          
     <AuthorViewReact client:only="react"/>
  </Layout>
```

### Extra help possible

Along the way, you might find it useful to temporarily add the extra `show` prop on the `PreviewSubscription` -- it can put a lot of information as to what's happening on screen.

This monitoring text will appear above your own output, so you'll remove it as you complete, making the subscription silent on the page again.

## Your Viewing component

This can be any component in an Astro-compatible framework that you prefer, so long as you configure it to run only in the client.

(An Astro `.astro` component can't operate for live previews because it can execute only on the server, so this means frameworks like Vue, React, Svelte, etc..)

In your framework component, which is probably a variant or a props-switchable of the one you use for the page in your production app, you'll bring the preview data in by quite simple means.

#### Obtaining the Live Preview data

You'll include an import line for the communicating Nanostores atom, and one more for their library function to interpret it properly for your app framework.

Then you'll get the resolved and reactive data by calling the function on it.

### What Frameworks can you use?

Actually, it's up to you, out of the set which Astro and Nano Stores mutually support.

These include React, Vue, Svelte, Solid, Lit, and it looks like also Angular, given you use the intermediate package needed for Astro.

### What are some guidelines?

- The primary requirement is that your View which shows Live Previews must be in one of the frameworks listed -- because they can run in the client.

    - You need the client-only operation so that the Live Preview data can instantly refresh what the browser shows -- and without causing it to jump to the beginning of the page, as a reload would do.
    - Astro pages or components can't provide this, as they interpret only on the server, including generation from its upper portion JavaScript, where your data-obtaining code would be.
- If you already have an Astro page for the View, this can actually be a big help.
    - You can convert each data area at a time, building up your framework-based page
    - If things get complicated in an area, that's where you might like to structure that into a further component, including that in the overall Viewing component.

In the end, and especially if you begin with single data element like perhaps the Title, conversion should not be difficult.

Let's look at an example, where there's just a single component, yet covering titles, date-time, image, an ordered list, and a full formatted Portable Text field.

### Viewing Code Example

In React, it looks like this:

```typescript jsx
// be sure not to forget this -- it's your data connection!
import {ePreviewData} from '@narration-sd/sanity-astro-preview'
import {useStore} from '@nanostores/react'

import {getSanityImageURL, formatBlogPostDate} from '../../utils/helpers'
import SanityPortableText from './SanityPortableText.tsx'
import './author.css' // *todo a rather temporary measure...

export const AuthorView = (props: any) => {
  const pageData: any = useStore(ePreviewData)

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
import {ePreviewData} from '@narration-sd/sanity-astro-preview'
import {useStore} from '@nanostores/react'

import {getSanityImageURL, formatBlogPostDate} from '../../utils/helpers'
import SanityPortableText from './SanityPortableText.tsx'
import './author.css' // *todo a rather temporary measure...

export const AuthorView = (props: any) => {
  const pageData:any = useStore(ePreviewData)

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