import { useState } from "react";
import { Form, InputGroup, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../Utility/constants";
import { loadFromLocalStorage } from "../Utility/localStorage";

export function CreateVenuePage() {
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

  const navigate = useNavigate();

  const createVenue = async (venueData) => {
    const apiUrl = `${API_BASE_URL}/venues`;

    try {
      const authToken = loadFromLocalStorage("token");
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(venueData),
      });

      if (!response.ok) {
        throw new Error("Venue creation failed");
      }

      return response.json();
    } catch (error) {
      console.error("Error creating venue:", error);
      throw error;
    }
  };

  const validateForm = (formData) => {
    return (
      formData.name.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.media.trim() !== "" &&
      formData.price.trim() !== "" &&
      formData.maxGuests.trim() !== "" &&
      formData.address.trim() !== "" &&
      formData.city.trim() !== "" &&
      formData.zip.trim() !== "" &&
      formData.country.trim() !== ""
    );
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: name,
      description: description,
      media: media,
      price: price,
      maxGuests: maxGuests,
      rating: rating,
      address: address,
      city: city,
      zip: zip,
      country: country,
      wifi: wifi === "wifi" ? true : false,
      breakfast: breakfast === "breakfast" ? true : false,
      parking: parking === "parking" ? true : false,
      pets: pets === "pets" ? true : false,
    };

    console.log("Form Data:", formData);

    if (validateForm(formData)) {
      try {
        await createVenue(formData);
        console.log("Venue created successfully!");

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

        navigate("/venue");
      } catch (error) {
        console.error("Error creating venue:", error);
        /// TODO: Add modal here
      }
    } else {
      console.log("Invalid Form Data");
    }
  };

  return (
    <div className="container">
      {" "}
      <div className="my-3">
        <Link to="/">Holidaze</Link> -{" "}
        <Link to="/createvenue" className="text-decoration-underline">
          Create Venue
        </Link>
      </div>
      <h2 className="text-uppercase fs-5 text-center mb-0">
        Have a new amazing venue?
      </h2>
      <h1 className="text-uppercase fs-1 text-center mb-5">Create New Venue</h1>
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
                    name="venue"
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
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-4">
                <InputGroup>
                  <Form.Control
                    id="streetname"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    name="venue"
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
                    name="maxguest"
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
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="mb-4">
                <Form.Select
                  value={wifi}
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
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-dark my-4">
              Create
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
