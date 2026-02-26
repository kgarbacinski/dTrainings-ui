export interface TrainingInfo {
    name: string;
    description: string;
    durationInMinutes: bigint;
    createdAt: bigint;
}

export interface TrainingCreateInput {
    name: string;
    description: string;
    durationInMinutes: bigint;
}

export interface TrainingUpdateInput {
    name: string;
    newDescription: string;
    newDurationInMinutes: bigint;
}
