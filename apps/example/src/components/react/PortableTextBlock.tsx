import SanityPortableText from './SanityPortableText'
import {useStore} from "@nanostores/react";
import {ePreviewData, type PreviewType} from "@narration-sd/sanity-astro-preview";

const blockStyle = {
  marginLeft: '10px',
}

export type PTProps = {
  live?:boolean,
  dataField:string,
  title:string,
  pageData?:object
}
export const PortableTextBlock = (props:PTProps) => {

  const { live = false, dataField, title, pageData = {} } = props

  const content = live
    ? useStore(ePreviewData)?.previewData[dataField]
    : pageData[dataField]

  const titleNote = live
    ? 'Live Preview - refresh to preview others'
    : 'as Production'

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
