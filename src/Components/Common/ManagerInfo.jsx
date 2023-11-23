import { Link } from "react-router-dom";

export const ManagerInfo = ({ bookingsCount, venuesCount }) => {
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
          <tr style={{ border: "1px solid" }}>
            <td className="py-2 px-3 border-1 text-uppercase text-decoration-underline">
              <Link to="/managerbookings">
                <b>My Bookings</b>
              </Link>
            </td>
            <td className="py-2 px-3 border-1 text-center">{bookingsCount}</td>
          </tr>
          <tr style={{ border: "1px solid" }}>
            <td className="py-2 px-3 border-1 text-uppercase text-decoration-underline">
              <Link to="/managervenues">
                <b>My Venues</b>
              </Link>
            </td>
            <td className="py-2 px-3 border-1 text-center">{venuesCount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
