export function standardizationWords(word) {
  const convertWord = word.substring(0, 1).toUpperCase().concat(word.substring(1).toLowerCase())
   return convertWord
}
