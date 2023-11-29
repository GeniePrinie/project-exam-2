import { useEffect, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteEnum } from "../../Utility/routes";
import {
  loadFromLocalStorage,
  removeFromLocalStorage,
} from "../../Utility/localStorage";
import { putData } from "../../Api/putData";
import { API_BASE_URL } from "../../Utility/constants";
import { deleteData } from "../../Api/deleteData";
import { getData } from "../../Api/getData";
import { isValidUrl } from "../../Utility/isValidUrl";

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

export const ModalEditVenue = () => {
  // Modal settings
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  // Venue fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState("");
  const [mediaArray, setMediaArray] = useState([]);
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [wifi, setWifi] = useState("no");
  const [parking, setParking] = useState("no");
  const [breakfast, setBreakfast] = useState("no");
  const [pets, setPets] = useState("no");

  // Errors
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [mediaError, setMediaError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [maxGuestsError, setMaxGuestsError] = useState("");
  const [ratingError, setRatingError] = useState("");

  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const venueData = await getData(
          `${API_BASE_URL}/venues/${id}?_bookings=true`
        );
        setName(venueData.name);
        setDescription(venueData.description);
        setMedia(venueData.media);
        setPrice(venueData.price);
        setRating(venueData.rating);
        setMaxGuests(venueData.maxGuests);
        setAddress(venueData.location.address);
        setCity(venueData.location.city);
        setZip(venueData.location.zip);
        setCountry(venueData.location.country);
        setWifi(venueData.meta.wifi ? "yes" : "no");
        setParking(venueData.meta.parking ? "yes" : "no");
        setBreakfast(venueData.meta.breakfast ? "yes" : "no");
        setPets(venueData.meta.pets ? "yes" : "no");
      } catch (error) {
        console.error("Error fetching venue:", error); // TODO: add error modal
      }
    };

    fetchData();
  }, [id]);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const validateForm = () => {
    let isValid = true;

    if (name.length < 1 && name.trim() === "") {
      setNameError("Please provide the venue's name");
      isValid = false;
    } else {
      setNameError("");
    }

    if (description.length < 1 && description.trim() === "") {
      setDescriptionError("Please provide the venue's description");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    setMediaError("");
    setMediaArray(Array.isArray(media) ? media : media.split(/\s*,\s*/));
    mediaArray.forEach((url) => {
      if (!isValidUrl(url)) {
        setMediaError("Please provide only valid url's");
      }
    });

    if (price.length < 1 && price.trim() === "") {
      setPriceError("Please set the venue's price");
      isValid = false;
    } else {
      setPriceError("");
    }

    const parsedMaxGuests = parseFloat(maxGuests);
    if (
      isNaN(parsedMaxGuests) ||
      parsedMaxGuests <= 0 ||
      parsedMaxGuests > 100
    ) {
      setMaxGuestsError(
        "Please specify a valid number of guests from 1 to 100."
      );
      isValid = false;
    } else {
      setMaxGuestsError("");
    }

    const parsedRating = parseFloat(rating);
    if (isNaN(parsedRating) || parsedRating < 0 || parsedRating > 5) {
      setRatingError("Please provide a valid rating between 0 and 5");
      isValid = false;
    } else {
      setRatingError("");
    }

    return isValid;
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (validateForm()) {
      try {
        const apiBody = {
          name: name,
          description: description,
          media: mediaArray,
          price: parseFloat(price),
          maxGuests: parseFloat(maxGuests),
          rating: parseFloat(rating),
          meta: {
            wifi: wifi === "yes" ? true : false,
            parking: parking === "yes" ? true : false,
            breakfast: breakfast === "yes" ? true : false,
            pets: pets === "yes" ? true : false,
          },
          location: {
            address: address,
            city: city,
            zip: zip,
            country: country,
          },
        };

        await putData(`${API_BASE_URL}/venues/${id}`, apiBody);

        setName("");
        setDescription("");
        setMedia("");
        setMediaArray([]);
        setPrice("");
        setMaxGuests("");
        setRating("");
        setAddress("");
        setCity("");
        setZip("");
        setCountry("");
        setWifi("no");
        setBreakfast("no");
        setParking("no");
        setPets("no");

        handleClose();

        window.location.reload();
      } catch (error) {
        console.error("Error changing avatar: ", error); // TODO: add error modal
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <button className="btn bg-dark text-light me-4" onClick={handleShow}>
        Edit Venue
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
            <h3 className="text-uppercase mb-5 fs-4 text-center">Edit Venue</h3>
            <Form
              onSubmit={onFormSubmit}
              id="editvenueform"
              style={{
                maxWidth: "750px",
                margin: "0 auto",
              }}
            >
              <div className="mb-4">
                <InputGroup>
                  <Form.Control
                    id="venue"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    type="name"
                    placeholder="NAME OF VENUE"
                    aria-label="Name of venue"
                    className="border-dark placeholder-text-dark"
                    style={{
                      borderRadius: "0",
                      paddingLeft: "25px",
                    }}
                  />
                </InputGroup>
                <div className="formError text-primary">
                  <p>{nameError}</p>
                </div>
              </div>
              <div className="mb-4">
                <InputGroup>
                  <Form.Control
                    as="textarea"
                    id="venuedescription"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    name="description"
                    type="name"
                    placeholder="DESCRIPTION"
                    aria-label="Venue's description"
                    className="border-dark placeholder-text-dark"
                    style={{
                      borderRadius: "0",
                      paddingLeft: "25px",
                      height: "100px",
                    }}
                  />
                </InputGroup>
                <div className="formError text-primary">
                  <p>{descriptionError}</p>
                </div>
              </div>
              <div className="mb-4">
                <InputGroup>
                  <Form.Control
                    id="media"
                    value={media}
                    onChange={(e) => setMedia(e.target.value)}
                    name="media"
                    type="url"
                    placeholder="MEDIA"
                    aria-label="Media for the venue"
                    className="border-dark placeholder-text-dark"
                    style={{
                      borderRadius: "0",
                      paddingLeft: "25px",
                    }}
                  />
                </InputGroup>
                <div className="formError text-primary">
                  <p>{mediaError}</p>
                </div>
              </div>

              <div className="mb-4">
                <InputGroup>
                  <Form.Control
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    name="price"
                    type="number"
                    placeholder="PRICE"
                    aria-label="Price"
                    className="border-dark placeholder-text-dark"
                    style={{
                      borderRadius: "0",
                      paddingLeft: "25px",
                    }}
                  />
                </InputGroup>
                <div className="formError text-primary">
                  <p>{priceError}</p>
                </div>
              </div>

              <div className="mb-4">
                <InputGroup>
                  <Form.Control
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    name="rating"
                    type="number"
                    placeholder="RATING"
                    aria-label="Rating"
                    className="border-dark placeholder-text-dark"
                    style={{
                      borderRadius: "0",
                      paddingLeft: "25px",
                    }}
                  />
                </InputGroup>
                <div className="formError text-primary">
                  <p>{ratingError}</p>
                </div>
              </div>

              <div className="mb-4">
                <InputGroup>
                  <Form.Control
                    id="maxguest"
                    value={maxGuests}
                    onChange={(e) => setMaxGuests(e.target.value)}
                    name="maxGuests"
                    type="number"
                    placeholder="MAX GUEST"
                    aria-label="Max guest"
                    className="border-dark placeholder-text-dark"
                    style={{
                      borderRadius: "0",
                      paddingLeft: "25px",
                    }}
                  />
                </InputGroup>
                <div className="formError text-primary">
                  <p>{maxGuestsError}</p>
                </div>
              </div>

              <div className="mb-4">
                <InputGroup>
                  <Form.Control
                    id="streetname"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    name="address"
                    type="name"
                    placeholder="STREET NAME"
                    aria-label="Street name"
                    className="border-dark placeholder-text-dark"
                    style={{
                      borderRadius: "0",
                      paddingLeft: "25px",
                    }}
                  />
                </InputGroup>
              </div>
              <div className="mb-4">
                <InputGroup>
                  <Form.Control
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    name="city"
                    type="name"
                    placeholder="CITY"
                    aria-label="City"
                    className="border-dark placeholder-text-dark"
                    style={{
                      borderRadius: "0",
                      paddingLeft: "25px",
                    }}
                  />
                </InputGroup>
              </div>
              <div className="mb-4">
                <InputGroup>
                  <Form.Control
                    id="Zip"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    name="zip"
                    type="name"
                    placeholder="ZIP"
                    aria-label="Zip"
                    className="border-dark placeholder-text-dark"
                    style={{
                      borderRadius: "0",
                      paddingLeft: "25px",
                    }}
                  />
                </InputGroup>
              </div>
              <div className="mb-4">
                <InputGroup>
                  <Form.Control
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    name="country"
                    type="name"
                    placeholder="COUNTRY"
                    aria-label="Country"
                    className="border-dark placeholder-text-dark"
                    style={{
                      borderRadius: "0",
                      paddingLeft: "25px",
                    }}
                  />
                </InputGroup>
              </div>

              <div className="mb-4">
                <Form.Select
                  value={wifi}
                  name="wifi"
                  onChange={(e) => setWifi(e.target.value)}
                  className="border-dark placeholder-text-dark text-uppercase me-4"
                  style={{
                    borderRadius: "0",
                    paddingLeft: "25px",
                  }}
                >
                  <option value="" disabled>
                    Select one option
                  </option>
                  <option value="yes">Wifi - yes</option>
                  <option value="no">Wifi - no</option>
                </Form.Select>
              </div>
              <div className="mb-4">
                <Form.Select
                  value={parking}
                  name="parking"
                  onChange={(e) => setParking(e.target.value)}
                  className="border-dark placeholder-text-dark text-uppercase me-4"
                  style={{
                    borderRadius: "0",
                    paddingLeft: "25px",
                  }}
                >
                  <option value="" disabled>
                    Select one option
                  </option>
                  <option value="yes">Parking - yes</option>
                  <option value="no">Parking - no</option>
                </Form.Select>
              </div>
              <div className="mb-4">
                <Form.Select
                  value={breakfast}
                  name="breakfast"
                  onChange={(e) => setBreakfast(e.target.value)}
                  className="border-dark placeholder-text-dark text-uppercase me-4"
                  style={{
                    borderRadius: "0",
                    paddingLeft: "25px",
                  }}
                >
                  <option value="" disabled>
                    Select one option
                  </option>
                  <option value="yes">Breakfast - yes</option>
                  <option value="no">Breakfast - no</option>
                </Form.Select>
              </div>
              <div className="mb-4">
                <Form.Select
                  value={pets}
                  name="pets"
                  onChange={(e) => setPets(e.target.value)}
                  className="border-dark placeholder-text-dark text-uppercase"
                  style={{
                    borderRadius: "0",
                    paddingLeft: "25px",
                  }}
                >
                  <option value="" disabled>
                    Select one option
                  </option>
                  <option value="yes">Pets - yes</option>
                  <option value="no">Pets - no</option>
                </Form.Select>
              </div>
            </Form>
            <div className="d-flex justify-content-center">
              <button className="btn me-5" onClick={handleClose}>
                Cancel
              </button>
              <button
                className="btn btn-dark"
                form="editvenueform"
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
