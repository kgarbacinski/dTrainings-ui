import React, {useEffect, useState} from 'react';
import './TrainingsManager.scss';
import useAddTraining from "../../hooks/mutations/useAddTraining";
import {useGetTrainingsForUser} from "../../hooks/queries/useGetTrainings";
import {useAccount} from "wagmi";


const TrainingsManager = () => {
    const { address } = useAccount();
    const onError = (error: any) => {

        console.error('Error adding training:', error);
    };
    const onSuccess = (data: any) => {
        console.log('Training added successfully:', data);
    }

    const addTrainingMutation = useAddTraining({ onError, onSuccess });

    const { data: trainings = [], isLoading, isError, error } = useGetTrainingsForUser([address]);

    const handleDelete = (id: number) => {
        console.log("deleted");
    };

    if (isLoading) return <p>Loading trainings...</p>
    if (isError) return <p>Error loading trainings: {error.message}</p>

    return (
        <div className="trainings-container">
            <div className="trainings-header">
                <h1>Trainings</h1>
                <button onClick={() => addTrainingMutation.mutateAsync({ name: "Test", description: "Test", durationInMinutes: BigInt(10) })} className="create-training-btn">
                    Create Training +
                </button>
            </div>

            {trainings.length === 0 ? (
                <div className="no-trainings">
                    <h2>No trainings found</h2>
                    <p>Click "Create Training" to add a new training session.</p>
                </div>
            ) : (
                <div className="trainings-list">
                    {trainings.map((training, index) => (
                        <div key={index} className="training-card">
                            <h3>{training.name}</h3>
                            <p>{training.description}</p>
                            <span className="status-badge">Done</span>
                            <button
                                onClick={() => handleDelete(index)}
                                className="delete-btn"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TrainingsManager;
