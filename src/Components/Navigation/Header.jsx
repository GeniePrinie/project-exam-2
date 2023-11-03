import { Link } from "react-router-dom";
import { Burger } from "./NavBurger/Burger";

export const Header = ({ isHomepage }) => {
  const headerClass = isHomepage ? "header-home" : "header-dark";

  return (
    <header className={headerClass}>
      <div className="logo-background text-center py-4">
        <Link to="/" className="text-decoration-none">
          <span className="logo text-light">Holidaze</span>
        </Link>
      </div>
      <Burger />
    </header>
  );
};
