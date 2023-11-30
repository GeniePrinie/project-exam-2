import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { RouteEnum } from "../../../Utility/routes";
import { loadFromLocalStorage } from "../../../Utility/localStorage";
import { ModalConfirmSignOut } from "../../Modals/ModalConfirmSignOut";

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

export const RightNav = ({ open, onClose }) => {
  const hasToken = loadFromLocalStorage("token");
  const profile = loadFromLocalStorage("profile");
  const name = profile && profile.name;
  const isVenueManager = profile && profile.venueManager;

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
