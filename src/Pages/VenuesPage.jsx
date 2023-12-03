import { Venues } from "../Components/Common/Venues";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../Utility/constants";
import { RouteEnum } from "../Utility/routes";
import { loadFromLocalStorage } from "../Utility/localStorage";
import { Helmet } from "react-helmet";

/**
 * VenuesPage Component
 * This component displays a list of venues, with the option to search for specific venues.
 * Users can browse and search for venues based on their preferences.
 * @component
 * @returns {JSX.Element} - Returns the JSX element representing the VenuesPage.
 */
export function VenuesPage() {
  const [search, setSearch] = useState("");
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState(venues);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getVenues = async () => {
      const response = await fetch(
        `${API_BASE_URL}/venues?sort=created&sortOrder=desc`
      );
      const json = await response.json();
      setVenues(json);
    };
    getVenues();
  }, []);

  useEffect(() => {
    const filteredVenues =
      search === ""
        ? venues
        : venues.filter((venue) =>
            venue.name.toLowerCase().includes(search.toLowerCase())
          );
    setFilteredVenues(filteredVenues);
  }, [search, venues]);

  useEffect(() => {
    const profileData = loadFromLocalStorage("profile");
    setProfile(profileData);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Venues | Holidaze</title>
        <meta name="description" content="Venues page of Holidaze" />
      </Helmet>
      <Form className="bg-dark pb-1 mb-3 pt-1">
        <div
          className="mb-4"
          style={{
            maxWidth: "300px",
            height: "50px",
            margin: "0 auto",
          }}
        >
          <InputGroup className="mb-3 mt-0">
            <Form.Control
              onChange={(event) => setSearch(event.target.value)}
              placeholder="SEARCH VENUE..."
              aria-label="Search"
              className="border-dark placeholder-text-dark"
              style={{
                border: "1px solid",
                borderRadius: "0",
                paddingLeft: "25px",
              }}
            />
          </InputGroup>
        </div>
      </Form>
      <div className="container">
        <div className="mb-3">
          <Link to="/">Holidaze</Link> -{" "}
          <Link
            to={`/${RouteEnum.VENUES}`}
            className="text-decoration-underline"
          >
            Venues
          </Link>
        </div>
        <h2 className="text-uppercase fs-5 text-center mb-0">Need a venue?</h2>
        <h1 className="text-uppercase fs-1 text-center mb-5">See our venues</h1>
        {filteredVenues.length === 0 ? (
          <p className="text-center">No venues matching your search.</p>
        ) : (
          <Venues data={filteredVenues} profile={profile} />
        )}
      </div>
    </div>
  );
}
