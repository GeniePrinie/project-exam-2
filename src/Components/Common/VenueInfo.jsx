import { Carousel } from "react-bootstrap";
import { DEFAULT_VENUE_IMAGE } from "../../Utility/constants";

/**
 * Component representing information about a venue.
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.venue - The details of the venue.
 * @returns {JSX.Element} - The rendered VenueInfo component.
 */
export const VenueInfo = ({ venue }) => {
  return (
    <div className="row text-dark">
      <div className="col-md position-relative">
        <Carousel>
          {venue.media && venue.media.length > 0 ? (
            venue.media.map((media, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={media}
                  alt={venue.name}
                  style={{
                    width: "100%",
                    minWidth: "400px",
                    height: "700px",
                    objectFit: "cover",
                  }}
                />
              </Carousel.Item>
            ))
          ) : (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={DEFAULT_VENUE_IMAGE}
                alt={venue.name}
                style={{
                  width: "100%",
                  minWidth: "400px",
                  height: "700px",
                  objectFit: "cover",
                }}
              />
            </Carousel.Item>
          )}
        </Carousel>
      </div>
      <div className="col-md">
        <div>
          <p className="text-uppercase fs-5 mb-0">
            {venue.location && venue.location.address && (
              <span>{venue.location.address}, </span>
            )}
            {venue.location && venue.location.zip && (
              <span>{venue.location.zip}, </span>
            )}
            {venue.location && venue.location.city && (
              <span>{venue.location.city}, </span>
            )}
            {venue.location && venue.location.country && (
              <span>{venue.location.country}</span>
            )}
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
        <div>
          <table
            className="text-uppercase"
            style={{ border: "1px solid #000" }}
          >
            <thead
              className="bg-dark text-light border-light "
              style={{ border: "1px solid" }}
            >
              <tr>
                <th className="py-2 px-3 border-1">
                  <b>Accomodation</b>
                </th>
                <th className="py-2 px-3 border-1">
                  <b>Yes</b>
                </th>
                <th className="py-2 px-3 border-1">
                  <b>No</b>
                </th>
              </tr>
            </thead>
            <tbody>
              {venue.meta &&
                Object.entries(venue.meta).map(([feature, value]) => (
                  <tr key={feature} style={{ border: "1px solid" }}>
                    <td className="py-2 px-3 border-1">
                      <b>{feature}</b>
                    </td>
                    <td className="py-2 px-3 border-1 text-center">
                      {value ? "x" : ""}
                    </td>
                    <td className="py-2 px-3 border-1 text-center">
                      {!value ? "x" : ""}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
