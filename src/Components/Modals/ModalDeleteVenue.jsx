import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { deleteData } from "../../Api/deleteData";
import { API_BASE_URL } from "../../Utility/constants";
import { loadFromLocalStorage } from "../../Utility/localStorage";
import { RouteEnum } from "../../Utility/routes";

export const ModalDeleteVenue = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  let { id } = useParams();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const profile = loadFromLocalStorage("profile");
  const handleDelete = async () => {
    try {
      await deleteData(`${API_BASE_URL}/venues/${id}`);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const redirectPage = () => {
    navigate(`/${RouteEnum.MANAGER_VENUES}/${profile.name}`);
    handleClose();
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
    </div>
  );
};
