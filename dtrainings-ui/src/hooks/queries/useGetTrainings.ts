import { useQuery } from '@tanstack/react-query';
import { usePublicClient } from "wagmi";
import networkConfig from "../../constants";
import { TrainingInfo } from "interfaces/trainings";
import { readTrainingsForUser } from "hooks/contracts/trainingsManager";
import { bytes32ToString } from "../../utils/converter";

export const useGetTrainingsForUser = (args: unknown[]) => {
    const publicClient = usePublicClient({ chainId: networkConfig.id });

    return useQuery<TrainingInfo[], any>({
        queryFn: () =>
            readTrainingsForUser({
                publicClient: publicClient!,
                functionName: 'getTrainings',
                args: args
            }),
        queryKey: ['getTrainings'],
        select: (response) =>
            response.map(training => ({
                ...training,
                name: bytes32ToString(training.name),
                description: bytes32ToString(training.description),
            })),
    });
}