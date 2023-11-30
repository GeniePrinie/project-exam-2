import { useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { putData } from "../../Api/putData";
import { API_BASE_URL } from "../../Utility/constants";
import { loadFromLocalStorage } from "../../Utility/localStorage";
import { ModalErrorCommon } from "./ModalErrorCommon";

/**
 * Component representing a modal for editing the user's avatar.
 * @component
 * @returns {JSX.Element} - The rendered ModalEditAvatar component.
 */
export const ModalEditAvatar = () => {
  // State for controlling the visibility of the modal
  const [show, setShow] = useState(false);

  // State for storing the new media URL
  const [media, setMedia] = useState("");

  // State for tracking the loading state during form submission
  const [loading, setLoading] = useState(false);

  // State for controlling the visibility of the error modal
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);

  // State for storing the error message
  const [errorMessage, setErrorMessage] = useState("");

  // Function to close the edit avatar modal
  const handleClose = () => {
    setShow(false);
  };

  // Function to open the edit avatar modal
  const handleShow = () => {
    setShow(true);
  };

  // Hook from React Router to access URL parameters
  let { id } = useParams();

  // Function to handle form submission for updating the avatar
  const onFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Load the user's profile information from local storage
      const storedProfile = loadFromLocalStorage("profile");

      // Prepare the API request body
      const apiBody = {
        avatar: media,
      };

      // Make a PUT request to update the avatar
      const newAvatar = await putData(
        `${API_BASE_URL}/profiles/${id}/media`,
        apiBody
      );

      // Update the profile with the new avatar URL
      const updatedProfile = { ...storedProfile, avatar: newAvatar.avatar };

      // Save the updated profile to local storage
      localStorage.setItem("profile", JSON.stringify(updatedProfile));

      // Close the edit avatar modal
      handleClose();

      // Reload the page to reflect the changes
      window.location.reload();
    } catch (error) {
      // Set the error message and open the error modal in case of an error
      setErrorMessage(`An error occurred: ${error.message}`);
      setErrorModalIsOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // Function to close the error modal
  const closeModal = () => {
    setErrorModalIsOpen(false);
  };

  return (
    <div>
      <button className="btn bg-dark text-light" onClick={handleShow}>
        Edit Avatar
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="border-radius-2"
      >
        <div className="text-center">
          <div className="border border-dark p-5 form-container">
            <h3 className="text-uppercase mb-5 fs-4 text-center">
              Edit Avatar
            </h3>
            <Form
              onSubmit={onFormSubmit}
              id="editavatarform"
              style={{
                maxWidth: "750px",
                margin: "0 auto",
              }}
            >
              <InputGroup>
                <Form.Control
                  id="media"
                  value={media}
                  onChange={(e) => setMedia(e.target.value)}
                  name="media"
                  type="url"
                  placeholder="MEDIA"
                  aria-label="Media for the Avatar"
                  className="border-dark placeholder-text-dark mb-5"
                  style={{
                    borderRadius: "0",
                    paddingLeft: "25px",
                  }}
                />
              </InputGroup>
            </Form>
            <div className="d-flex justify-content-center">
              <button className="btn me-5" onClick={handleClose}>
                Cancel
              </button>
              <button
                className="btn btn-dark"
                form="editavatarform"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
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
