import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RouteEnum } from "../../Utility/routes";

export const ModalCreateAccountSuccess = ({ show, handleClose }) => {
  const navigate = useNavigate();
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
