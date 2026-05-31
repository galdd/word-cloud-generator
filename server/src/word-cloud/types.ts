export interface WordFrequency {
  word: string;
  count: number;
}

export interface WordCloudResult {
  words: WordFrequency[];
}
