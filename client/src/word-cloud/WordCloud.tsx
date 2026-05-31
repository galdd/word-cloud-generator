import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { fetchWordCloud } from './api'
import type { WordFrequency } from './types'
import { getPersistentWordColor, getScaledFontSize } from './utils'

const normalizeWordFrequencies = (items: WordFrequency[]): WordFrequency[] => {
  const wordMap = new Map<string, number>()

  for (const item of items) {
    const normalizedWord = item.word.trim().toLowerCase()

    if (!normalizedWord) {
      continue
    }

    wordMap.set(normalizedWord, (wordMap.get(normalizedWord) ?? 0) + item.count)
  }

  return Array.from(wordMap, ([word, count]) => ({
    word,
    count,
  })).sort((a, b) => b.count - a.count)
}

export function WordCloud() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['word-cloud'],
    queryFn: fetchWordCloud,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })

  const words = useMemo(() => {
    return normalizeWordFrequencies(data ?? [])
  }, [data])

  const { minCount, maxCount } = useMemo(() => {
    if (words.length === 0) {
      return {
        minCount: 0,
        maxCount: 0,
      }
    }

    const counts = words.map((item) => item.count)

    return {
      minCount: Math.min(...counts),
      maxCount: Math.max(...counts),
    }
  }, [words])

  if (isLoading) {
    return <div className="word-cloud-panel">Loading word cloud...</div>
  }

  if (isError) {
    return (
      <div className="word-cloud-panel word-cloud-panel--error">
        {error instanceof Error ? error.message : 'Something went wrong'}
      </div>
    )
  }

  if (words.length === 0) {
    return <div className="word-cloud-panel">No words found.</div>
  }

  return (
    <div className="word-cloud">
      {words.map((item) => (
        <span
          key={item.word}
          className="word-cloud__word"
          title={`${item.word}: ${item.count}`}
          style={{
            fontSize: `${getScaledFontSize(item.count, minCount, maxCount)}px`,
            color: getPersistentWordColor(item.word),
          }}
        >
          {item.word}
        </span>
      ))}
    </div>
  )
}