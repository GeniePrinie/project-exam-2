import { Link } from "react-router-dom";
import { Burger } from "./NavBurger/Burger";

/**
 * Component representing the header of the application.
 * @component
 * @param {object} props - The properties passed to the component.
 * @param {boolean} props.isHomepage - Flag indicating if the header is for the homepage.
 * @returns {JSX.Element} - The rendered Header component.
 */
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
