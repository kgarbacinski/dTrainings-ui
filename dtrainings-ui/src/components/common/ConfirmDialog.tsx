import React from 'react';
import './ConfirmDialog.scss';

interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onCancel();
        }
    };

    return (
        <div className="confirm-dialog__overlay" onClick={handleOverlayClick}>
            <div className="confirm-dialog__content">
                <h3 className="confirm-dialog__title">{title}</h3>
                <p className="confirm-dialog__message">{message}</p>
                <div className="confirm-dialog__actions">
                    <button onClick={onConfirm} className="confirm-dialog__confirm">
                        Confirm
                    </button>
                    <button onClick={onCancel} className="confirm-dialog__cancel">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
