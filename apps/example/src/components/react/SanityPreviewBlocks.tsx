import SanityPortableText from './SanityPortableText'
import {useStore} from "@nanostores/react";
import {imageUrl} from "../../utils/helpers"

import {ePreviewData} from "@narration-sd/sanity-astro-preview";

const fromPage = (live: boolean, dataField: string, pageData: {}) => {
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
  const content= fromPage (live, dataField, pageData)

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