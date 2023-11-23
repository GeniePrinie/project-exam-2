import { useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap";

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
      >
        <div className="d-flex justify-content-center">
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

export const ModalBookingSuccess = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="border border-dark p-5">
        <p className="text-uppercase mb-5">Thank you for booking this venue!</p>
        <div className="d-flex justify-content-center">
          <button className="btn btn-dark">Back to Home</button>
        </div>
      </div>
    </div>
  );
};

export const ModalCreateVenueSuccess = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="border border-dark p-5">
        <p className="text-uppercase mb-5">New venue has been created!</p>
        <div className="d-flex justify-content-center">
          <button className="btn btn-dark">Ok</button>
        </div>
      </div>
    </div>
  );
};

export const ModalCreateAccountSuccess = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="border border-dark p-5">
        <p className="text-uppercase mb-5">Your account has been created!</p>
        <div className="d-flex justify-content-center">
          <button className="btn btn-dark">Ok</button>
        </div>
      </div>
    </div>
  );
};

export const ModalConfirmSignOut = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="border border-dark p-5">
        <p className="text-uppercase mb-5">Are you sure you want to sign out</p>
        <div className="d-flex justify-content-center">
          <button className="btn me-5">Yes</button>
          <button className="btn btn-dark">No</button>
        </div>
      </div>
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

export const ModalEditAvatar = () => {
  const [show, setShow] = useState(false);
  const [media, setMedia] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onFormSubmit = (e) => {
    e.preventDefault();
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
        className="p-5"
      >
        <div
          className="d-flex justify-content-center border border-dark"
          style={{ borderRadius: "0%" }}
        >
          <div className=" p-5 form-container">
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
              <button className="btn btn-dark" form="editavatarform">
                Update
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
