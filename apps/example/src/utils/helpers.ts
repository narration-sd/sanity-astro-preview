import { parseISO, format } from 'date-fns';
import { createClient } from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url";

const clientConfig = {
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  token: import.meta.env.PUBLIC_SANITY_EDITOR_TOKEN, // actually only viewer req'd for preview...
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION,
  useCdn: false, // (process.env.NODE_ENV === 'production'), // *todo* for local dev
}
const sanityClient = createClient(clientConfig)

const builder = imageUrlBuilder(sanityClient)

export const formatBlogPostDate = (date) => {
  const dateString = parseISO(date, 'YYYY/MM/Do');
  const formattedDateString = format(dateString, 'MMMM do, yyyy');
  return `${formattedDateString}`;
}

export const imageUrl = (
  theImage: object,
  width?:number,
  height?: number):string => {

  let urlBase = getSanityImageURL(theImage)
  if (width) {
    urlBase = urlBase.width(width)
  }
  if (height) {
    urlBase = urlBase.height(height)
  }

  return theImage
    ? urlBase.url()
    : ''
}
export const getSanityImageURL = (source) => {
  return builder.image(source);
}