import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import './WalletButton.scss';
import { useDisconnect } from "wagmi";

const WalletButton = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const { disconnect } = useDisconnect();

    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                // If not mounted or not connected, show the connect wallet button.
                if (!mounted || authenticationStatus === 'loading' || !account || !chain) {
                    return (
                        <button className="wallet-button" onClick={openConnectModal}>
                            Connect Wallet
                        </button>
                    );
                }

                // Format the address (e.g., "0x12...34")
                const displayAddress =
                    account.address.slice(0, 6) + '...' + account.address.slice(-4);

                return (
                    <>
                        <button className="wallet-button" onClick={handleModalOpen}>
                            {displayAddress}
                        </button>

                        {modalOpen && (
                            <div className="modal-overlay" onClick={handleModalClose}>
                                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                    <button className="modal-close" onClick={handleModalClose}>
                                        &times;
                                    </button>
                                    <h2>Wallet Details</h2>
                                    <p>
                                        <strong>Address:</strong> {account.address}
                                    </p>
                                    <p>
                                        <strong>Chain:</strong> {chain.name}
                                    </p>
                                    <button
                                        className="disconnect-button"
                                        onClick={() => {
                                            disconnect();
                                            handleModalClose();
                                        }}
                                    >
                                        Disconnect
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                );
            }}
        </ConnectButton.Custom>
    );
};

export default WalletButton;
