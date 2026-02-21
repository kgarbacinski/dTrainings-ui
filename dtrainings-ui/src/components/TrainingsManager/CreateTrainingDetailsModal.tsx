import React, { useState, useEffect } from "react";
import { TrainingInfo } from "interfaces/trainings";
import "./CreateTrainingDetailsModal.scss";

interface TrainingDetailsModalProps {
    training: TrainingInfo | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (updatedTraining: TrainingInfo) => void;
}

const CreateTrainingDetailsModal: React.FC<TrainingDetailsModalProps> = ({ training, isOpen, onClose, onConfirm }) => {
    const [formData, setFormData] = useState<TrainingInfo>({
        name: "",
        description: "",
        durationInMinutes: BigInt(0)
    });

    useEffect(() => {
        if (isOpen) {
            setFormData(training || { name: "", description: "", durationInMinutes: BigInt(0) });
        }
    }, [isOpen, training]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: name === "durationInMinutes" ? BigInt(value) || BigInt(0) : value,
        }));
    }

    const isValid = formData.name.trim() !== "" &&
        formData.description.trim() !== "" &&
        formData.durationInMinutes > BigInt(0);

    const handleConfirm = () => {
        if (isValid) {
            onConfirm(formData);
        }
    }

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="training-modal__overlay" onClick={handleOverlayClick}>
            <div className="training-modal__content">
                <button className="training-modal__close" onClick={onClose}>&times;</button>
                <h2 className="training-modal__title">Create Training</h2>

                <div className="training-modal__field">
                    <label htmlFor="training-name" className="training-modal__label">Title</label>
                    <input
                        id="training-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter training title"
                        className="training-modal__input"
                    />
                </div>

                <div className="training-modal__field">
                    <label htmlFor="training-description" className="training-modal__label">Description</label>
                    <textarea
                        id="training-description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter training description"
                        className="training-modal__textarea"
                    />
                </div>

                <div className="training-modal__field">
                    <label htmlFor="training-duration" className="training-modal__label">Duration (minutes)</label>
                    <input
                        id="training-duration"
                        type="number"
                        name="durationInMinutes"
                        value={formData.durationInMinutes.toString()}
                        onChange={handleChange}
                        placeholder="Enter duration"
                        className="training-modal__input"
                    />
                </div>

                <div className="training-modal__actions">
                    <button onClick={handleConfirm} disabled={!isValid} className="training-modal__confirm">
                        Confirm
                    </button>
                    <button onClick={onClose} className="training-modal__cancel">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default CreateTrainingDetailsModal;
