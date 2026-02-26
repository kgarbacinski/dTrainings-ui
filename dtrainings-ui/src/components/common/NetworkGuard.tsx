import React from 'react';
import { useAccount, useSwitchChain } from 'wagmi';
import networkConfig from '../../constants';
import './NetworkGuard.scss';

interface NetworkGuardProps {
    children: React.ReactNode;
}

const NetworkGuard: React.FC<NetworkGuardProps> = ({ children }) => {
    const { chain } = useAccount();
    const { switchChain } = useSwitchChain();

    if (chain && chain.id !== networkConfig.id) {
        return (
            <div className="network-guard">
                <div className="network-guard__card">
                    <div className="network-guard__icon">&#x26A0;</div>
                    <h2 className="network-guard__title">Wrong Network</h2>
                    <p className="network-guard__message">
                        Please switch to <strong>{networkConfig.name}</strong> to use this application.
                    </p>
                    <button
                        className="network-guard__button"
                        onClick={() => switchChain({ chainId: networkConfig.id })}
                    >
                        Switch to {networkConfig.name}
                    </button>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default NetworkGuard;
