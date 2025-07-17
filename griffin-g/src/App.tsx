import { useEffect, useState } from 'react';
// import axios from 'axios';
import './App.css';

import {
  getHintFromWord,
  generateRandomLetters,
  findWordList,
  loadWordList,
} from './utils/WordHelper';

function App() {
  const [message, setMessage] = useState('');
  const [letters, setLetters] = useState<string[]>([]);
  const [words, setWords] = useState<string[]>([]);
  const [guess, setGuess] = useState('');
  const [guessedWords, setGuessedWords] = useState<string[]>([]);
  const [hint, setHint] = useState<string | null>(null);

// const startNewGame = () => {
//   axios.get('https://alphabetprojects.onrender.com/api/getWordList?length=7')
//     .then(res => {
//       setLetters(res.data.letters);
//       setWords(res.data.words);
//       setGuessedWords([]);
//       setGuess('');
//       setMessage('');
//       console.log("Letters:", res.data.letters);
//       console.log("Words:", res.data.words);
//     })
//     .catch(err => {
//       console.error('Error fetching word list:', err);
//       setMessage('Failed to fetch game data.');
//     });
// };

const startNewGame = async () => {
  try {
    const allWords = await loadWordList();
    const newLetters = generateRandomLetters(7);
    const validWords = findWordList(newLetters, allWords);

    setLetters(newLetters);
    setWords(validWords);
    setGuessedWords([]);
    setGuess('');
    setMessage('');
    console.log("Letters:", newLetters);
    console.log("Words:", validWords);
  } catch (error) {
    console.error('Error loading word list:', error);
    setMessage('Failed to load word list.');
  }
};

useEffect(() => {
  startNewGame();
}, []);


const showHint = () => {
  const remaining = words.filter(w => !guessedWords.includes(w));
  if (remaining.length > 0) {
    const candidate = remaining[Math.floor(Math.random() * remaining.length)];
    const masked = getHintFromWord(candidate);
    setHint(masked);
  } else {
    setHint("No more hints available!");
  }
};

const handleGuessSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const trimmed = guess.toLowerCase().trim();
  if (!trimmed) return;

  const requiredLetter = letters[0]; 

  if (!trimmed.includes(requiredLetter)) {
    setMessage(`Word must include the required letter: ${requiredLetter}`);
  } else if (guessedWords.includes(trimmed)) {
    setMessage('You already guessed that!');
  } else if (words.includes(trimmed)) {
    setGuessedWords([...guessedWords, trimmed]);
    setMessage('Correct!');
  } else {
    setMessage('Not a valid word!');
  }

  setGuess('');
};

  return (
    <>
      <button onClick={startNewGame}>Refresh Letters</button>
      <br></br>
      <p><strong>Use these letters:</strong> {letters.join(', ')}</p>
      <p>The letter <strong>{letters[0]}</strong> is required in your word</p>
      <form onSubmit={handleGuessSubmit}>
        <input
          type="text"
          value={guess}
          onChange={e => setGuess(e.target.value)}
          placeholder="Enter a word"
        />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>

      <br></br>
      <button onClick={showHint}>Get Hint</button>
      {hint && <p>Hint: {hint}</p>}
      <br></br>

      <h2>Guessed Words ({guessedWords.length})</h2>
      <div className="guessed-words">
        {guessedWords.map((word, index) => (
          <div key={index} className="word-box">{word}</div>
        ))}
      </div>

      <hr />
      <p>There are {words.length} possible word(s).</p>
    </>
  );
}

export default App;