import { useState } from 'react';
import './Navbar.scss';
import WalletButton from "../Wallet/WalletButton";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="navbar">
            <Link to="/" className="navbar__brand">dTrainings</Link>

            <button
                className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
            >
                <span />
                <span />
                <span />
            </button>

            <ul className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
                <li className={`navbar__nav-item ${isActive('/') ? 'navbar__nav-item--active' : ''}`}>
                    <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                </li>
                <li className={`navbar__nav-item ${isActive('/trainings-manager') ? 'navbar__nav-item--active' : ''}`}>
                    <Link to="/trainings-manager" onClick={() => setMenuOpen(false)}>Trainings</Link>
                </li>
            </ul>

            <div className={`navbar__actions ${menuOpen ? 'navbar__actions--open' : ''}`}>
                <WalletButton />
            </div>
        </nav>
    )
}

export default Navbar;
