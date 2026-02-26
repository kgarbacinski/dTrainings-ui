import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { useWalletClient } from "wagmi";
import { Hash } from "viem";
import addTrainingContract from "hooks/contracts/trainingsManager";
import { stringToBytes32 } from "utils/converter";


interface MutationResponse {
    hash: Hash;
}


const useDeleteTraining = (options?: UseMutationOptions<MutationResponse, unknown, string>): UseMutationResult<MutationResponse, unknown, string> => {
    const { data: walletClient } = useWalletClient();

    return useMutation({
        mutationFn: async (name: string) => {
            const bytes32Name = stringToBytes32(name);

            return addTrainingContract({
                walletClient: walletClient!,
                functionName: 'deleteTraining',
                args: [bytes32Name]
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

export default useDeleteTraining;
