import { scaleLinear } from 'd3-scale'
import { MAX_FONT_SIZE, MIN_FONT_SIZE } from './consts'

export const getScaledFontSize = (
  count: number,
  minCount: number,
  maxCount: number,
): number => {
  if (maxCount === minCount) {
    return Math.round((MIN_FONT_SIZE + MAX_FONT_SIZE) / 2)
  }

  const scale = scaleLinear()
    .domain([minCount, maxCount])
    .range([MIN_FONT_SIZE, MAX_FONT_SIZE])
    .clamp(true)

  return Math.round(scale(count))
}

const hashWord = (word: string): number => {
  let hash = 0

  for (let index = 0; index < word.length; index += 1) {
    hash = (hash << 5) - hash + word.charCodeAt(index)
    hash |= 0
  }

  return Math.abs(hash)
}

export const getPersistentWordColor = (word: string): string => {
  const normalizedWord = word.trim().toLowerCase()
  const hue = hashWord(normalizedWord) % 360

  return `hsl(${hue} 70% 45%)`
}