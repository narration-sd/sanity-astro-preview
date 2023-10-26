import { atom } from 'nanostores'

export type AtomAuthValues = {
    name: string,
    bio: object
}

export const eAtomData
  = atom({
    previewDataObj: { initialized: 'no data' }
  })
