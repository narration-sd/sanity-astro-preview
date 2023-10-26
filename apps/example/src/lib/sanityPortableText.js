// import { portableTextToHtml } from 'astro-sanity';
import { toHTML } from "@portabletext/to-html";
import { imageHandler } from './typeHandlers'
import { uriLooksSafe }  from '@portabletext/to-html'
// import * as urlRegexSafe from 'url-regex-safe'

export const customComponents = {
  types: {
    mainImage: ({ value }) => imageHandler (value),
    image: ({ value }) => imageHandler (value),
    code: ({ value }) => {
      return `<code-block code='${value.code}' language='${value.language}'></code-block>`;
    },
    hr: ({value}) => {
      // *todo* but this is old style w/attributes -- use the new
      return (`
        <hr
          color="${value.color}"
          size="${value.size}"
          align="${value.align}"
          width="${value.width}"
          ${value.noshade ? 'noshade' : '' }
          />`)
    },
  },
  marks: {
    highlight: ({ children }) => {
      return `<span style="background-color: yellow">${children}</span>`;
    },
    super: ({ children }) => {
      return `<span style="font-size: 48px; color: darkblue;">${children}</span>`;
    },
    // *tdo* Decide if we really want to have Bill set blank, or on that site default
    link: ({value, children}) => {
      const { blank = true, href = '' } = value

      // bringing in the safety approach from https://github.com/portabletext/to-html#customizing-components !!

      // however, it looks like urlLooksSafe has reactish nodish libraries
      // so let's try url-reg-safe instead
      if (uriLooksSafe(href)) {

      // if (urlRegexSafe({ exact: true }).test(href)) {
        const rel = href.startsWith('/') ? undefined : 'noreferrer noopener'
        return blank
          ? `<a href="${href}" target="_blank" r rel="${rel}">${children}</a>`
          : `<a href="${href}"  rel="${rel}">${children}</a>`
      }

      // If the URI appears unsafe, render the children (eg, text) without the link
      return children
    },
  },
  block: {
    super: ({children}) => {
      return `<h1><span style="font-size: 96px; color: darkblue;">${children}</span></h1>`
    },
    h2: ({children}) => {
      return `<h2 style="color: darkred !important; font-size: 48px">${children}</h2>`
    },
  },
}

export function sanityPortableText(portabletext) {
  // console.log('sPT:portableText:' + JSON.stringify(portabletext, 0, 2))
  return toHTML(portabletext, { components: customComponents });
}