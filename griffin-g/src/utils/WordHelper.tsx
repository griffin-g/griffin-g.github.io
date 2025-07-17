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

