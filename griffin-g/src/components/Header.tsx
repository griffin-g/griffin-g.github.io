import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-dark text-white fixed-top">
      <nav className="navbar navbar-expand-md navbar-dark container">
        <h1 className="navbar-brand h4 m-0">Web Stuff</h1>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link text-info">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/sevenLetter" className="nav-link text-info">Seven Letter</Link>
            </li>
            <li className="nav-item">
              <Link to="/longWord" className="nav-link text-info">Long Word</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;