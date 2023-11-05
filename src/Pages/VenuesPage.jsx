import { Venues } from "../Components/Common/Venues";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";

export function VenuesPage() {
  const [search, setSearch] = useState("");
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState(venues);

  useEffect(() => {
    const url = "https://api.noroff.dev/api/v1/holidaze/venues";

    async function fetchVenues() {
      const response = await fetch(url);
      const data = await response.json();
      setVenues(data);
    }
    fetchVenues();
  }, []);

  useEffect(() => {
    const newFilteredVenues =
      search === ""
        ? venues
        : venues.filter((venue) =>
            venue.name.toLowerCase().includes(search.toLowerCase())
          );
    setFilteredVenues(newFilteredVenues);
  }, [search, venues]);

  return (
    <div>
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
          <Link to="/venues" className="text-decoration-underline">
            Venues
          </Link>
        </div>
        <h2 className="text-uppercase fs-5 text-center mb-0">Need a venue?</h2>
        <h1 className="text-uppercase fs-1 text-center mb-5">See our venues</h1>
        <Venues data={filteredVenues} />
      </div>
    </div>
  );
}
