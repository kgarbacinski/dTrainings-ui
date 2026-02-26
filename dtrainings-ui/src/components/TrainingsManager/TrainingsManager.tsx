import React, { useState } from 'react';
import './TrainingsManager.scss';
import useAddTraining from "../../hooks/mutations/useAddTraining";
import useDeleteTraining from "../../hooks/mutations/useDeleteTraining";
import { useGetTrainingsForUser } from "../../hooks/queries/useGetTrainings";
import { useAccount } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import Navbar from "../Navbar/Navbar";
import CreateTrainingDetailsModal from "./CreateTrainingDetailsModal";
import ConfirmDialog from "../common/ConfirmDialog";
import NetworkGuard from "../common/NetworkGuard";
import { TrainingInfo } from "interfaces/trainings";
import { toast, ToastContainer } from "react-toastify";

const TrainingsManager = () => {
    const [selectedTraining, setSelectedTraining] = useState<TrainingInfo | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const queryClient = useQueryClient();

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

    const deleteTrainingMutation = useDeleteTraining({
        onError: () => {
            toast("Error deleting training", { type: "error" });
        },
        onSuccess: () => {
            toast("Training deleted. It may take a while to process on the blockchain.", { type: "success" });
            queryClient.invalidateQueries({ queryKey: ['getTrainings'] });
        },
    });

    const { data: trainings = [], isLoading, isError, error } = useGetTrainingsForUser([address]);

    const handleDelete = (name: string) => {
        setDeleteTarget(name);
    };

    const confirmDelete = async () => {
        if (deleteTarget) {
            await deleteTrainingMutation.mutateAsync(deleteTarget);
            setDeleteTarget(null);
        }
    };

    const filteredTrainings = trainings.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

            <NetworkGuard>
                <div className="trainings-container">
                    <div className="trainings-header">
                        <h1>Your Trainings</h1>
                        <div className="trainings-header__actions">
                            <input
                                type="text"
                                className="trainings-search"
                                placeholder="Search trainings..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button onClick={openCreateModal} className="create-training-btn">
                                + Create Training
                            </button>
                        </div>
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
                            {filteredTrainings.map((training, index) => (
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
                                            onClick={() => handleDelete(training.name)}
                                            className="delete-btn">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </NetworkGuard>

            <ConfirmDialog
                isOpen={deleteTarget !== null}
                title="Delete Training"
                message={`Are you sure you want to delete "${deleteTarget}"? This action cannot be undone.`}
                onConfirm={confirmDelete}
                onCancel={() => setDeleteTarget(null)}
            />

            <CreateTrainingDetailsModal training={selectedTraining} isOpen={isModalOpen} onClose={closeModal} onConfirm={confirmTraining} />
        </div>
    );
};

export default TrainingsManager;
