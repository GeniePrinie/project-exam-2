import { Link } from "react-router-dom";

export const Header = ({ isHomepage }) => {
  const headerClass = isHomepage ? "header-home" : "header-dark";

  return (
    <header className={headerClass}>
      <Link to="/" className="text-decoration-none">
        <div className="logo-background text-center py-4">
          <span className="logo text-light">Holidaze</span>
        </div>
      </Link>
      {/* <nav>
        <Link to="/">Holidaze</Link>
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/venues">Venues</Link>
        <Link to="/managervenue/:id">Manager venue</Link>
        <Link to="/managervenues">Manager My Venues</Link>
        <Link to="/managerprofile">Manager profile</Link>
        <Link to="/managerbookings">Manager Bookings</Link>
        <Link to="/customervenue/:id">Customer venue</Link>
        <Link to="/customerprofile">Customer profile</Link>
        <Link to="/customerbookings">Customer bookings</Link>
        <Link to="/customerbookingsuccess">Customer booking success</Link>
        <Link to="/createvenue">Create Venue</Link>
      </nav> */}
    </header>
  );
};
