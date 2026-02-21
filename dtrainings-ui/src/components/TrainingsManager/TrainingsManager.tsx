import React, { useState } from 'react';
import './TrainingsManager.scss';
import useAddTraining from "../../hooks/mutations/useAddTraining";
import { useGetTrainingsForUser } from "../../hooks/queries/useGetTrainings";
import { useAccount } from "wagmi";
import Navbar from "../Navbar/Navbar";
import CreateTrainingDetailsModal from "./CreateTrainingDetailsModal";
import { TrainingInfo } from "interfaces/trainings";
import { toast, ToastContainer } from "react-toastify";

const TrainingsManager = () => {
    const [selectedTraining, setSelectedTraining] = useState<TrainingInfo | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTraining(null);
    }

    const openCreateModal = () => {
        setSelectedTraining({ name: "", description: "", durationInMinutes: BigInt(0) });
        setIsModalOpen(true);
    };

    const confirmTraining = async (newTraining: TrainingInfo) => {
        if (newTraining) {
            await addTrainingMutation.mutateAsync(newTraining);
        }
        closeModal();
    };

    const { address } = useAccount();

    const onError = (error: any) => {
        toast("Error adding training", { type: "error" });
    };
    const onSuccess = (data: any) => {
        toast("Training added successfully. " +
            "It may take a while to process the transaction on the blockchain.", { type: "success" });
    }

    const addTrainingMutation = useAddTraining({ onError, onSuccess });

    const { data: trainings = [], isLoading, isError, error } = useGetTrainingsForUser([address]);

    const handleDelete = (id: number) => {
        console.log("deleted");
    };

    if (isLoading) return (
        <div className="trainings-page">
            <Navbar />
            <div className="trainings-loading">
                <div className="trainings-spinner" />
                <p>Loading trainings...</p>
            </div>
        </div>
    );

    if (isError) return (
        <div className="trainings-page">
            <Navbar />
            <div className="trainings-error">
                <p>Failed to load trainings</p>
                <p className="trainings-error__message">{error.message}</p>
            </div>
        </div>
    );

    return (
        <div className="trainings-page">
            <Navbar />
            <ToastContainer />

            <div className="trainings-container">
                <div className="trainings-header">
                    <h1>Your Trainings</h1>
                    <button onClick={openCreateModal} className="create-training-btn">
                        + Create Training
                    </button>
                </div>

                {trainings.length === 0 ? (
                    <div className="no-trainings">
                        <div className="no-trainings__icon">&#x1F3CB;</div>
                        <h2>No trainings yet</h2>
                        <p>Start tracking your workouts by creating your first training session.</p>
                        <button onClick={openCreateModal} className="create-training-btn">
                            + Create Training
                        </button>
                    </div>
                ) : (
                    <div className="trainings-list">
                        {trainings.map((training, index) => (
                            <div key={index} className="training-card">
                                <div className="training-card__header">
                                    <h3 className="training-card__title">{training.name}</h3>
                                    <span className="training-card__duration">
                                        {training.durationInMinutes.toString()} min
                                    </span>
                                </div>
                                <p className="training-card__description">{training.description}</p>
                                <div className="training-card__footer">
                                    <span className="status-badge">Done</span>
                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="delete-btn">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <CreateTrainingDetailsModal training={selectedTraining} isOpen={isModalOpen} onClose={closeModal} onConfirm={confirmTraining} />
        </div>
    );
};

export default TrainingsManager;
