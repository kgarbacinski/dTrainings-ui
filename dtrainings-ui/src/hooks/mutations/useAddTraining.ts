import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { useWalletClient } from "wagmi";
import { Hash } from "viem";
import addTrainingContract from "hooks/contracts/trainingsManager";
import { stringToBytes32 } from "utils/converter";
import { TrainingInfo } from "interfaces/trainings";


interface MutationResponse {
    hash: Hash;
    value: bigint;
}


const useAddTraining = (options?: UseMutationOptions<MutationResponse, unknown, TrainingInfo>): UseMutationResult<MutationResponse, unknown, TrainingInfo> => {
    const { data: walletClient } = useWalletClient();

    return useMutation({
        mutationFn: async ({ name, description, durationInMinutes }: TrainingInfo) => {
            const trainingInfo = {
                name: stringToBytes32(name),
                description: stringToBytes32(description),
                durationInMinutes: BigInt(durationInMinutes)
            }

            return addTrainingContract({
                walletClient: walletClient!,
                functionName: 'addTraining',
                args: [trainingInfo]
            }).then((data: any) => ({
                hash: data,
                durationInMinutes,
            })).catch((error: any) => {
                console.log("ERROR", error);
            });
        },
        ...options,
    });
};

export default useAddTraining;