import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { loadFromLocalStorage } from "../Utility/localStorage";
import { API_BASE_URL } from "../Utility/constants";
import { getData } from "../Api/getData";
import { RouteEnum } from "../Utility/routes";
import { ManagerInfo } from "../Components/Common/ManagerInfo";
import { ModalEditAvatar } from "../Components/Modals/ModalEditAvatar";

export function ManagerProfilePage() {
  const [profile, setProfile] = useState(null);
  const [venuesCount, setVenuesCount] = useState(0);

  let { id } = useParams();

  useEffect(() => {
    const storedProfile = loadFromLocalStorage("profile");
    setProfile(storedProfile);

    const fetchData = async () => {
      if (storedProfile) {
        try {
          const profileData = await getData(
            `${API_BASE_URL}/profiles/${storedProfile.name}`
          );
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
        <Link
          to={`/${RouteEnum.MANAGER_PROFILE}`}
          className="text-decoration-underline"
        >
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
          <ManagerInfo venuesCount={venuesCount} id={id} />
        </div>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <ModalEditAvatar />
        <Link to={`/${RouteEnum.MANAGER_VENUES}/${id}`}>
          <button className="btn btn-dark ms-3">
            View venues and bookings
          </button>
        </Link>
      </div>
    </div>
  );
}
