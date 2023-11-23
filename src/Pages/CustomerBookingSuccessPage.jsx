import { Link } from "react-router-dom";
import { ModalBookingSuccess } from "../Components/Common/Modals";

export function CustomerBookingSuccessPage() {
  return (
    <div className="container">
      <div className="my-3">
        <Link to="/">Holidaze</Link> -{" "}
        <Link
          to="/customerbookingsuccess"
          className="text-decoration-underline"
        >
          My Booking Summary
        </Link>
      </div>
      <div>
        <div>
          <h2 className="text-uppercase fs-5 text-center mb-0">A summary of</h2>
          <h1 className="text-uppercase fs-1 text-center mb-5">My Booking</h1>
        </div>
        <div className="d-flex justify-content-center mb-5">
          <div
            className="mx-auto border card-body border-dark px-5 py-3"
            style={{ maxWidth: "500px" }}
          >
            <img src="" alt="name" />
            <h3 className="card-title text-uppercase fs-4 font-weight-bold">
              <b>venue name</b>
            </h3>
            <p className="fs-5 card-text mb-0">
              <b>Guest:</b> number of guest
            </p>
            <p className="fs-5 card-text mb-0">
              <b>Check-in:</b> Date
            </p>
            <p className="fs-5 card-text mb-0">
              <b>Check-out:</b> Date
            </p>
            <p className="fs-5 card-text mb-0">
              <b>ID-out:</b> id
            </p>
            <div
              className="border-dark my-3"
              style={{ borderTop: "1px solid" }}
            ></div>
            <div className="d-flex justify-content-between">
              <p className="fs-5 card-text mb-0">
                <b>Total: </b> id
              </p>
              <p>price</p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <ModalBookingSuccess />
        </div>
      </div>
    </div>
  );
}
