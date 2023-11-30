import React from "react";
import { Modal } from "react-bootstrap";

/**
 * Component representing a common error modal.
 * @component
 * @param {Object} props - The properties of the component.
 * @param {boolean} props.isOpen - Flag indicating whether the modal is open.
 * @param {Function} props.closeModal - Function to close the modal.
 * @param {string} props.errorMessage - The error message to display in the modal.
 * @returns {JSX.Element} - The rendered ModalErrorCommon component.
 */
export const ModalErrorCommon = ({ isOpen, closeModal, errorMessage }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Error Modal"
    >
      <div className="d-flex justify-content-center">
        <div className="border border-dark p-5">
          <p className="text-uppercase mb-5">
            <b>Error: </b>
            {errorMessage}
          </p>
          <div className="d-flex justify-content-center">
            <button className="btn me-5" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
