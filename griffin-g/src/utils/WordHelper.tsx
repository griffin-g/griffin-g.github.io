export const loadWordList = async (): Promise<string[]> => {
  const response = await fetch("/wordlist.txt");
  const text = await response.text();
  return text.split("\n").map(word => word.trim()).filter(Boolean);
};

export const generateRandomLetters = (length: number): string[] => {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  while (true) {
    const shuffled = alphabet.sort(() => 0.5 - Math.random()).slice(0, length);
    if (shuffled.some(c => vowels.includes(c))) {
      return shuffled;
    }
  }
};

export const canSpell = (word: string, letters: string[]): boolean => {
  return [...word].every(c => letters.includes(c));
};

export const findWordList = (letters: string[], words: string[]): string[] => {
  const first = letters[0];
  return words.filter(word => 
    word.length > 1 && 
    word.includes(first) && 
    canSpell(word, [...letters])
  );
};

// search for a word of length > 7
// return random long word
export function getLongWord(words: string[]): string {
  const longWords = words.filter(word => word.length >= 7);
  const randomElement = Math.floor(Math.random() * longWords.length);
  return longWords[randomElement];
}

export function getLongWordLetters(word: string): string[] {
    const uniqueLetters = Array.from(new Set(word.split('')));

    for (let i = uniqueLetters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [uniqueLetters[i], uniqueLetters[j]] = [uniqueLetters[j], uniqueLetters[i]];
    }

    return uniqueLetters;
}

export function scrambleLetterList(letters: string[]): string[] {
    const shuffled = [...letters];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export function getHintFromWord(word: string): string {
  const visible = Math.floor(word.length / 3);
  const indexes = new Set<number>();

  while (indexes.size < visible) {
    indexes.add(Math.floor(Math.random() * word.length));
  }

  return word
    .split("")
    .map((char, i) => (indexes.has(i) ? char : "_"))
    .join(" ");
}

