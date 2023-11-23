import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { loadFromLocalStorage } from "../Utility/localStorage";
import { ModalEditAvatar } from "../Components/Common/Modals";
import { API_BASE_URL } from "../Utility/constants";
import { getData } from "../Api/getData";
import { ManagerInfo } from "../Components/Common/ManagerInfo";

export function ManagerProfilePage() {
  const [profile, setProfile] = useState(null);
  const [bookingsCount, setBookingsCount] = useState(0);
  const [venuesCount, setVenuesCount] = useState(0);

  useEffect(() => {
    const storedProfile = loadFromLocalStorage("profile");
    setProfile(storedProfile);

    const fetchData = async () => {
      if (storedProfile) {
        try {
          const profileData = await getData(
            `${API_BASE_URL}/profiles/${storedProfile.name}`
          );
          setBookingsCount(profileData._count.bookings);
          setVenuesCount(profileData._count.venues);
        } catch (error) {
          console.error(error); // TODO: Error modal
        }
      }
    };
    fetchData();
  }, []);

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
          <ManagerInfo
            bookingsCount={bookingsCount}
            venuesCount={venuesCount}
          />
        </div>
      </div>
      <div className="text-center mt-5">
        <ModalEditAvatar />
      </div>
    </div>
  );
}
