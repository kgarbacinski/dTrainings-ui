import './Navbar.scss';
import WalletButton from "../Wallet/WalletButton";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar__brand">Training dApp</div>

            <ul className="navbar__nav">
                <li className="navbar__nav-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="navbar__nav-item">
                    <Link to="/rankings">Rankings</Link>
                </li>
                <li className="navbar__nav-item">Your stats</li>
            </ul>

            <div className="navbar__actions">
                <WalletButton />
            </div>
        </nav>
    )
}

export default Navbar;