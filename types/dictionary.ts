export interface DictionaryEntry {
  traditional: string
  simplified: string
  pingyin: string
  jyutping: string 
  definitions: string
}

export type Dictionary = Record<string, DictionaryEntry>
