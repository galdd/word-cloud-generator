import {
  WORD_API_URL,
  WORD_BATCH_SIZE,
  WORD_FETCH_ATTEMPTS,
  WORD_REQUEST_COUNT,
  WORD_RETRY_DELAY_MS,
} from './consts'
import type { WordFrequency } from './types'

type RandomWordResponse = string[]

const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

const fetchWord = async (): Promise<string> => {
  let lastError: unknown

  for (let attempt = 1; attempt <= WORD_FETCH_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(WORD_API_URL)

      if (!response.ok) {
        throw new Error(`Failed to fetch word. Status: ${response.status}`)
      }

      const data: unknown = await response.json()

      if (!Array.isArray(data) || typeof data[0] !== 'string') {
        throw new Error('Invalid word API response')
      }

      return data[0]
    } catch (error) {
      lastError = error

      if (attempt < WORD_FETCH_ATTEMPTS) {
        await delay(WORD_RETRY_DELAY_MS)
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error('Failed to fetch word')
}

const addWordToFrequencyMap = (
  wordMap: Map<string, number>,
  word: string,
): void => {
  const normalizedWord = word.trim().toLowerCase()

  if (!normalizedWord) {
    return
  }

  wordMap.set(normalizedWord, (wordMap.get(normalizedWord) ?? 0) + 1)
}

const mapFrequenciesToResult = (
  wordMap: Map<string, number>,
): WordFrequency[] => {
  return Array.from(wordMap, ([word, count]) => ({
    word,
    count,
  })).sort((a, b) => b.count - a.count)
}

export const getWordCloud = async (): Promise<WordFrequency[]> => {
  const wordMap = new Map<string, number>()

  for (let index = 0; index < WORD_REQUEST_COUNT; index += WORD_BATCH_SIZE) {
    const batchSize = Math.min(WORD_BATCH_SIZE, WORD_REQUEST_COUNT - index)

    const batchWords = await Promise.all(
      Array.from({ length: batchSize }, () => fetchWord()),
    )

    for (const word of batchWords) {
      addWordToFrequencyMap(wordMap, word)
    }
  }

  return mapFrequenciesToResult(wordMap)
}