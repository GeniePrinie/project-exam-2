import React from "react";
import { Modal } from "react-bootstrap";

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
            <button className="btn me-5" onClick="{closeModal}">
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
