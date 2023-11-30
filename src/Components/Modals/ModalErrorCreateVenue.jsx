import { Modal } from "react-bootstrap";

/**
 * Component representing a modal for indicating an error during venue creation.
 * @component
 * @param {Object} props - The properties of the component.
 * @param {boolean} props.show - Flag indicating whether the modal is visible.
 * @param {Function} props.handleClose - Function to close the modal.
 * @param {Function} props.handleTryAgain - Function to handle the "Try again" action.
 * @returns {JSX.Element} - The rendered ModalErrorCreateVenue component.
 */
export const ModalErrorCreateVenue = ({ show, handleClose }) => {
  return (
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
            Invalid inputs. Venue is not created :(
          </p>
          <div className="d-flex justify-content-center">
            <button className="btn me-5" onClick={handleClose}>
              Close
            </button>
            <button className="btn btn-dark" onClick={handleClose}>
              Try again
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
