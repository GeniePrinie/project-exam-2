import { useState } from "react";
import { Modal } from "react-bootstrap";
import { deleteData } from "../../Api/deleteData";
import { API_BASE_URL } from "../../Utility/constants";

export const ModalDeleteBooking = ({ id }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async () => {
    try {
      await deleteData(`${API_BASE_URL}/bookings/${id}`);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting data:", error);
    }

    handleClose();
  };

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
              <button className="btn me-5" onClick={handleDelete}>
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
