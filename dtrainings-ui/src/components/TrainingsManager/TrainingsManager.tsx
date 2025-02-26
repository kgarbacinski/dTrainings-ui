import React, { useEffect, useState } from 'react';
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

    if (isLoading) return <p>Loading trainings...</p>
    if (isError) return <p>Error loading trainings: {error.message}</p>

    return (
        <>
            <Navbar />
            <ToastContainer />

            <div className="trainings-container">
                <div className="trainings-header">
                    <p>Your trainings</p>
                    <button onClick={openCreateModal} className="create-training-btn">
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
                                    className="delete-btn">
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <CreateTrainingDetailsModal training={selectedTraining} isOpen={isModalOpen} onClose={closeModal} onConfirm={confirmTraining} />
        </>
    );
};

export default TrainingsManager;
