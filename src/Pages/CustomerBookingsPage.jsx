import { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../Utility/constants";
import { loadFromLocalStorage } from "../Utility/localStorage";

export function CustomerBookingsPage() {
  const [search, setSearch] = useState("");
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState(venues);
  const [profile, setProfile] = useState(null);
  const url = `${API_BASE_URL}/bookings?_customer=true&_venue=true`;

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

        const customerBookings = data.filter(
          (booking) => booking.customer.email === profile.email
        );

        const sortedCustomerBookings = customerBookings.sort(
          (a, b) => new Date(b.created) - new Date(a.created)
        );

        setVenues(sortedCustomerBookings);
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

  const CustomerBookings = () => {
    return (
      <div className="row text-dark">
        {filteredVenues.length > 0 ? (
          filteredVenues.map((booking, index) => (
            <div className="col-md-6" key={index}>
              <div className="card">
                <img
                  src={booking.venue.media}
                  alt={booking.venue.name}
                  style={{
                    width: "100%",
                    height: "350px",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body">
                  <h3 className="card-title text-uppercase fs-4 font-weight-bold">
                    <b>{booking.venue.name}</b>
                  </h3>
                  <p className="fs-5 card-text mb-0">Guest: {booking.guests}</p>
                  <p className="fs-5 card-text mb-0">
                    Check-in {booking.dateFrom}
                  </p>
                  <p className="fs-5 card-text mb-0">
                    Check-out {booking.dateTo}
                  </p>
                  <p className="fs-5 card-text mb-0">
                    Booking ID: {booking.id}
                  </p>
                  <div className="fs-5 mt-3 d-flex align-items-center my-4 text-uppercase">
                    <Link
                      to={`/managervenue/${booking.venue.id}`}
                      className="text-decoration-underline"
                    >
                      See venue &gt;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No Bookings yet.</p>
        )}
      </div>
    );
  };

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
          <Link to="/customerbookings" className="text-decoration-underline">
            My Bookings
          </Link>
        </div>
        <h2 className="text-uppercase fs-5 text-center mb-0">A list of</h2>
        <h1 className="text-uppercase fs-1 text-center mb-5">My Bookings</h1>
        <CustomerBookings data={filteredVenues} profile={profile} />
      </div>
    </div>
  );
}
