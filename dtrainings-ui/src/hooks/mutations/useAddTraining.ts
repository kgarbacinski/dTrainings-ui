import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { useWalletClient } from "wagmi";
import { Hash } from "viem";
import addTrainingContract from "hooks/contracts/trainingsManager";
import { stringToBytes32 } from "utils/converter";

interface TrainingInfo {
    name: string;
    description: string;
    duration: bigint;
}

interface MutationResponse {
    hash: Hash;
    value: bigint;
}


const useAddTraining = (options?: UseMutationOptions<MutationResponse, unknown, TrainingInfo>): UseMutationResult<MutationResponse, unknown, TrainingInfo> => {
    const { data: walletClient } = useWalletClient();

    return useMutation({
        mutationFn: async ({ name, description, duration }: TrainingInfo) => {
            const trainingInfo = {
                name: stringToBytes32(name),
                description: stringToBytes32(description),
                durationInMinutes: BigInt(duration)
            }

            return addTrainingContract({
                walletClient: walletClient!,
                functionName: 'addTraining',
                args: [trainingInfo]
            }).then((data: any) => ({
                hash: data,
                duration,
            }));
        },
        ...options,
    });
};

export default useAddTraining;