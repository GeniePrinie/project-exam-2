import { Link, useParams } from "react-router-dom";
import { RouteEnum } from "../Utility/routes";
import { useState, useEffect } from "react";
import { loadFromLocalStorage } from "../Utility/localStorage";
import { API_BASE_URL } from "../Utility/constants";
import { CustomerInfo } from "../Components/Common/CustomerInfo";
import { getData } from "../Api/getData";
import { ModalEditAvatar } from "../Components/Modals/ModalEditAvatar";
import { ModalErrorCommon } from "../Components/Modals/ModalErrorCommon";
import { Helmet } from "react-helmet";

export function CustomerProfilePage() {
  const [profile, setProfile] = useState({});
  const [bookingsCount, setBookingsCount] = useState(0);
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
          setBookingsCount(profileData._count.bookings);
        } catch (error) {
          setErrorMessage(`An error occurred: ${error.message}`);
          setErrorModalIsOpen(true);
        }
      }
    };
    fetchData();
  }, []);

  const closeModal = () => {
    setErrorModalIsOpen(false);
  };

  return (
    <div>
      <Helmet>
        <title>{profile ? `${profile.name} | Holidaze` : "Holidaze"}</title>
        <meta name="description" content="A user profile at Holidaze" />
      </Helmet>
      <div className="container">
        <div className="my-3">
          <Link to="/">Holidaze</Link> -{" "}
          <Link
            to={`/${RouteEnum.CUSTOMER_PROFILE}/${id}`}
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
              <h2 className="text-uppercase fs-5 mb-0">Customer</h2>
              <h1 className="text-uppercase fs-1 mb-2">
                {profile && profile.name}
              </h1>
              <p className="fs-5">{profile && profile.email}</p>
            </div>
            <CustomerInfo bookingsCount={bookingsCount} id={id} />
          </div>
        </div>
        <div className="text-center mt-5">
          <ModalEditAvatar />
        </div>
        <ModalErrorCommon
          isOpen={errorModalIsOpen}
          closeModal={closeModal}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
}
