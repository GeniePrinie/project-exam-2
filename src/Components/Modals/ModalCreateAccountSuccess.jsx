import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RouteEnum } from "../../Utility/routes";

/**
 * Component representing a modal for indicating successful account creation.
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.show - A flag indicating whether the modal should be displayed.
 * @param {Function} props.handleClose - A function to close the modal.
 * @returns {JSX.Element} - The rendered ModalCreateAccountSuccess component.
 */
export const ModalCreateAccountSuccess = ({ show, handleClose }) => {
  // Hook to navigate to a different route
  const navigate = useNavigate();

  // Function to navigate to the sign-in route and close the modal
  const navigateToSignIn = () => {
    navigate(`/${RouteEnum.SIGN_IN}`);
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
          <p className="text-uppercase mb-5">Your account has been created!</p>
          <div className="d-flex justify-content-center">
            <button className="btn btn-dark" onClick={navigateToSignIn}>
              Ok
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
