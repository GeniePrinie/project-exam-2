import React, { useState } from "react";
import styled from "styled-components";
import { RightNav } from "./RightNav";

const BurgerContainer = styled.div`
  background-color: #23211d;
  height: 55px;
  width: 55px;
  position: absolute;
  top: 5px;
  right: 20px;
  border-radius: 50%;
`;

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

export const Burger = () => {
  const [open, setOpen] = useState(false);

  return (
    <BurgerContainer>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
      <RightNav open={open} />
    </BurgerContainer>
  );
};
