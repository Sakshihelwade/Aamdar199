import React from 'react';
import Modal from 'react-modal';

// Set the app element for accessibility
Modal.setAppElement('#root');

const ConfirmationModal = ({ isOpen, onRequestClose, onConfirm }) => {
    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onRequestClose} 
            contentLabel="Confirmation"
            className="modal"
            overlayClassName="overlay"
        >
            <h2>तुम्ही खरंच हटवू इच्छिता का?</h2>
            <div className="flex justify-end">
                <button className="bg-green-500 text-white px-4 py-2 mr-2" onClick={onConfirm}>
                    होय
                </button>
                <button className="bg-red-500 text-white px-4 py-2" onClick={onRequestClose}>
                    नाही
                </button>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;
