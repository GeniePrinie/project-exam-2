import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { loadFromLocalStorage } from "../Utility/localStorage";
import { API_BASE_URL } from "../Utility/constants";

export function CustomerProfilePage() {
  const [profile, setProfile] = useState(null);
  const [bookingsCount, setBookingsCount] = useState([]);

  useEffect(() => {
    const storedProfile = loadFromLocalStorage("profile");

    if (storedProfile) {
      setProfile(storedProfile);
      fetchBookingsCount(storedProfile.email);
    }
  }, []);

  const fetchBookingsCount = async (userEmail) => {
    try {
      const authToken = loadFromLocalStorage("token");
      const response = await fetch(`${API_BASE_URL}/profiles?_bookings=true`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();

        const ownerData = data.find((user) => user.email === userEmail);

        if (ownerData) {
          const count = ownerData._count?.bookings || 0;
          setBookingsCount(count);
        }
      } else {
        console.error("Failed to fetch bookings");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const CustomerTable = () => {
    return (
      <div>
        <table className="text-uppercase" style={{ border: "1px solid #000" }}>
          <thead
            className="bg-dark text-light border-light "
            style={{ border: "1px solid" }}
          >
            <tr>
              <th className="py-2 px-3 border-1">
                <b>View</b>
              </th>
              <th className="py-2 px-3 border-1">
                <b>Amount</b>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ border: "1px solid" }}>
              <td className="py-2 px-3 border-1 text-uppercase text-decoration-underline">
                <Link to="/customerbookings">
                  <b>My Bookings</b>
                </Link>
              </td>
              <td className="py-2 px-3 border-1 text-center">
                {bookingsCount}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="my-3">
        <Link to="/">Holidaze</Link> -{" "}
        <Link to="/customerprofile" className="text-decoration-underline">
          Profile
        </Link>
      </div>
      <div className="row text-dark">
        <div className="col-md position-relative">
          <img
            src={profile && profile.avatar}
            alt={profile && profile.name}
            style={{ width: "100%", minWidth: "300px" }}
            className="mb-3"
          />
        </div>
        <div className="col-md">
          <div>
            <h2 className="text-uppercase fs-5 mb-0">Customer</h2>
            <h1 className="text-uppercase fs-1 mb-2">
              {profile && profile.name}
            </h1>
            <p className="fs-5">{profile && profile.email}</p>
          </div>
          <CustomerTable />
        </div>
      </div>
      <div className="text-center mt-5">
        <button className="btn bg-dark text-light">Edit Profile</button>
      </div>
    </div>
  );
}
