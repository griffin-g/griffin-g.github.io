import { useEffect, useState } from 'react';
import {
    loadWordList,
    getLongWord,
    getLongWordLetters,
    scrambleLetterList
} from '../utils/WordHelper';

import '../App.css';

function LongWord() {
    const [message, setMessage] = useState('');
    const [letters, setLetters] = useState<string[]>([]);
    const [word, setWord] = useState('');
    const [guess, setGuess] = useState('');

    const startNewGame = async () => {
        try {
            const allWords = await loadWordList();
            const lWord = getLongWord(allWords);
            const lWordLetters = getLongWordLetters(lWord);
            setLetters(lWordLetters);
            setWord(lWord);
            setGuess('');
            setMessage('');
            console.log('Target Word:', lWord);
            console.log('Letters:', lWordLetters);
        } catch (error) {
            console.error('Error loading word list:', error);
            setMessage('Failed to load word list.');
        }
    };

    useEffect(() => {
        startNewGame();
    }, []);

    const scrambleLetters = () => {
        setLetters(scrambleLetterList(letters));
    };

    const handleGuessSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = guess.toLowerCase().trim();
        if (!trimmed) return;

        if (trimmed.length !== word.length) {
            setMessage(`Word must be exactly ${word.length} letters long`);
            return;
        }

        const isValid = Array.from(trimmed).every(letter => letters.includes(letter));

        if (!isValid) {
            setMessage("Word contains letters not in the list");
            return;
        }

        if (trimmed === word) {
            setMessage("Correct!");
        } else {
            setMessage("Incorrect. Try again.");
        }

        setGuess('');
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Long Word</h2>
                <button className="btn btn-primary" onClick={startNewGame}>New Game</button>
            </div>

            <div className="mb-3">
                <p><strong>Use these letters:</strong> <span className="text">{letters.join(', ')}</span></p>
                <button className="btn btn-secondary mb-3" onClick={scrambleLetters}>Scramble Letters</button>
                <p>Guess the hidden word using only these letters. The word is <strong>{word.length}</strong> letters long.</p>
            </div>

            <form onSubmit={handleGuessSubmit} className="row g-2 align-items-center mb-3">
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        value={guess}
                        onChange={e => setGuess(e.target.value)}
                        placeholder={`Enter a ${word.length}-letter word`}
                    />
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-success">Submit</button>
                </div>
            </form>

            {message && <p className="alert alert-info">{message}</p>}
        </div>
    );
}

export default LongWord;