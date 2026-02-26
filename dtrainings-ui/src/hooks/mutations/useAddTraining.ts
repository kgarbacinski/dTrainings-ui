import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { useWalletClient } from "wagmi";
import { Hash } from "viem";
import addTrainingContract from "hooks/contracts/trainingsManager";
import { stringToBytes32 } from "utils/converter";
import { TrainingCreateInput } from "interfaces/trainings";


interface MutationResponse {
    hash: Hash;
    value: bigint;
}


const useAddTraining = (options?: UseMutationOptions<MutationResponse, unknown, TrainingCreateInput>): UseMutationResult<MutationResponse, unknown, TrainingCreateInput> => {
    const { data: walletClient } = useWalletClient();

    return useMutation({
        mutationFn: async ({ name, description, durationInMinutes }: TrainingCreateInput) => {
            const trainingInfo = {
                name: stringToBytes32(name),
                description: stringToBytes32(description),
                durationInMinutes: BigInt(durationInMinutes),
                createdAt: BigInt(0)
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
