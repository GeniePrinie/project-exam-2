import React from "react";
import { Link } from "react-router-dom";
import { RouteEnum } from "../../Utility/routes";
import { DEFAULT_VENUE_IMAGE } from "../../Utility/constants";

export const Venues = ({ cardLimit, data, profile }) => {
  const curatedVenues = cardLimit ? data.slice(0, cardLimit) : data;

  return (
    <div className="row text-dark">
      {curatedVenues.map((venue, index) => (
        <div className="col-md-6" key={index}>
          <div className="card">
            <Link
              to={
                profile && profile.venueManager
                  ? `/${RouteEnum.MANAGER_VENUE}/${venue.id}`
                  : `/${RouteEnum.CUSTOMER_VENUE}/${venue.id}`
              }
            >
              <img
                src={
                  venue.media === undefined || venue.media.length === 0
                    ? DEFAULT_VENUE_IMAGE
                    : venue.media[0]
                }
                alt={venue.name}
                style={{ width: "100%", height: "350px", objectFit: "cover" }}
              />
            </Link>

            <div className="card-body">
              <h3 className="card-title text-uppercase fs-4 font-weight-bold">
                <b>{venue.name}</b>
              </h3>
              <p className="fs-5 card-text mb-0">
                <b>Guest: </b>1 - {venue.maxGuests} people
              </p>
              <p className="fs-5 card-text mb-0">
                <b>Rating: </b>
                {venue.rating}/5
              </p>
              <p className="fs-5 card-text mb-0">
                <b>Price: </b>${venue.price}
              </p>
              <div className="fs-5 mt-3 d-flex align-items-center my-4 text-uppercase">
                <Link
                  to={
                    profile && profile.venueManager
                      ? `/${RouteEnum.MANAGER_VENUE}/${venue.id}`
                      : `/${RouteEnum.CUSTOMER_VENUE}/${venue.id}`
                  }
                  className="text-decoration-underline"
                >
                  Learn More &gt;
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
