import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../Utility/constants";
import { loadFromLocalStorage } from "../Utility/localStorage";

export function ManagerVenuesPage() {
  const [search, setSearch] = useState("");
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState(venues);
  const [profile, setProfile] = useState(null);
  const url = `${API_BASE_URL}/venues?_owner=true`;

  useEffect(() => {
    const profileData = loadFromLocalStorage("profile");

    setProfile(profileData);
  }, []);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const authToken = loadFromLocalStorage("token");
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const data = await response.json();

        const ownerVenues = data.filter(
          (venue) => venue.owner.email === profile.email
        );

        const sortedOwnerVenues = ownerVenues.sort(
          (a, b) => new Date(b.created) - new Date(a.created)
        );

        setVenues(sortedOwnerVenues);
      } catch (error) {
        console.error("Error fetching venues:", error);
        // Todo: modal
      }
    };

    fetchVenues();
  }, [profile, url]);

  useEffect(() => {
    const newFilteredVenues =
      search === ""
        ? venues
        : venues.filter((venue) =>
            venue.name.toLowerCase().includes(search.toLowerCase())
          );
    setFilteredVenues(newFilteredVenues);
  }, [search, venues]);

  const ManagerVenues = () => {
    return (
      <div className="row text-dark">
        {filteredVenues.length > 0 ? (
          filteredVenues.map((venue, index) => (
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
                  <p className="fs-5 card-text mb-0">
                    Rating: {venue.rating}/5
                  </p>
                  <p className="fs-5 card-text mb-0">Price: ${venue.price}</p>
                  <div className="fs-5 mt-3 d-flex align-items-center my-4 text-uppercase">
                    <Link
                      to={`/managervenue/${venue.id}`}
                      className="text-decoration-underline"
                    >
                      See details &gt;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No venues yet.</p>
        )}
      </div>
    );
  };

  return (
    <div>
      {" "}
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
          <Link to="/managervenues" className="text-decoration-underline">
            My Venues
          </Link>
        </div>
        <h2 className="text-uppercase fs-5 text-center mb-0">A list of</h2>
        <h1 className="text-uppercase fs-1 text-center mb-5">My venues</h1>
        <ManagerVenues data={filteredVenues} profile={profile} />
      </div>
    </div>
  );
}
