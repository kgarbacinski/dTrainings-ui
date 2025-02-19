import React, { useState } from 'react';
import './TrainingsManager.scss';

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

    const handleCreate = () => {
        alert('Create Training clicked (implement your own logic here).');
    };

    const handleDelete = (id: number) => {
        setTrainings((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <div className="trainings-container">
            <div className="trainings-header">
                <h1>Trainings</h1>
                <button onClick={handleCreate} className="create-training-btn">
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
