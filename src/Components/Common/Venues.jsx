import React from "react";
import { Link } from "react-router-dom";

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
                  ? `/managervenue/${venue.id}`
                  : `/customervenue/${venue.id}`
              }
            >
              <img
                src={venue.media[0]}
                alt={venue.name}
                style={{ width: "100%", height: "350px", objectFit: "cover" }}
              />
            </Link>

            <div className="card-body">
              <h3 className="card-title text-uppercase fs-4 font-weight-bold">
                <b>{venue.name}</b>
              </h3>
              <p className="fs-5 card-text mb-0">
                Guest: 1 - {venue.maxGuests} people
              </p>
              <p className="fs-5 card-text mb-0">Rating: {venue.rating}/5</p>
              <p className="fs-5 card-text mb-0">Price: ${venue.price}</p>
              <div className="fs-5 mt-3 d-flex align-items-center my-4 text-uppercase">
                <Link
                  to={
                    profile && profile.venueManager
                      ? `/managervenue/${venue.id}`
                      : `/customervenue/${venue.id}`
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
