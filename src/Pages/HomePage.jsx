import homeVenue2 from "../Image/homeVenue2.png";
import { Venues } from "../Components/Common/Venues";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Header } from "../Components/Navigation/Header";

/**
 * HomePage component serves as the main page of Holidaze, a booking venues website.
 * It displays a list of recently added venues for users.
 * @component
 * @returns {JSX.Element} The HomePage component.
 */
export function HomePage({ cardLimit }) {
  const [venues, setVenues] = useState([]);
  const url = "https://api.noroff.dev/api/v1/holidaze/venues";

  useEffect(() => {
    async function getData() {
      const response = await fetch(url);
      const json = await response.json();

      setVenues(json);
    }
    getData();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="my-5 d-flex justify-content-center flex-column flex-md-row">
          <div className="me-4">
            <h2 className="text-uppercase fs-5 mb-0">holidaze</h2>

            <h1 className="text-uppercase fs-1 mb-5">
              Welcome to a venue booking site.
            </h1>
            <p className="mb-5 pb-3" style={{ maxWidth: "500px" }}>
              <b>Different venues, different styles </b>
              <span style={{ maxWidth: "500px", fontWeight: "lighter" }}>
                - birthday parties to weddings, we have them all.
              </span>
              <br /> <br />
              <b>Love traveling with your pets? </b>{" "}
              <span style={{ maxWidth: "500px", fontWeight: "lighter" }}>
                - Explore venues that open their doors to your furry companions.
                Whether you're planning a countryside escape, beachfront
                retreat, or cozy cabin getaway, pet-friendly venues ensure both
                you and your pets feel right at home.
              </span>
            </p>
            <div className="d-flex justify-content-center flex-md-column flex-lg-row justify-content-md-start mb-5 mt-5">
              <Link to="/venues">
                <button className="btn me-3 me-md-0 me-lg-3 mb-0 mb-md-4 mb-lg-0">
                  Venues
                </button>
              </Link>
              <Link to="/signup">
                <button className="btn">Sign up</button>
              </Link>
            </div>
          </div>
          <div>
            <img
              src={homeVenue2}
              alt="A venue"
              style={{ width: "100%", maxHeight: "1000px" }}
            />
          </div>
        </div>
        <div className="mt-5">
          <h2 className="text-uppercase fs-5 text-center mb-0">
            new kids in town
          </h2>
          <h1 className="text-uppercase fs-1 text-center mb-5">
            Our Latest Venues
          </h1>
          <Venues cardLimit={4} data={venues} />
        </div>
      </div>
    </div>
  );
}
