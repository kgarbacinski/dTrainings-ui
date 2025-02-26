import env from 'react-dotenv';

import { localNetworkConfig, sepoliaNetworkConfig, mainnetNetworkConfig } from './configs';
import { NetworkConfig } from './types';

export const getNetworkConfig = (envConfig: string): NetworkConfig => {
    switch (envConfig) {
        case 'Local':
            return localNetworkConfig;
        case 'Mainnet':
            return mainnetNetworkConfig;
        case 'Sepolia':
        default:
            return sepoliaNetworkConfig;
    }
};

const networkConfig = getNetworkConfig(env.NETWORK);

export default networkConfig;
