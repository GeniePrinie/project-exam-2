import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loadFromLocalStorage } from "../../Utility/localStorage";
import { RouteEnum } from "../../Utility/routes";

export const ModalCreateVenueSuccess = ({ show, handleClose }) => {
  const navigate = useNavigate();
  const profile = loadFromLocalStorage("profile");
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
