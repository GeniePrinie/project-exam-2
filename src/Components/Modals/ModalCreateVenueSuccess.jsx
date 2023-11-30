import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loadFromLocalStorage } from "../../Utility/localStorage";
import { RouteEnum } from "../../Utility/routes";

/**
 * Component representing a modal for indicating successful venue creation.
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.show - A flag indicating whether the modal should be displayed.
 * @param {Function} props.handleClose - A function to close the modal.
 * @returns {JSX.Element} - The rendered ModalCreateVenueSuccess component.
 */
export const ModalCreateVenueSuccess = ({ show, handleClose }) => {
  // Hook to navigate to a different route
  const navigate = useNavigate();

  // Load user profile from local storage
  const profile = loadFromLocalStorage("profile");

  // Function to navigate to the manager's venues route and close the modal
  const navigateToMyVenues = () => {
    navigate(`/${RouteEnum.MANAGER_VENUES}/${profile.name}`);
    handleClose();
  };

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
          <p className="text-uppercase mb-5">New venue has been created!</p>
          <div className="d-flex justify-content-center">
            <button className="btn btn-dark" onClick={navigateToMyVenues}>
              Ok
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
