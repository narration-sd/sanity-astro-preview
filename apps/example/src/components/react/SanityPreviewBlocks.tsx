import SanityPortableText from './SanityPortableText'
import {useStore} from "@nanostores/react";
import {imageUrl} from "../../utils/helpers"

import {ePreviewData} from "@narration-sd/sanity-astro-preview";

function fromPage (live: boolean, dataField: string, pageData: {}) {
  const content = live
    ? useStore(ePreviewData)?.previewData[dataField]
    : pageData[dataField]
  return content;
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

  const content = fromPage (live, dataField, pageData);

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

  const content = fromPage (live, dataField, pageData);

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