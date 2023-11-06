import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_BASE_URL } from "../Utility/constants";

export function CustomerVenuePage() {
  const [venue, setVenue] = useState([]);

  let { id } = useParams();
  const url = `${API_BASE_URL}/venues/${id}`;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setVenue(json);
        document.title = `Holidaze | ${json.name}`;
        const metaDescriptionTag = document.querySelector(
          'meta[name="description"]'
        );
        if (metaDescriptionTag) {
          metaDescriptionTag.setAttribute("content", json.description);
        }
      } catch (error) {
        console.log({ error });
      }
    }
    fetchData();
  }, [url]);

  function AccommodationTable() {
    const [accommodationData, setAccommodationData] = useState(null);

    useEffect(() => {
      setAccommodationData(venue.meta);
    }, []);

    return (
      <div>
        <table className="text-uppercase" style={{ border: "1px solid #000" }}>
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
            {accommodationData &&
              Object.entries(accommodationData).map(([feature, value]) => (
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
    );
  }

  return (
    <div className="container">
      <div className="my-3">
        <Link to="/">Holidaze</Link> -{" "}
        <Link to={`/customervenue/${id}`} className="text-decoration-underline">
          {venue.name}
        </Link>
      </div>
      <div className="row text-dark">
        <div className="col-md position-relative">
          <img src={venue.media} alt={venue.name} style={{ width: "100%" }} />
        </div>
        <div className="col-md ">
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
          <AccommodationTable />
        </div>
      </div>
      <div className="d-flex align-items-center my-4">
        <button className="btn">Book</button>
      </div>
    </div>
  );
}
