import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const url = "https://api.noroff.dev/api/v1/holidaze/venues";

export const Venues = ({ cardLimit }) => {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch(url);
      const json = await response.json();

      setVenues(json);
    }
    getData();
  }, []);

  const filteredVenues = cardLimit ? venues.slice(0, cardLimit) : venues;

  return (
    <div className="row text-dark">
      {filteredVenues.map((venue, index) => (
        <div className="col-md-6" key={index}>
          <div className="card">
            <img
              src={venue.media}
              alt={venue.name}
              style={{ width: "100%", height: "350px", objectFit: "cover" }}
            />

            <div className="card-body">
              <h3 className="card-title text-uppercase fs-4 font-weight-bold">
                <b>{venue.name}</b>
              </h3>
              <p className="fs-5 card-text mb-0">
                Guest: 1 - {venue.maxGuests} people
              </p>
              <p className="fs-5 card-text mb-0">Rating: {venue.rating}</p>
              <p className="fs-5 card-text mb-0">Price: ${venue.price}</p>
              <div className="fs-5 mt-3 d-flex align-items-center my-4 text-uppercase">
                <Link
                  to={`/customervenue/${venue.id}`}
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
