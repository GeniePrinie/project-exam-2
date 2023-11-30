import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { RightNav } from "./RightNav";

/**
 * Styled container for the burger icon.
 */
const BurgerContainer = styled.div`
  background-color: #23211d;
  height: 55px;
  width: 55px;
  position: fixed;
  top: 5px;
  right: 20px;
  border-radius: 50%;
  z-index: 21;
`;

/**
 * Styled burger icon with animation for opening and closing the menu.
 */
const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: relative;
  top: 10px;
  left: 10px;
  z-index: 20;
  display: flex;
  justify-content: space-around;
  flex-flow: column nowrap;
  cursor: pointer;

  div {
    width: 2rem;
    height: 0.25rem;
    background-color: #fff;
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;

    &:nth-child(1) {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    &:nth-child(2) {
      transform: ${({ open }) => (open ? "translateX(100%)" : "translateX(0)")};
      opacity: ${({ open }) => (open ? 0 : 1)};
    }

    &:nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

/**
 * Burger component representing a toggle button for a navigation menu.
 * It displays a burger icon and handles the opening and closing of the menu.
 * @component
 * @returns {JSX.Element} - The rendered Burger component.
 */
export const Burger = () => {
  /**
   * State to manage the open/closed state of the navigation menu.
   * @type {boolean}
   */
  const [menuOpen, setMenuOpen] = useState(false);

  /**
   * Ref to store the reference of the menu container to check outside clicks.
   * @type {React.RefObject}
   */
  const menuRef = useRef();

  /**
   * Toggles the state of the navigation menu (open/closed).
   */
  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  /**
   * Handles clicks outside the menu by closing it.
   * @param {MouseEvent} event - The click event.
   */
  const handleOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  /**
   * Adds an event listener for clicks on the entire document to handle outside clicks.
   * Also, removes the event listener when the component unmounts to prevent memory leaks.
   */
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <BurgerContainer ref={menuRef}>
      <StyledBurger onClick={handleToggleMenu}>
        <div />
        <div />
        <div />
      </StyledBurger>
      <RightNav open={menuOpen} onClose={handleToggleMenu} />
    </BurgerContainer>
  );
};
