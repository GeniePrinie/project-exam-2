import { useState } from "react";
import { RouteEnum } from "../Utility/routes";
import { Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_BASE_URL, DEFAULT_AVATAR } from "../Utility/constants";
import { postData } from "../Api/postData";
import { ModalCreateAccountSuccess } from "../Components/Modals/ModalCreateAccountSuccess";
import { ModalErrorSignUp } from "../Components/Modals/ModalErrorSignUp";
import { Helmet } from "react-helmet";

/**
 * SignUpPage Component
 * This component represents the sign-up page of the Holidaze application.
 * It allows users to register by providing their name, email, password, avatar URL, and user type.
 * Upon successful registration, users are redirected to a success modal.
 * @component
 * @returns {JSX.Element} - Returns the JSX element representing the SignUpPage.
 */
export function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [venueManager, setVenueManager] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [avatarError, setAvatarError] = useState("");
  const [venueManagerError, setVenueManagerError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const validateForm = () => {
    let isValid = true;

    if (name.length < 3) {
      setNameError("Name must be at least 3 characters");
      isValid = false;
    } else {
      setNameError("");
    }

    const emailPattern = /^[\w\-.]+@stud\.?noroff\.no$/;
    if (!email.match(emailPattern)) {
      setEmailError("Only @stud.noroff.no domains are allowed");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    const isValidURL = (url) => {
      try {
        new URL(url);
        return true;
      } catch (error) {
        return false;
      }
    };

    if (!isValidURL(avatar) && avatar !== "") {
      setAvatarError("Must be a valid link");
      isValid = false;
    } else {
      setAvatarError("");
    }

    if (venueManager === "") {
      setVenueManagerError("Please select a user type");
      isValid = false;
    } else {
      setVenueManagerError("");
    }

    return isValid;
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const apiBody = {
          name: name,
          email: email,
          password: password,
          avatar:
            avatar === "" || avatar === undefined ? DEFAULT_AVATAR : avatar,
          venueManager: venueManager === "venue-manager" ? true : false,
        };

        await postData(`${API_BASE_URL}/auth/register`, apiBody);

        setName("");
        setEmail("");
        setPassword("");
        setAvatar("");
        setVenueManager("customer");
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
        <title>Sign Up | Holidaze</title>
        <meta name="description" content="Sign up page of Holidaze" />
      </Helmet>
      <div className="container">
        <div className="my-3">
          <Link to="/">Holidaze</Link> -{" "}
          <Link
            to={`/${RouteEnum.SIGN_UP}`}
            className="text-decoration-underline"
          >
            Sign Up
          </Link>
        </div>
        <h2 className="text-uppercase fs-5 text-center mb-0">New in town?</h2>
        <h1 className="text-uppercase fs-1 text-center mb-5">Sign up</h1>
        <div className="form-container">
          <Form
            onSubmit={onFormSubmit}
            id="signinform"
            style={{
              maxWidth: "450px",
              margin: "0 auto",
            }}
          >
            <div className="mb-4">
              <InputGroup>
                <Form.Control
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  value={name}
                  name="name"
                  type="name"
                  placeholder="NAME"
                  aria-label="Name"
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
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  value={email}
                  name="email"
                  type="email"
                  placeholder="EMAIL"
                  aria-label="Email"
                  className="border-dark placeholder-text-dark"
                  style={{
                    borderRadius: "0",
                    paddingLeft: "25px",
                  }}
                />
              </InputGroup>
              <div className="formError text-primary">
                <p>{emailError}</p>
              </div>
            </div>
            <div className="mb-4">
              <InputGroup>
                <Form.Control
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  value={password}
                  name="password"
                  type="password"
                  placeholder="PASSWORD"
                  aria-label="Password"
                  className="border-dark placeholder-text-dark"
                  style={{
                    borderRadius: "0",
                    paddingLeft: "25px",
                  }}
                />
              </InputGroup>
              <div className="formError text-primary">
                <p>{passwordError}</p>
              </div>
            </div>
            <div className="mb-4">
              <InputGroup>
                <Form.Control
                  onChange={(e) => setAvatar(e.target.value)}
                  id="avatar"
                  value={avatar}
                  name="avatar"
                  type="url"
                  placeholder="AVATAR URL"
                  aria-label="Avatar url"
                  className="border-dark placeholder-text-dark"
                  style={{
                    borderRadius: "0",
                    paddingLeft: "25px",
                  }}
                />
              </InputGroup>
              <div className="formError text-primary">
                <p>{avatarError}</p>
              </div>
            </div>
            <div className="mb-4">
              <Form.Select
                value={venueManager}
                onChange={(e) => setVenueManager(e.target.value)}
                className="border-dark placeholder-text-dark text-uppercase"
                style={{
                  borderRadius: "0",
                  paddingLeft: "25px",
                }}
              >
                <option value="" disabled>
                  Select user type
                </option>
                <option value="customer">Customer</option>
                <option value="venue-manager">Venue Manager</option>
              </Form.Select>
              {venueManagerError && (
                <div className="formError text-primary">
                  <p>{venueManagerError}</p>
                </div>
              )}
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-dark my-4">
                Sign up
              </button>
            </div>
            <ModalCreateAccountSuccess
              show={showSuccessModal}
              handleClose={() => setShowSuccessModal(true)}
            />
            <ModalErrorSignUp
              show={showErrorModal}
              handleClose={() => setShowErrorModal(false)}
            />
          </Form>
        </div>
      </div>
    </div>
  );
}
