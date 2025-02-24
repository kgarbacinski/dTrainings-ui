import TrainingsManager from "hooks/contracts/abi/TrainingsManager.json";
import env from 'react-dotenv';
import {toChecksumAddress} from '@ethereumjs/util';


type WriteContract = {
    walletClient: any,
    args: unknown[],
    functionName: string,
}

type ReadContract = {
    publicClient: any,
    functionName: string,
    args: unknown[]
}

export const addTrainingContract = ({walletClient, functionName, args}: WriteContract) => {
    return walletClient.writeContract({
            abi: TrainingsManager.abi,
            address: toChecksumAddress(env.TRAININGS_MANAGER_CONTRACT_ADDRESS),
            args: args,
            functionName: functionName,
        }
    )
}

export const readTrainingsForUser = ({publicClient, functionName, args}: ReadContract) => {
    console.log(publicClient.readContract({
            abi: TrainingsManager.abi,
            address: toChecksumAddress(env.TRAININGS_MANAGER_CONTRACT_ADDRESS),
            args: args,
            functionName: functionName,
        }
    ));

    return publicClient.readContract({
            abi: TrainingsManager.abi,
            address: toChecksumAddress(env.TRAININGS_MANAGER_CONTRACT_ADDRESS),
            args: args,
            functionName: functionName,
        }
    );
}

export default addTrainingContract;