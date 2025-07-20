import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { type Dictionary, type DictionaryEntry } from '../types/dictionary'

const parseDictionary = (text: string) : Dictionary => {
  const lines = text.split('\n').filter(line => {
    const trimmed = line.trim()
    return trimmed && !trimmed.startsWith('#') // Ignore empty lines, comments, and lines starting with #
  })
  
  const dictionary: Record<string, DictionaryEntry> = {}
  
  // Line Format: 
  // "traditional simplified pingyin jyutping / definition 1 / definition 2 / definition 3"
  lines.forEach(line => {
    const characters = line.substring(0, line.indexOf('[')).trim()
    const [traditional, simplified] = characters.split(' ')
    const key = traditional?.trim()
    const pingyin = line.substring(line.indexOf('[') + 1, line.indexOf(']')).trim()
    const jyutping = line.substring(line.indexOf('{') + 1, line.indexOf('}')).trim()
    const definitions = line.substring(line.indexOf('/') + 1, line.length - 1).trim()

    dictionary[key] = {
      traditional: key,
      simplified: simplified?.trim() || '',
      pingyin: pingyin?.trim() || '',
      jyutping: jyutping?.trim() || '',
      definitions: definitions?.trim() || ''
    }    
  })
  
  return dictionary
}

const parseCantoReadings = (text: string) : Dictionary => {
  const lines = text.split('\n').filter(line => {
    const trimmed = line.trim()
    return trimmed && !trimmed.startsWith('#') // Ignore empty lines, comments, and lines starting with #
  })
  
  const dictionary: Record<string, DictionaryEntry> = {}
  
  lines.forEach(line => {
    const characters = line.substring(0, line.indexOf('[')).trim()
    const [simplified, traditional] = characters.split(' ')
    const key = traditional?.trim()
    const pingyin = line.substring(line.indexOf('[') + 1, line.indexOf(']')).trim()
    const jyutping = line.substring(line.indexOf('{') + 1, line.indexOf('}')).trim()

    dictionary[key] = {
      traditional: key,
      simplified: simplified?.trim() || '',
      pingyin: pingyin?.trim() || '',
      jyutping: jyutping?.trim() || '',
      definitions: ''
    }    
  })
  
  return dictionary
} 

const cantoWebdist = join(process.cwd(), 'data/cccanto-webdist.txt')
const cantoReadings = join(process.cwd(), 'data/cccedict-canto-readings-150923.txt')

const rawDictionary = readFileSync(cantoWebdist, 'utf8')
const parsedCantoWebdist = parseDictionary(rawDictionary)

const rawReadings = readFileSync(cantoReadings, 'utf8')
const parsedCantoReadings = parseCantoReadings(rawReadings)

const mergedDictionary = { ...parsedCantoWebdist, ...parsedCantoReadings }

const outputPath = join(process.cwd(), 'public/dictionary.json')
writeFileSync(outputPath, JSON.stringify(mergedDictionary, null, 2))

console.log(`Dictionary built: ${Object.keys(mergedDictionary).length} entries`)
