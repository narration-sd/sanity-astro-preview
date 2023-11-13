import {sanityPortableText} from "../../lib/sanityPortableText";

export type SPTprops = {
  value: object
}

export default function SanityPortableText(props:SPTprops) {
    const {value} = props
    const theHtml = () => {
        const htmlText = sanityPortableText(value)
        return {__html: htmlText}
    }

    return <div dangerouslySetInnerHTML={theHtml()}/>
}
