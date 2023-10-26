import { persistentMap  } from '@nanostores/persistent'

export type EncounselValues = {
    assurance: 'in question' | 'not assured' | 'assured!',
    theme: 'dark' | 'light' | 'auto',
    activity: String
}

export const eSettings
  = persistentMap<EncounselValues>('settings', {
    assurance: 'in question',
    theme: 'auto',
    activity: 'inactive as yet...'
})
