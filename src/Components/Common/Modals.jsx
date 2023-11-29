import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteEnum } from "../../Utility/routes";
import { loadFromLocalStorage } from "../../Utility/localStorage";

export const ModalCreateVenueSuccess = ({ show, handleClose }) => {
  const navigate = useNavigate();
  const profile = loadFromLocalStorage("profile");
  const navigateToMyVenues = () => {
    navigate(`/${RouteEnum.MANAGER_VENUES}/${profile.name}`);
    handleClose();
  };

  return (
    <div>
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
    </div>
  );
};

export const ModalCreateAccountSuccess = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <button type="submit" className="btn btn-dark my-4" onClick={handleShow}>
        Sign up
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
              Your account has been created!
            </p>
            <div className="d-flex justify-content-center">
              <Link to={`/${RouteEnum.SIGN_IN}`}>
                <button className="btn btn-dark">Ok</button>
              </Link>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const ModalErrorCreateVenue = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="border border-dark p-5">
        <p className="text-uppercase mb-5">
          Invalid inputs. Venue is not created :(
        </p>
        <div className="d-flex justify-content-center">
          <button className="btn me-5">Close</button>
          <button className="btn btn-dark">Try again</button>
        </div>
      </div>
    </div>
  );
};

export const ModalErrorSignIn = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="border border-dark p-5">
        <p className="text-uppercase mb-5">Incorrect email or password</p>
        <div className="d-flex justify-content-center">
          <button className="btn me-5">Close</button>
          <button className="btn btn-dark">Try again</button>
        </div>
      </div>
    </div>
  );
};

export const ModalErrorSignUp = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="border border-dark p-5">
        <p className="text-uppercase mb-5">Invalid email</p>
        <div className="d-flex justify-content-center">
          <button className="btn me-5">Close</button>
          <button className="btn btn-dark">Try again</button>
        </div>
      </div>
    </div>
  );
};
