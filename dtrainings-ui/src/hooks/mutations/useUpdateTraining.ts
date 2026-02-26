import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { useWalletClient } from "wagmi";
import { Hash } from "viem";
import addTrainingContract from "hooks/contracts/trainingsManager";
import { stringToBytes32 } from "utils/converter";
import { TrainingUpdateInput } from "interfaces/trainings";


interface MutationResponse {
    hash: Hash;
}


const useUpdateTraining = (options?: UseMutationOptions<MutationResponse, unknown, TrainingUpdateInput>): UseMutationResult<MutationResponse, unknown, TrainingUpdateInput> => {
    const { data: walletClient } = useWalletClient();

    return useMutation({
        mutationFn: async ({ name, newDescription, newDurationInMinutes }: TrainingUpdateInput) => {
            const bytes32Name = stringToBytes32(name);
            const bytes32Desc = stringToBytes32(newDescription);

            return addTrainingContract({
                walletClient: walletClient!,
                functionName: 'updateTraining',
                args: [bytes32Name, bytes32Desc, BigInt(newDurationInMinutes)]
            }).then((data: any) => ({
                hash: data,
            })).catch((error: any) => {
                console.log("ERROR", error);
                throw error;
            });
        },
        ...options,
    });
};

export default useUpdateTraining;
