import { Link } from "react-router-dom";
import { RouteEnum } from "../../Utility/routes";

export const ManagerInfo = ({ bookingsCount, venuesCount, id }) => {
  return (
    <div>
      <table className="text-uppercase" style={{ border: "1px solid #000" }}>
        <thead
          className="bg-dark text-light border-light "
          style={{ border: "1px solid" }}
        >
          <tr>
            <th className="py-2 px-3 border-1"></th>
            <th className="py-2 px-3 border-1">
              <b>Amount</b>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ border: "1px solid" }}>
            <td className="py-2 px-3 border-1 text-uppercase">
              <b>My Venues</b>
            </td>
            <td className="py-2 px-3 border-1 text-center">{venuesCount}</td>
          </tr>
          <tr style={{ border: "1px solid" }}>
            <td className="py-2 px-3 border-1 text-uppercase">
              <b>Bookings</b>
            </td>
            <td className="py-2 px-3 border-1 text-center">{bookingsCount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
