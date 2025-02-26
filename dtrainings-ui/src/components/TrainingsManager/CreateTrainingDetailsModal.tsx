import React, { useState } from "react";
import { TrainingInfo } from "interfaces/trainings";
import "./CreateTrainingDetailsModal.scss";

interface TrainingDetailsModalProps {
    training: TrainingInfo | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (updatedTraining: TrainingInfo) => void;
}


const CreateTrainingDetailsModal: React.FC<TrainingDetailsModalProps> = ({ training, isOpen, onClose, onConfirm }) => {
    const [formData, setFormData] = useState<TrainingInfo>(
        training || {
            name: "",
            description: "",
            durationInMinutes: BigInt(0)
        });

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: name === "durationInMinutes" ? BigInt(value) || BigInt(0) : value,
        }));
    }

    const handleConfirm = () => {
        onConfirm(formData);
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Create Training</h2>

                <label>Title</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter training title"
                />

                <label>Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter training description"
                />

                <label>Duration (minutes)</label>
                <input
                    type="number"
                    name="durationInMinutes"
                    value={formData.durationInMinutes.toString()}
                    onChange={handleChange}
                    placeholder="Enter duration"
                />

                <button onClick={handleConfirm} className="confirm-btn">Confirm</button>
                <button onClick={onClose} className="close-btn">Close</button>
            </div>
        </div>
    );
};

export default CreateTrainingDetailsModal;
