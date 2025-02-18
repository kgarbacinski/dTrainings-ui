import { ConnectButton } from "@rainbow-me/rainbowkit";
import './Navbar.scss';
import {useAccount, useDisconnect} from "wagmi";
import Account from "../Account/Account";
import WalletButton from "../Wallet/WalletButton";

const Navbar = () => {
    const { isConnected } = useAccount();
    const { disconnect } = useDisconnect()

    return (
        <nav className="navbar">
            <div className="navbar__brand">Training dApp</div>

            <ul className="navbar__nav">
                <li className="navbar__nav-item">Home</li>
                <li className="navbar__nav-item">Rankings</li>
                <li className="navbar__nav-item">Your stats</li>
                <li className="navbar__nav-item">About</li>
            </ul>

            <div className="navbar__actions">
                <WalletButton />
            </div>
        </nav>
    )
}

export default Navbar;