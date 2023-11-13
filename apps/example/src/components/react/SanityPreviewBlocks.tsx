import SanityPortableText from './SanityPortableText'
import {useStore} from "@nanostores/react";
import {formatBlogPostDate, imageUrl} from "../../utils/helpers"

import {ePreviewData} from "@narration-sd/sanity-astro-preview";

const fromPage = (live: boolean, dataField: string, pageData:object) => {
  const storeData = useStore(ePreviewData)
  const content = live
    ? storeData?.previewData[dataField]
    : pageData[dataField]
  return content
}

export type PageTitleType = {
  title: string,
  note?:string,
  live?: boolean,
  style?: object,
  msg?: string,
  msgStyle?:object
}

export const PageTitle = (props:PageTitleType) => {

  const { title, note = '', style = {},
    msg = '(connecting...)', msgStyle = {},
    live } = props
  const loading = useStore(ePreviewData).loading
  const liveLabel = (live && loading) ? msg : ''
  const styles = Object.assign({}, style)
  const msgStyles =
    Object.assign({ color: 'blue', fontSize: 'smaller' }, msgStyle)
  return (
    <h2 style={styles}>{title} {note} <span style={msgStyles}>{liveLabel}</span></h2>
  )
}

export type PTProps = {
  pageData?:object
  dataField:string,
  live?:boolean,
  title:string,
  styles: object
}

export const PortableText = (props:PTProps) => {

  const { pageData = {}, dataField,  live = false,
    title, styles = {} } = props
  const content = fromPage (live, dataField, pageData)

  // *todo* temporary for initial demo
  const titleNote = live
    ? 'Live Preview'
    : 'as Production'

  const blockStyle = Object.assign({
    marginLeft: '10px',
  }, styles)

  return (
    <>
      {
        title && <h3 className={"subtitle"}>{title} ({titleNote})</h3>
      }
      <div style={blockStyle}>
        <SanityPortableText value={content} />
      </div>
    </>
  )
}

interface ImageBlockProps {
  pageData:Object,
  dataField:string,
  live:boolean,
  pipelineWidth:number,
  alt?:string,
  styles?:object,
}

export const SanityImage = (props:ImageBlockProps) => {
  const { pageData, dataField, live = false,
    pipelineWidth, alt = 'Image', styles = {} } = props

  const blockStyle = Object.assign ({
    a: {
      color: 'inherit',
      textDecoration: 'none'
    },
    imageStyle: {
      width: '100%',
      maxWidth: '50px',
      height: 'auto',
      marginBottom: '1rem',
    },
    warn: {
      color: 'darkred',
    }
  }, styles)

  let errReported
  // for more twitchy content, we need this kind of thing
  if (!props.pipelineWidth) {
    const msg = 'SanityImage: you need to provide a pipelineWidth prop ' +
      'to set size on the Sanity image pipeline...'
    console.error(msg)
    errReported = msg
  }

  const content = fromPage (live, dataField, pageData)

  return (
      <div>
        {
          !errReported
            ? <img style={blockStyle.imageStyle} loading="lazy"
                   src={imageUrl(content, pipelineWidth)}
                   alt={alt}
            />
            : <h3 className="warn">{errReported}</h3>
        }
      </div>
    )
}

export type RHCaptionType = {
  name:string,
  live:boolean,
  children:any
}

export const RowHorizontalCaption = (props:RHCaptionType) => {
  // *todo* actually, make this into a true child-enumerating rows container, combinable
  const { name, children, live } = props
  return (
    <div className="theAuthor-block">
      <div className="theAuthor-row">
        <div>{children}</div>
        <div>
          <h3 className="caption">{name}</h3>
          <div> {/* *todo* this block is temporary, only for initial demo*/}
            { live && <h4 style={{color:"darkred"}}>(live<br/>preview)</h4> }
          </div>
        </div>
      </div>
    </div>
  )
}

export const PageStatusDate = (props) => {
  const { pageData } = props
  return (
    <>
      <a href="{`/theAuthor/{pageData?.slug?.current}`" target="_blank">
        {pageData._originalId ? 'Draft: ' : 'Published: '}
      </a>
      <time className="publish-date">
        {formatBlogPostDate(pageData._updatedAt)}
      </time>
    </>
  )
}

export type TextListType = {
  pageData: object,
  dataField: string,
  live: boolean,
  class?: string
}
export const TextList = (props) => {

  const { pageData = {}, dataField, live, styleClass="" } = props
  const content = fromPage (live, dataField, pageData)
  // *todo* these and its use span temporary only, for demo!
  const liveMsg = live ? '(live preview)' : ''
  const liveStyle = { color: 'darkred' }
  return (
    <div>
      <h3>Contacts <span style={liveStyle}>{liveMsg}</span></h3>
      <div>
        { content &&
          content.map((item: string, index: number) => {
            return <p key={index} className={styleClass}>{item}</p>
          })
        }
      </div>
    </div>
  )
}