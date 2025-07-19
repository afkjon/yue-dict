import fs from 'fs'
import path from 'path'

const parseDictionary = (text) => {
  const lines = text.split('\n').filter(line => {
    const trimmed = line.trim()
    return trimmed && !trimmed.startsWith('#') // Ignore empty lines, comments, and lines starting with #
  })
  
  const dictionary = {}
  
  lines.forEach(line => {
    // Assuming format: "traditional simplified pingyin jyutping / definition 1 / definition 2 / definition 3"
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

const parseCantoReadings = (text) => {
  const lines = text.split('\n').filter(line => {
    const trimmed = line.trim()
    return trimmed && !trimmed.startsWith('#') // Ignore empty lines, comments, and lines starting with #
  })
  
  const dictionary = {}
  
  lines.forEach(line => {
    // Assuming format: "simplified traditional pingyin jyutping"
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

export default defineEventHandler(async (event) => {
  const cantoWebdist = path.join(process.cwd(), 'data/cccanto-webdist.txt')
  const cantoReadings = path.join(process.cwd(), 'data/cccedict-canto-readings-150923.txt')

  const rawDictionary = fs.readFileSync(cantoWebdist, 'utf8')
  const parsedCantoWebdist = parseDictionary(rawDictionary)

  const rawReadings = fs.readFileSync(cantoReadings, 'utf8')
  const parsedCantoReadings = parseCantoReadings(rawReadings)

  const mergedDictionary = { ...parsedCantoWebdist, ...parsedCantoReadings }

  return { data: mergedDictionary }
})

