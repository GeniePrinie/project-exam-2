import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { loadFromLocalStorage } from "../Utility/localStorage";

export function ManagerProfilePage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const storedProfile = loadFromLocalStorage("profile");

    if (storedProfile) {
      setProfile(storedProfile);
    }
  }, []);

  const ManagerTable = ({ profile }) => {
    const tableData = [
      { key: "venues", label: "My Venues" },
      { key: "bookings", label: "Bookings" },
    ];

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
            {tableData.map((data) => (
              <tr key={data.key} style={{ border: "1px solid" }}>
                <td className="py-2 px-3 border-1 text-uppercase text-decoration-underline">
                  <Link
                    to={`/${
                      data.key === "venues"
                        ? "managervenues"
                        : "managerbookings"
                    }`}
                  >
                    <b>{data.label}</b>
                  </Link>
                </td>
                <td className="py-2 px-3 border-1 text-center">
                  {profile && profile._count
                    ? profile._count[data.key] || 0
                    : 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="my-3">
        <Link to="/">Holidaze</Link> -{" "}
        <Link to="/managerprofile" className="text-decoration-underline">
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
            <h2 className="text-uppercase fs-5 mb-0">Venue manager</h2>
            <h1 className="text-uppercase fs-1 mb-2">
              {profile && profile.name}
            </h1>
            <p className="fs-5">{profile && profile.email}</p>
          </div>
          <ManagerTable profile={profile} />
        </div>
      </div>
      <div className="text-center mt-5">
        <button className="btn bg-dark text-light">Edit Profile</button>
      </div>
    </div>
  );
}
