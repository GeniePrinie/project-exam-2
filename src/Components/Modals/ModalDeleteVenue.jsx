import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { deleteData } from "../../Api/deleteData";
import { API_BASE_URL } from "../../Utility/constants";
import { loadFromLocalStorage } from "../../Utility/localStorage";
import { RouteEnum } from "../../Utility/routes";
import { ModalErrorCommon } from "./ModalErrorCommon";

/**
 * Component representing a modal for deleting a venue.
 * @component
 * @returns {JSX.Element} - The rendered ModalDeleteVenue component.
 */
export const ModalDeleteVenue = () => {
  // State for controlling the visibility of the modal
  const [show, setShow] = useState(false);

  // State for controlling the visibility of the error modal
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);

  // State for storing the error message
  const [errorMessage, setErrorMessage] = useState("");

  // Hook from React Router to navigate to different pages
  const navigate = useNavigate();

  // Hook from React Router to access URL parameters
  let { id } = useParams();

  // Function to close the delete confirmation modal
  const handleClose = () => setShow(false);

  // Function to open the delete confirmation modal
  const handleShow = () => setShow(true);

  // Get the profile information from local storage
  const profile = loadFromLocalStorage("profile");

  // Function to handle the deletion of the venue
  const handleDelete = async () => {
    try {
      // Send a request to delete the venue
      await deleteData(`${API_BASE_URL}/venues/${id}`);
    } catch (error) {
      // Set the error message and open the error modal in case of an error
      setErrorMessage(`An error occurred: ${error.message}`);
      setErrorModalIsOpen(true);
    }
  };

  // Function to redirect to the manager's venues page after deletion
  const redirectPage = () => {
    // Navigate to the manager's venues page
    navigate(`/${RouteEnum.MANAGER_VENUES}/${profile.name}`);

    // Close the delete confirmation modal
    handleClose();
  };

  // Function to close the error modal
  const closeModal = () => {
    setErrorModalIsOpen(false);
  };

  return (
    <div>
      <button className="btn" onClick={handleShow}>
        Delete Venue
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="border-radius-2"
      >
        <div className="d-flex justify-content-center">
          <div className="border border-dark p-5">
            <p className="text-uppercase mb-5">
              Are you sure you want to delete this venue?
            </p>
            <div className="d-flex justify-content-center">
              <button
                className="btn me-5"
                onClick={() => {
                  handleDelete();
                  redirectPage();
                }}
              >
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
