import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./Components/Navigation/Layout";
import { HomePage } from "./Pages/HomePage";
import { SignInPage } from "./Pages/SignInPage";
import { SignUpPage } from "./Pages/SignUpPage";
import { VenuesPage } from "./Pages/VenuesPage";
import { ManagerVenuePage } from "./Pages/ManagerVenuePage";
import { ManagerVenuesPage } from "./Pages/ManagerVenuesPage";
import { ManagerProfilePage } from "./Pages/ManagerProfilePage";
import { ManagerBookingsPage } from "./Pages/ManagerBookingsPage";
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
            <Route path="signin" element={<SignInPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="venues" element={<VenuesPage />} />
            <Route path="managervenue/:id" element={<ManagerVenuePage />} />
            <Route path="managervenues" element={<ManagerVenuesPage />} />
            <Route path="managerprofile" element={<ManagerProfilePage />} />
            <Route path="managerbookings" element={<ManagerBookingsPage />} />
            <Route path="customervenue/:id" element={<CustomerVenuePage />} />
            <Route path="customerprofile" element={<CustomerProfilePage />} />
            <Route path="customerbookings" element={<CustomerBookingsPage />} />
            <Route
              path="customerbookingsuccess/:id"
              element={<CustomerBookingSuccessPage />}
            />
            <Route path="createvenue" element={<CreateVenuePage />} />
            <Route path="*" element={<RouteNotFound />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
