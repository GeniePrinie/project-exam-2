import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_BASE_URL } from "../Utility/constants";
import { RouteEnum } from "../Utility/routes";
import { getData } from "../Api/getData";
import { ManagerVenues } from "../Components/Common/ManagerVenues";

export function ManagerVenuesPage() {
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const venuesData = await getData(
          `${API_BASE_URL}/profiles/${id}/venues?_bookings=true&_venues=true`
        );
        setVenues(venuesData);
      } catch (error) {
        console.error("Error fetching venue:", error); // TODO: add error modal
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="container">
      <div className="my-3">
        <Link to="/">Holidaze</Link> -{" "}
        <Link to={`/${RouteEnum.MANAGER_PROFILE}/${id}`}>Profile</Link> -{" "}
        <Link
          to={`/${RouteEnum.MANAGER_VENUES}/${id}`}
          className="text-decoration-underline"
        >
          My Venues
        </Link>
      </div>
      <h2 className="text-uppercase fs-5 text-center mb-0">A list of</h2>
      <h1 className="text-uppercase fs-1 text-center mb-5">My Venues</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : venues.length === 0 ? (
        <p>You have no venues yet.</p>
      ) : (
        <ManagerVenues venues={venues} />
      )}
    </div>
  );
}
