import { useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { putData } from "../../Api/putData";
import { API_BASE_URL } from "../../Utility/constants";
import { loadFromLocalStorage } from "../../Utility/localStorage";

export const ModalEditAvatar = () => {
  const [show, setShow] = useState(false);
  const [media, setMedia] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
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
