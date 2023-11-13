import {sanityPortableText} from "../../lib/sanityPortableText";

export type SPTprops = {
  value: object
}

// *todo* goes hidden in blocks once not needed for demo
const SanityPortableText = (props:SPTprops) => {
    const {value} = props
    const theHtml = () => {
        const htmlText = sanityPortableText(value)
        return {__html: htmlText}
    }

    return <div dangerouslySetInnerHTML={theHtml()}/>
}

export default SanityPortableText