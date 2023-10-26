// be sure not to forget this -- it's your data connection!
import {eAtomData} from '@narration-sd/sanity-astro-preview'

import {useStore} from '@nanostores/react'
import {getSanityImageURL, formatBlogPostDate} from '../../utils/helpers'
import SanityPortableText from './SanityPortableText.tsx'
import './author.css' // *todo a rather temporary measure...

export default function AuthorView(props: any) {
  const atomAuth: any = useStore(eAtomData)

  const imageUrl = (theAuthor: any) => {
    const url = theAuthor.image
      ? getSanityImageURL(theAuthor.image).width(360).url()
      : ''
    return url
  }
  return (
    <div>
      {
        typeof atomAuth._originalId !== 'undefined' &&
        <div>
          <article className="theAuthor-preview__article">
            <h2>Author Live (React)</h2>
            <div className="theAuthor-block">
              <div className="theAuthor-row">
                <img className="theAuthor-main__img" loading="lazy"
                     src={imageUrl(atomAuth)}/>
                <h3>{atomAuth.name}</h3>
              </div>
            </div>
            <div>
              <div>
                <a href="{`/theAuthor/{atomAuth.slug.current}`}">
                  {((atomAuth?._originalId).indexOf('drafts.') >= 0)
                    ? 'Draft: ' : 'Published: '}
                </a>
                <time className="publish-date">
                  {formatBlogPostDate(atomAuth._updatedAt)}
                </time>
              </div>
              <div>
                <h2>Bio</h2>
                <div className="bio">
                  <SanityPortableText value={atomAuth.bio}/>
                </div>
              </div>
              <div>
                <h3> Contacts</h3>
                <div>
                  {
                    atomAuth.contacts.map((contact: string, index: number) => {
                      return <p key={index} className="contact">{contact}</p>
                    })
                  }
                </div>
              </div>
            </div>
          </article>

          {/* *todo* ditto, do we want to show/not show any of this,*/}
          {/* *todo*as with the Subscription?*/}
          {/*<h2>This is an Author View in React, {val}</h2>*/}
          {/*<h3>Here's the live data: { atomAuth.name }</h3>*/}
          {/*<h3>AtomAuth: { JSON.stringify(atomAuth ) }</h3>*/}
        </div>
      }
    </div>
  )
}