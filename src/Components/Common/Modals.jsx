import { useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteEnum } from "../../Utility/routes";
import {
  loadFromLocalStorage,
  removeFromLocalStorage,
} from "../../Utility/localStorage";
import { putData } from "../../Api/putData";
import { API_BASE_URL } from "../../Utility/constants";

export const ModalDeleteBooking = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
              <button className="btn me-5">Yes</button>
              <button className="btn btn-dark" onClick={handleClose}>
                No
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const ModalDeleteVenue = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="border border-dark p-5">
        <p className="text-uppercase mb-5">
          Are you sure you want to delete this venue?
        </p>
        <div className="d-flex justify-content-center">
          <button className="btn me-5">Yes</button>
          <button className="btn btn-dark">No</button>
        </div>
      </div>
    </div>
  );
};

export const ModalCreateVenueSuccess = ({ show, handleClose, id }) => {
  const navigate = useNavigate();
  const navigateToMyVenues = () => {
    navigate(`/${RouteEnum.MANAGER_VENUES}/${id}`);
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

//ModalConfirmSignOut - DONE
export const ModalConfirmSignOut = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Link onClick={handleShow}>Sign out</Link>

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
              Are you sure you want to sign out
            </p>
            <div className="d-flex justify-content-center">
              <button
                className="btn me-5"
                onClick={() => removeFromLocalStorage()}
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

//ModalEditAvatar - DONE
export const ModalEditAvatar = () => {
  const [show, setShow] = useState(false);
  const [media, setMedia] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClose = () => {
    setShow(false);
    setError(null);
  };

  const handleShow = () => {
    setShow(true);
    setError(null);
  };

  let { id } = useParams();

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const storedProfile = loadFromLocalStorage("profile");

      const apiBody = {
        avatar: media,
      };

      const newAvatar = await putData(
        `${API_BASE_URL}/profiles/${id}/media`,
        apiBody
      );

      const updatedProfile = { ...storedProfile, avatar: newAvatar.avatar };
      localStorage.setItem("profile", JSON.stringify(updatedProfile));
      handleClose();

      window.location.reload();
    } catch (error) {
      console.error("Error changing avatar: ", error); // TODO: add error modal
    } finally {
      setLoading(false);
    }
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
    </div>
  );
};
