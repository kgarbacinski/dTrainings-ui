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
                if (!mounted || authenticationStatus === 'loading' || !account || !chain) {
                    return (
                        <button className="wallet-button" onClick={openConnectModal}>
                            Connect Wallet
                        </button>
                    );
                }

                const displayAddress =
                    account.address.slice(0, 6) + '...' + account.address.slice(-4);

                return (
                    <>
                        <button className="wallet-button" onClick={handleModalOpen}>
                            {displayAddress}
                        </button>

                        {modalOpen && (
                            <div className="wallet-modal__overlay" onClick={handleModalClose}>
                                <div className="wallet-modal__content" onClick={(e) => e.stopPropagation()}>
                                    <button className="wallet-modal__close" onClick={handleModalClose}>
                                        &times;
                                    </button>
                                    <h2 className="wallet-modal__title">Wallet Details</h2>
                                    <div className="wallet-modal__info">
                                        <p>
                                            <span className="wallet-modal__label">Address</span>
                                            <span className="wallet-modal__value">{account.address}</span>
                                        </p>
                                        <p>
                                            <span className="wallet-modal__label">Chain</span>
                                            <span className="wallet-modal__value">{chain.name}</span>
                                        </p>
                                    </div>
                                    <button
                                        className="wallet-modal__disconnect"
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
