import { useState } from "react";
import { RouteEnum } from "../Utility/routes";
import { Form, InputGroup, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { postData } from "../Api/postData";
import { API_BASE_URL } from "../Utility/constants";
import { ModalCreateVenueSuccess } from "../Components/Modals/ModalCreateVenueSuccess";
import { ModalErrorCreateVenue } from "../Components/Modals/ModalErrorCreateVenue";
import { Helmet } from "react-helmet";

export function ManagerCreateVenuePage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState("");
  const [price, setPrice] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [rating, setRating] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");

  const [wifi, setWifi] = useState("no");
  const [breakfast, setBreakfast] = useState("no");
  const [parking, setParking] = useState("no");
  const [pets, setPets] = useState("no");

  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [maxGuestsError, setMaxGuestsError] = useState("");
  const [ratingError, setRatingError] = useState("");

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

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

    if (media.trim() === "") {
    }

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
    if (
      isNaN(parsedRating) ||
      parsedRating < 0 ||
      parsedRating > 5 ||
      rating.trim() === ""
    ) {
      setRatingError("Please provide a valid rating between 0 and 5");
      isValid = false;
    } else {
      setRatingError("");
    }

    return isValid;
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const apiBody = {
          name: name,
          description: description,
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
        if (media.trim() !== "") {
          apiBody.media = media.split(",").map((url) => url.trim());
        }

        await postData(`${API_BASE_URL}/venues`, apiBody);
        setName("");
        setDescription("");
        setMedia("");
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

        setShowSuccessModal(true);
      } catch (error) {
        setShowErrorModal(true);
      }
    } else {
      setShowErrorModal(true);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Create Venue | Holidaze</title>
        <meta name="description" content="Create a new venue at Holidaze" />
      </Helmet>
      <div className="container">
        <div className="my-3">
          <Link to="/">Holidaze</Link> -{" "}
          <Link
            to={`/${RouteEnum.MANAGER_CREATE_VENUE}`}
            className="text-decoration-underline"
          >
            Create Venue
          </Link>
        </div>
        <h2 className="text-uppercase fs-5 text-center mb-0">
          Have a new amazing venue?
        </h2>
        <h1 className="text-uppercase fs-1 text-center mb-5">
          Create New Venue
        </h1>
        <div className="form-container">
          <Form
            onSubmit={onFormSubmit}
            id="createvenueform"
            style={{
              maxWidth: "750px",
              margin: "0 auto",
            }}
          >
            <Row>
              <Col md={6}>
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
                      placeholder='MEDIA: Separate the links with ","'
                      aria-label="Media for the venue"
                      className="border-dark placeholder-text-dark"
                      style={{
                        borderRadius: "0",
                        paddingLeft: "25px",
                      }}
                    />
                  </InputGroup>
                </div>
                <Row>
                  <Col md={6}>
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
                  </Col>
                  <Col md={6}>
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
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
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
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
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
              </Col>
            </Row>
            <div className="text-center">
              <button type="submit" className="btn btn-dark my-4">
                Create
              </button>
            </div>
            <ModalCreateVenueSuccess
              show={showSuccessModal}
              handleClose={() => setShowSuccessModal(true)}
            />
            <ModalErrorCreateVenue
              show={showErrorModal}
              handleClose={() => setShowErrorModal(false)}
            />
          </Form>
        </div>
      </div>
    </div>
  );
}
