import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

export function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userType, setUserType] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [avatarError, setAvatarError] = useState("");
  const [userTypeError, setUserTypeError] = useState("");

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

    if (password.length < 3) {
      setPasswordError("Password must be at least 3 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    const avatarPattern =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;
    if (!avatar.match(avatarPattern)) {
      setAvatarError("Must be a valid link");
      isValid = false;
    } else {
      setAvatarError("");
    }

    if (userType === "") {
      setUserTypeError("Please select a user type");
      isValid = false;
    } else {
      setUserTypeError("");
    }

    return isValid;
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = {
        name,
        email,
        password,
        avatar,
        userType,
      };
      console.log("Valid submitted Form Data:", formData);

      setName("");
      setEmail("");
      setPassword("");
      setAvatar("");
      setUserType("customer");
    } else {
      console.log("Invalid Form Data");
    }
  };

  return (
    <div className="container">
      <div className="my-3">
        <Link to="/">Holidaze</Link> -{" "}
        <Link to="/signin" className="text-decoration-underline">
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
            <div className="formError text-primary" id="textMessageError">
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
            <div className="formError text-primary" id="textMessageError">
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
            <div className="formError text-primary" id="textMessageError">
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
            <div className="formError text-primary" id="textMessageError">
              <p>{avatarError}</p>
            </div>
          </div>

          <div className="mb-4">
            <Form.Select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
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
            {userTypeError && (
              <div className="formError text-primary" id="userTypeError">
                <p>{userTypeError}</p>
              </div>
            )}
          </div>

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-dark my-4">
              Sign up
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
