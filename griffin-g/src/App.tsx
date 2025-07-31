import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SevenLetter from './pages/SevenLetter';
import LongWord from './pages/LongWord';
import EnDecoder from './pages/EnDecoder';
// router app

function App() {
  return (
    <Router>
      <Header></Header>
        <main>
          <Routes>
            <Route path="/" element={<p>Welcome!</p>} />
            <Route path="/sevenLetter" element={<SevenLetter />} />
            <Route path="/longWord" element={<LongWord />} />
            <Route path="/endecoder" element={<EnDecoder />} />

          </Routes>
        </main>
    </Router>
  );
}

export default App;