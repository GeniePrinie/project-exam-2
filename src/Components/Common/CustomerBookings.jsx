import React from "react";
import { Link } from "react-router-dom";
import { DEFAULT_VENUE_IMAGE } from "../../Utility/constants";
import { convertToIsoDate } from "../../Utility/convertToIsoDate";
import { RouteEnum } from "../../Utility/routes";
import { ModalDeleteBooking } from "../Modals/ModalDeleteBooking";

/**
 * Component representing a list of customer bookings.
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.profile - The customer profile containing booking information.
 * @returns {JSX.Element} - The rendered CustomerBookings component.
 */
export const CustomerBookings = ({ profile }) => {
  const sortedBookings =
    profile &&
    profile.bookings &&
    profile.bookings.sort((a, b) => new Date(b.created) - new Date(a.created));
  return (
    <div className="row text-dark">
      {sortedBookings && sortedBookings.length > 0 ? (
        sortedBookings.map((data, index) => (
          <div className="col-md-6 mb-5" key={index}>
            <div className="card">
              <Link
                to={`/${RouteEnum.CUSTOMER_VENUE}/${
                  data.venue && data.venue.id
                }`}
              >
                <img
                  src={
                    data.venue.media === undefined ||
                    data.venue.media.length === 0
                      ? DEFAULT_VENUE_IMAGE
                      : data.venue.media[0]
                  }
                  alt={data.venue.name}
                  style={{ width: "100%", height: "350px", objectFit: "cover" }}
                />
              </Link>

              <div className="card-body">
                <Link
                  to={`/${RouteEnum.CUSTOMER_VENUE}/${
                    data.venue && data.venue.id
                  }`}
                >
                  <h3 className="card-title text-uppercase fs-4 font-weight-bold">
                    <b>{data.venue.name}</b>
                  </h3>
                </Link>
                <p className="fs-5 card-text mb-0">
                  <b>Booking-id:</b> {data.id}
                </p>
                <p className="fs-5 card-text mb-0">
                  <b>Purchased:</b> {convertToIsoDate(new Date(data.created))}
                </p>
                <p className="fs-5 card-text mb-0">
                  <b>Guests:</b> {data.guests}
                </p>
                <p className="fs-5 card-text mb-0">
                  <b>Check-in:</b> {convertToIsoDate(new Date(data.dateFrom))}
                </p>
                <p className="fs-5 card-text mb-0">
                  <b>Check-out:</b> {convertToIsoDate(new Date(data.dateTo))}
                </p>
                <div>
                  <ModalDeleteBooking id={data.id} />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-12">
          <p className="fs-5">There are no bookings yet.</p>
        </div>
      )}
    </div>
  );
};
