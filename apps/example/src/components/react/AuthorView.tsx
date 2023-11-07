// be sure not to forget this -- it's your data connection!
import {ePreviewData, type PreviewType} from '@narration-sd/sanity-astro-preview'
import {useStore} from '@nanostores/react'

import {getSanityImageURL, formatBlogPostDate} from '../../utils/helpers'
import SanityPortableText from './SanityPortableText.tsx'
import './author.css' // *todo a rather temporary measure...

export const AuthorView = (props: any) => {
  const {
    previewData:pageData,
    loading
  } = useStore(ePreviewData) as PreviewType

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