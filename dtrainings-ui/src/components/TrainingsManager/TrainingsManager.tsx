import React, { useState } from 'react';
import './TrainingsManager.scss';
import useAddTraining from "../../hooks/mutations/useAddTraining";

const TrainingsManager = () => {
    const [trainings, setTrainings] = useState([
        {
            id: 1,
            name: 'React Basics',
            description: 'Beginner course on React',
            status: 'Approved',
        },
        {
            id: 2,
            name: 'Solidity 101',
            description: 'Intro to writing smart contracts',
            status: 'Unapproved',
        },
    ]);

    const onError = (error: any) => {
        console.error('Error adding training:', error);
    };
    const onSuccess = (data: any) => {
        console.log('Training added successfully:', data);
    }
    const addTrainingMutation = useAddTraining({ onError, onSuccess });

    const handleDelete = (id: number) => {
        setTrainings((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <div className="trainings-container">
            <div className="trainings-header">
                <h1>Trainings</h1>
                <button onClick={() => addTrainingMutation.mutateAsync({ name: "Test", description: "Test", duration: BigInt(10) })} className="create-training-btn">
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
                    {trainings.map((training) => (
                        <div key={training.id} className="training-card">
                            <h3>{training.name}</h3>
                            <p>{training.description}</p>
                            <span className="status-badge">{training.status}</span>
                            <button
                                onClick={() => handleDelete(training.id)}
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
