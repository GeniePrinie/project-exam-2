import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./Components/Navigation/Layout";
import { RouteEnum } from "./Utility/routes";
import { HomePage } from "./Pages/HomePage";
import { SignInPage } from "./Pages/SignInPage";
import { SignUpPage } from "./Pages/SignUpPage";
import { VenuesPage } from "./Pages/VenuesPage";
import { ManagerVenuePage } from "./Pages/ManagerVenuePage";
import { ManagerVenuesPage } from "./Pages/ManagerVenuesPage";
import { ManagerProfilePage } from "./Pages/ManagerProfilePage";
import { CustomerVenuePage } from "./Pages/CustomerVenuePage";
import { CustomerProfilePage } from "./Pages/CustomerProfilePage";
import { CustomerBookingsPage } from "./Pages/CustomerBookingsPage";
import { CustomerBookingSuccessPage } from "./Pages/CustomerBookingSuccessPage";
import { CreateVenuePage } from "./Pages/CreateVenuePage";

/**
 * RouteNotFound component displays a "Page not found" message when no matching route is found.
 * @component
 * @returns {JSX.Element} The RouteNotFound component.
 */
function RouteNotFound() {
  return <div>Page not found</div>;
}

/**
 * RouterPathway component configures the routing for the application using React Router.
 * @component
 * @returns {JSX.Element} The RouterPathway component.
 */
export function RouterPathway() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path={RouteEnum.SIGN_IN} element={<SignInPage />} />
            <Route path={RouteEnum.SIGN_UP} element={<SignUpPage />} />
            <Route path={RouteEnum.VENUES} element={<VenuesPage />} />
            <Route
              path={`${RouteEnum.CUSTOMER_PROFILE}/:id`}
              element={<CustomerProfilePage />}
            />
            <Route
              path={`${RouteEnum.CUSTOMER_VENUE}/:id`}
              element={<CustomerVenuePage />}
            />
            <Route
              path={RouteEnum.CUSTOMER_BOOKINGS}
              element={<CustomerBookingsPage />}
            />
            <Route
              path={`${RouteEnum.CUSTOMER_BOOKING_SUCCESS}/:id`}
              element={<CustomerBookingSuccessPage />}
            />
            <Route
              path={`${RouteEnum.MANAGER_PROFILE}/:id`}
              element={<ManagerProfilePage />}
            />
            <Route
              path={`${RouteEnum.MANAGER_VENUE}/:id`}
              element={<ManagerVenuePage />}
            />
            <Route
              path={RouteEnum.MANAGER_VENUES}
              element={<ManagerVenuesPage />}
            />
            <Route
              path={RouteEnum.MANAGER_CREATE_VENUE}
              element={<CreateVenuePage />}
            />
            <Route path="*" element={<RouteNotFound />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
