import { atom } from 'nanostores'

export type PreviewType = {
    previewData: object,
    loading: boolean
}

export const ePreviewData
  = atom<PreviewType>({
    previewData: { initialized: 'no data' },
    loading: false
  })
