import { ALLOWED_WORDS, WORDS } from "../constants/wordlist";

export const isWordInWordList = (word: string) => {
  (window as any).WORDS = WORDS;
  (window as any).ALLOWED_WORDS = ALLOWED_WORDS;
  return ALLOWED_WORDS.includes(word.toLowerCase()) || WORDS.includes(word.toLowerCase());
};

export const isWinningWord = (word: string) => {
  return solution === word;
};

export const getDay = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const dayOverrideString = urlParams.get('day');
  const epochMs = 1641013200000;
  const now = Date.now();
  const msInDay = 86400000;
  const index = Math.floor((now - epochMs) / msInDay);
  const overrideIndex = dayOverrideString === null ? index : (parseInt(dayOverrideString) - 1)
  return overrideIndex < index ? overrideIndex : index;
}

export const getWordOfDay = () => {
  return WORDS[getDay()].toUpperCase();
};

export const solution = getWordOfDay();
