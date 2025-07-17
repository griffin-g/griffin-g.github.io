import { useEffect, useState } from 'react';
import {
    getHintFromWord,
    generateRandomLetters,
    findWordList,
    loadWordList,
    scrambleLetterList
} from '../utils/WordHelper';
import '../App.css';

function SevenLetter() {
    const [message, setMessage] = useState('');
    const [letters, setLetters] = useState<string[]>([]);
    const [words, setWords] = useState<string[]>([]);
    const [guess, setGuess] = useState('');
    const [guessedWords, setGuessedWords] = useState<string[]>([]);
    const [hint, setHint] = useState<string | null>(null);

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
            console.log(newLetters);
            console.log(validWords);
        } catch (error) {
            console.error('Error loading word list:', error);
            setMessage('Failed to load word list.');
        }
    };

    useEffect(() => {
        startNewGame();
    }, []);

    // shuffle letters except for the first -> required letter
    const scrambleLetters = () => {
        if (letters.length <= 1) return;

        const required = letters[0];
        const rest = letters.slice(1);
        const scrambled = scrambleLetterList(rest);
        setLetters([required, ...scrambled]);
    };

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
            setMessage('You already guessed that word');
        } else if (words.includes(trimmed)) {
            setGuessedWords([...guessedWords, trimmed]);
            setMessage('Correct!');
        } else {
            setMessage('Not a valid word!');
        }

        setGuess('');
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Spelling Bee</h2>
                <button className="btn btn-primary" onClick={startNewGame}>New Game</button>
            </div>

            <div className="mb-3">
                <p><strong>Use these letters:</strong> <span className="text">{letters.join(', ')}</span></p>
                <button className="btn btn-secondary mb-3" onClick={scrambleLetters}>Scramble Letters</button>
                <p>The letter <strong>{letters[0]}</strong> is required in your word</p>
            </div>

            <form onSubmit={handleGuessSubmit} className="row g-2 align-items-center mb-3">
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        value={guess}
                        onChange={e => setGuess(e.target.value)}
                        placeholder="Enter a word"
                    />
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-success">Submit</button>
                </div>
            </form>

            {message && <p className="alert alert-info">{message}</p>}

            <button className="btn btn-warning mb-3" onClick={showHint}>Get Hint</button>
            {hint && <p><strong>Hint:</strong> {hint}</p>}

            <h4>Guessed Words ({guessedWords.length})</h4>
            <div className="row">
                {guessedWords.map((word, index) => (
                    <div key={index} className="col-md-4 mb-2">
                        <div className="p-2 bg-warning text-white text-center rounded">{word}</div>
                    </div>
                ))}
            </div>

            <hr />
            <p><strong>Total Possible Words:</strong> {words.length}</p>
        </div>
    );
}

export default SevenLetter;