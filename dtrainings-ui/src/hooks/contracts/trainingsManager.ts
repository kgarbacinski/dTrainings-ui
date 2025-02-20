import TrainingsManager from "hooks/contracts/abi/TrainingsManager.json";
import env from 'react-dotenv';
import { toChecksumAddress } from '@ethereumjs/util';

interface TrainingInfo {
    name: string;
    description: string;
}

type WriteContract = {
    walletClient: any,
    args: unknown[],
    functionName: string,
}

const addTrainingContract = ({ walletClient, functionName, args }: WriteContract) => {
    return walletClient.writeContract({
        abi: TrainingsManager.abi,
        address: toChecksumAddress(env.TRAININGS_MANAGER_CONTRACT_ADDRESS),
        args: args,
        functionName: functionName,
    }
    )
}

export default addTrainingContract;