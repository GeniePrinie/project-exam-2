import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_BASE_URL } from "../Utility/constants";
import { RouteEnum } from "../Utility/routes";
import { getData } from "../Api/getData";
import { CustomerBookings } from "../Components/Common/CustomerBookings";

export function CustomerBookingsPage() {
  const [profile, setProfile] = useState({});

  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await getData(
          `${API_BASE_URL}/profiles/${id}?_bookings=true`
        );
        setProfile(profileData);
      } catch (error) {
        console.error("Error fetching venue:", error); // TODO: add error modal
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="container">
      <div className="my-3">
        <Link to="/">Holidaze</Link> -{" "}
        <Link
          to={`/${RouteEnum.CUSTOMER_BOOKINGS}/${id}`}
          className="text-decoration-underline"
        >
          My Bookings
        </Link>
      </div>
      <h2 className="text-uppercase fs-5 text-center mb-0">A list of</h2>
      <h1 className="text-uppercase fs-1 text-center mb-5">My Bookings</h1>
      <CustomerBookings profile={profile} />
    </div>
  );
}
