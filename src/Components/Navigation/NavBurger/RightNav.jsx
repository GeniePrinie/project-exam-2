import { Link } from "react-router-dom";
import styled from "styled-components";
import { ModalConfirmSignOut } from "../../Common/Modals";

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

export const RightNav = ({ open }) => {
  return (
    <Ul open={open}>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/signin">Sign In</Link>
      </li>
      <li>
        <Link to="/signup">Sign Up</Link>
      </li>
      <li>
        <Link to="/venues">Venues</Link>
      </li>
      <li>
        <Link to="/managervenue/:id">Manager venue</Link>
      </li>
      <li>
        <Link to="/managervenues">Manager My Venues</Link>
      </li>
      <li>
        <Link to="/managerprofile">Manager profile</Link>
      </li>
      <li>
        <Link to="/customervenue/:id">Customer venue</Link>
      </li>
      <li>
        <Link to="/customerprofile">Customer profile</Link>
      </li>
      <li>
        <Link to="/customerbookings">Customer bookings</Link>
      </li>
      <li>
        <Link to="/createvenue">Create Venue</Link>
      </li>
      <li>
        <ModalConfirmSignOut />
      </li>
    </Ul>
  );
};
