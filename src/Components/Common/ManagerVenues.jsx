import React from "react";
import { Link } from "react-router-dom";
import { DEFAULT_VENUE_IMAGE } from "../../Utility/constants";
import { RouteEnum } from "../../Utility/routes";

export const ManagerVenues = ({ venues, id }) => {
  return (
    <div className="row text-dark">
      {venues &&
        venues.map((data, index) => (
          <div className="col-md-6 mb-5" key={index}>
            <div className="card">
              <Link to={`/${RouteEnum.MANAGER_VENUE}/${id}`}>
                <img
                  src={
                    data.media === undefined || data.media.length === 0
                      ? DEFAULT_VENUE_IMAGE
                      : data.media[0]
                  }
                  alt={data.name}
                  style={{ width: "100%", height: "350px", objectFit: "cover" }}
                />
              </Link>
              <div className="card-body">
                <h3 className="card-title text-uppercase fs-4 font-weight-bold">
                  <b>{data.name}</b>
                </h3>
                <p className="fs-5 card-text mb-0">
                  <b>Guests: </b>1 - {data.maxGuests} people
                </p>
                <p className="fs-5 card-text mb-0">
                  <b>Rating: </b> {data.rating}/5
                </p>
                <p className="fs-5 card-text mb-0">
                  <b>Price: </b> ${data.price}
                </p>
                <div className="fs-5 mt-3 d-flex align-items-center my-4 text-uppercase">
                  <Link
                    to={`/${RouteEnum.MANAGER_VENUE}/${id}`}
                    className="text-decoration-underline"
                  >
                    View Bookings &gt;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
