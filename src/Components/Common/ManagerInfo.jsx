import { RouteEnum } from "../../Utility/routes";
import { Link } from "react-router-dom";

/**
 * Component representing information for a venue manager.
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {number} props.venuesCount - The count of venues managed by the manager.
 * @param {string} props.id - The manager's ID.
 * @returns {JSX.Element} - The rendered ManagerInfo component.
 */
export const ManagerInfo = ({ venuesCount, id }) => {
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
              <Link to={`/${RouteEnum.MANAGER_VENUES}/${id}`}>
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
