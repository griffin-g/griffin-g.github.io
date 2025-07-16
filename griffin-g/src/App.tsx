import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [letters, setLetters] = useState<string[]>([]);
  const [words, setWords] = useState<string[]>([]);
  const [guess, setGuess] = useState('');
  const [guessedWords, setGuessedWords] = useState<string[]>([]);
  const [message, setMessage] = useState('');

const startNewGame = () => {
  axios.get('https://alphabetprojects.onrender.com/api/getWordList?length=7')
    .then(res => {
      setLetters(res.data.letters);
      setWords(res.data.words);
      setGuessedWords([]);
      setGuess('');
      setMessage('');
      console.log("Letters:", res.data.letters);
      console.log("Words:", res.data.words);
    })
    .catch(err => {
      console.error('Error fetching word list:', err);
      setMessage('Failed to fetch game data.');
    });
};

useEffect(() => {
  startNewGame();
}, []);


  const handleGuessSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const trimmed = guess.toLowerCase().trim();
  if (!trimmed) return;

  const requiredLetter = letters[0]; // required

  if (!trimmed.includes(requiredLetter)) {
    setMessage(`Word must include the required letter: ${requiredLetter}`);
  } else if (guessedWords.includes(trimmed)) {
    setMessage('🔁 You already guessed that!');
  } else if (words.includes(trimmed)) {
    setGuessedWords([...guessedWords, trimmed]);
    setMessage('Correct!');
  } else {
    setMessage('Not a valid word!');
  }

  setGuess('');
};

  return (
    <div className="App">
      <p><strong>Use these letters:</strong> {letters.join(', ')}</p>
      <button onClick={startNewGame}>Refresh Letters</button>
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

      <h2>Guessed Words ({guessedWords.length})</h2>
      <ul>
        {guessedWords.map((word, idx) => <li key={idx}>{word}</li>)}
      </ul>

      <hr />
      <p>There are {words.length} possible word(s).</p>
    </div>
  );
}

export default App;