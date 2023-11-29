import React from "react";
import { DEFAULT_VENUE_IMAGE } from "../../Utility/constants";
import { convertToIsoDate } from "../../Utility/convertToIsoDate";
import { ModalDeleteBooking } from "../Modals/ModalDeleteBooking";

export const CustomerBookings = ({ profile }) => {
  profile &&
    profile.bookings &&
    profile.bookings.sort((a, b) => new Date(b.created) - new Date(a.created));
  return (
    <div className="row text-dark">
      {profile &&
        profile.bookings &&
        profile.bookings.map((data, index) => (
          <div className="col-md-6 mb-5" key={index}>
            <div className="card">
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

              <div className="card-body">
                <h3 className="card-title text-uppercase fs-4 font-weight-bold">
                  <b>{data.venue.name}</b>
                </h3>
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
        ))}
    </div>
  );
};
