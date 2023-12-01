import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { RouteEnum } from "../../../Utility/routes";
import { loadFromLocalStorage } from "../../../Utility/localStorage";
import { ModalConfirmSignOut } from "../../Modals/ModalConfirmSignOut";

/**
 * Styled unordered list for the right navigation menu.
 */
const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: column nowrap;
  background-color: #3d6145;
  position: fixed;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  top: 0;
  right: 0;
  height: 100vh;
  width: 300px;
  padding-top: 3.5rem;
  transition: transform 0.3s ease-in-out;
  z-index: 19;

  li {
    padding: 18px 10px;
    text-transform: uppercase;
  }

  a {
    color: #fff;

    &:hover {
      text-decoration: underline;
    }
  }
`;

/**
 * Component representing the right navigation menu.
 * @component
 * @param {object} props - The properties passed to the component.
 * @param {boolean} props.open - Flag indicating whether the menu is open.
 * @param {Function} props.onClose - Callback function to close the menu.
 * @returns {JSX.Element} - The rendered RightNav component.
 */
export const RightNav = ({ open, onClose }) => {
  /**
   * Checks if a user has an authentication token.
   * @type {boolean}
   */
  const hasToken = loadFromLocalStorage("token");

  /**
   * Retrieves the user's profile information from local storage.
   * @type {object|null}
   */
  const profile = loadFromLocalStorage("profile");

  /**
   * Extracts the user's name from the profile.
   * @type {string|null}
   */
  const name = profile && profile.name;

  /**
   * Checks if the user is a venue manager.
   * @type {boolean|null}
   */
  const isVenueManager = profile && profile.venueManager;

  /**
   * Handles clicks on menu items by closing the menu.
   */
  const handleMenuItemClick = () => {
    onClose && onClose();
  };

  if (!hasToken) {
    return (
      <Ul open={open}>
        <li>
          <NavLink to="/" onClick={handleMenuItemClick}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={`/${RouteEnum.VENUES}`} onClick={handleMenuItemClick}>
            Venues
          </NavLink>
        </li>
        <li>
          <NavLink to={`/${RouteEnum.SIGN_IN}`} onClick={handleMenuItemClick}>
            Sign In
          </NavLink>
        </li>
        <li>
          <NavLink to={`/${RouteEnum.SIGN_UP}`} onClick={handleMenuItemClick}>
            Sign Up
          </NavLink>
        </li>
      </Ul>
    );
  }

  if (profile && !isVenueManager) {
    return (
      <Ul open={open}>
        <li>
          <NavLink to="/" onClick={handleMenuItemClick}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={`/${RouteEnum.VENUES}`} onClick={handleMenuItemClick}>
            Venues
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/${RouteEnum.CUSTOMER_PROFILE}/${name}`}
            onClick={handleMenuItemClick}
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/${RouteEnum.CUSTOMER_BOOKINGS}/${name}`}
            onClick={handleMenuItemClick}
          >
            My bookings
          </NavLink>
        </li>
        <li>
          <ModalConfirmSignOut />
        </li>
      </Ul>
    );
  }

  if (profile && isVenueManager) {
    return (
      <Ul open={open}>
        <li>
          <NavLink to="/" onClick={handleMenuItemClick}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={`/${RouteEnum.VENUES}`} onClick={handleMenuItemClick}>
            Venues
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/${RouteEnum.MANAGER_PROFILE}/${name}`}
            onClick={handleMenuItemClick}
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/${RouteEnum.MANAGER_CREATE_VENUE}/${name}`}
            onClick={handleMenuItemClick}
          >
            Create Venue
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/${RouteEnum.MANAGER_VENUES}/${name}`}
            onClick={handleMenuItemClick}
          >
            My Venues
          </NavLink>
        </li>

        <li>
          <ModalConfirmSignOut />
        </li>
      </Ul>
    );
  }

  return null;
};
