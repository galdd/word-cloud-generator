import { WORD_CLOUD_API_URL } from './consts'
import type { WordFrequency } from './types'

export const fetchWordCloud = async (): Promise<WordFrequency[]> => {
  const response = await fetch(WORD_CLOUD_API_URL)

  if (!response.ok) {
    throw new Error('Failed to fetch word cloud data')
  }

  const data: unknown = await response.json()

  if (!Array.isArray(data)) {
    throw new Error('Invalid word cloud response')
  }

  return data as WordFrequency[]
}