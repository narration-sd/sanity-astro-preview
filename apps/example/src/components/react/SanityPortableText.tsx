import {sanityPortableText} from "../../lib/sanityPortableText";

export default function SanityPortableText(props) {
    const {value} = props
    const theHtml = () => {
        const htmlText = sanityPortableText(value)
        return {__html: htmlText}
    }

    return <div dangerouslySetInnerHTML={theHtml()}/>
}
