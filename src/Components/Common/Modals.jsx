import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteEnum } from "../../Utility/routes";
import { loadFromLocalStorage } from "../../Utility/localStorage";

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
