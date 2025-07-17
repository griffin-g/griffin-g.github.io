import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SpellBee from './pages/SpellBee';

// router app

function App() {
  return (
    <Router>
      <div>
        <header className="bg-dark text-white py-3 fixed-top">
          <div className="container d-flex justify-content-between align-items-center">
            <h1 className="h4 m-0">Web Stuff</h1>
            <nav>
              <Link to="/" className="text-info me-3">Home</Link>
              <Link to="/spellingBee" className="text-info">Spelling Bee</Link>
            </nav>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<p>Welcome!</p>} />
            <Route path="/spellingBee" element={<SpellBee />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;