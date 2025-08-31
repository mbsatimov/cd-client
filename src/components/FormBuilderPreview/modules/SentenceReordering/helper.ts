export function randomizeSentence(sentence: string) {
  // Replace multiple spaces with one
  const cleaned = sentence.trim().replace(/\s+/g, ' ');

  // Split into words
  const words = cleaned.split(' ');

  // Shuffle using Fisher–Yates
  for (let i = words.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [words[i], words[j]] = [words[j], words[i]];
  }

  // Return randomized sentence
  return words;
}
