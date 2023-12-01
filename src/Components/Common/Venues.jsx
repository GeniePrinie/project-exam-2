import React from "react";
import { Link } from "react-router-dom";
import { RouteEnum } from "../../Utility/routes";
import { DEFAULT_VENUE_IMAGE } from "../../Utility/constants";

/**
 * Component representing a list of venues for customers.
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {number} props.cardLimit - The maximum number of cards to display.
 * @param {Array} props.data - An array of venue objects.
 * @param {Object} props.profile - The customer's profile information.
 * @returns {JSX.Element} - The rendered Venues component.
 */
export const Venues = ({ cardLimit, data, profile }) => {
  const curatedVenues = cardLimit ? data.slice(0, cardLimit) : data;

  return (
    <div className="row text-dark">
      {curatedVenues.map((venue, index) => (
        <div className="col-md-6" key={index}>
          <div className="card">
            <Link to={`/${RouteEnum.CUSTOMER_VENUE}/${venue.id}`}>
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
                  to={`/${RouteEnum.CUSTOMER_VENUE}/${venue.id}`}
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
