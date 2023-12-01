import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { removeFromLocalStorage } from "../../Utility/localStorage";

/**
 * Component representing a modal for confirming sign-out action.
 * @component
 * @returns {JSX.Element} - The rendered ModalConfirmSignOut component.
 */
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
