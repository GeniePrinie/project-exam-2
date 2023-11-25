import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import { getData } from "../Api/getData";
import { RouteEnum } from "../Utility/routes";
import { Link, useParams } from "react-router-dom";
import { API_BASE_URL, DEFAULT_VENUE_IMAGE } from "../Utility/constants";
import { AccommodationInfo } from "../Components/Common/AccommodationInfo";
import { CustomerCalendar } from "../Components/Common/CustomerCalendar";

export function CustomerVenuePage() {
  const [venue, setVenue] = useState({});
  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const venueData = await getData(
          `${API_BASE_URL}/venues/${id}?_bookings=true`
        );
        setVenue(venueData);
      } catch (error) {
        console.error("Error fetching venue:", error); // TODO: add error modal
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="container">
      <div className="my-3">
        <Link to="/">Holidaze</Link> -{" "}
        <Link
          to={`/${RouteEnum.CUSTOMER_VENUE}/${id}`}
          className="text-decoration-underline"
        >
          {venue.name}
        </Link>
      </div>
      <div className="row text-dark">
        <div className="col-md position-relative">
          <img
            src={
              venue.media === undefined || venue.media.length === 0
                ? DEFAULT_VENUE_IMAGE
                : venue.media[0]
            }
            alt={venue.name}
            style={{ width: "100%", minWidth: "300px" }}
          />
        </div>
        <div className="col-md">
          <div>
            <p className="text-uppercase fs-5 mb-0">
              {venue?.location?.address}, {venue?.location?.zip},{" "}
              {venue?.location?.city}, {venue?.location?.country}
            </p>
            <h1 className="text-uppercase fs-1 mb-3">{venue.name}</h1>

            <p className="fs-5">{venue.description}</p>
            <p className="fs-5">
              <b className="text-uppercase">Rating:</b> {venue.rating}/5
            </p>
            <p className="fs-5">
              <b className="text-uppercase">Price:</b> ${venue.price}
            </p>
            <p className="fs-5">
              <b className="text-uppercase">Guest:</b> 1 - {venue.maxGuests}{" "}
              people
            </p>
          </div>
          <AccommodationInfo venue={venue} />
        </div>
      </div>
      <CustomerCalendar venue={venue} />
    </div>
  );
}
