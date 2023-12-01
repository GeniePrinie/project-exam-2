import { useState } from "react";
import { Modal } from "react-bootstrap";
import { deleteData } from "../../Api/deleteData";
import { API_BASE_URL } from "../../Utility/constants";
import { ModalErrorCommon } from "./ModalErrorCommon";

/**
 * Component representing a modal for deleting a booking.
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.id - The unique identifier of the booking to be deleted.
 * @returns {JSX.Element} - The rendered ModalDeleteBooking component.
 */
export const ModalDeleteBooking = ({ id }) => {
  const [show, setShow] = useState(false);
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const handleDelete = async () => {
    try {
      await deleteData(`${API_BASE_URL}/bookings/${id}`);
      window.location.reload();
    } catch (error) {
      setErrorMessage(`An error occurred: ${error.message}`);
      setErrorModalIsOpen(true);
    }
    handleClose();
  };

  const closeModal = () => {
    setErrorModalIsOpen(false);
  };

  return (
    <div>
      <button className="btn mt-2" onClick={handleShow}>
        Delete booking
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="border-radius-2"
      >
        <div className="text-center">
          <div className="border border-dark p-5">
            <p className="text-uppercase mb-5">
              Are you sure you want to delete this booking?
            </p>
            <div className="d-flex justify-content-center">
              <button className="btn me-5" onClick={handleDelete}>
                Yes
              </button>
              <button className="btn btn-dark" onClick={handleClose}>
                No
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <ModalErrorCommon
        isOpen={errorModalIsOpen}
        closeModal={closeModal}
        errorMessage={errorMessage}
      />
    </div>
  );
};
