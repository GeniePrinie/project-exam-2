import { Link } from "react-router-dom";

export const CustomerInfo = ({ bookingsCount }) => {
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
            <td className="py-2 px-3 border-1 text-center">{bookingsCount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
