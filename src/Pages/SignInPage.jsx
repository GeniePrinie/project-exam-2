import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteEnum } from "../Utility/routes";
import { signInUser } from "../Authentication/signInUser";

export function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;

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
    return isValid;
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      signInUser({
        email: email,
        password: password,
      })
        .then((profile) => {
          setEmail("");
          setPassword("");

          if (profile.venueManager)
            navigate(`/${RouteEnum.MANAGER_PROFILE}/${profile.name}`);
          else navigate(`/${RouteEnum.CUSTOMER_PROFILE}/${profile.name}`);
        })
        .catch((error) => {
          console.log(error);
          /// TODO: Add modal here
        });
    } else {
      console.log("Invalid Form Data");
    }
  };

  return (
    <div className="container">
      <div className="my-3">
        <Link to="/">Holidaze</Link> -{" "}
        <Link
          to={`/${RouteEnum.SIGN_IN}`}
          className="text-decoration-underline"
        >
          Sign In
        </Link>
      </div>
      <h2 className="text-uppercase fs-5 text-center mb-0">
        Already have an account?
      </h2>
      <h1 className="text-uppercase fs-1 text-center mb-5">Sign in</h1>
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
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-dark my-4">
              Sign in
            </button>
          </div>
        </Form>
      </div>
      <div className="text-center mt-4 mb-5">OR</div>
      <Link to={`/${RouteEnum.SIGN_UP}`} className="text-decoration-underline">
        {" "}
        <div className="text-center mt-5">Sign Up</div>
      </Link>
    </div>
  );
}
