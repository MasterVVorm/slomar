import styled from "styled-components";
import { NavlinkProps } from "@interfaces";
import { MenuButton } from "../buttons";
import { useState } from "react";
import { screenSize, dimens, blueColor, grayColor } from "@constants";
import Link from "next/link";

const links: Array<NavlinkProps> = [
  {
    href: "/",
    text: "Главная",
  },
  {
    href: "/dictionary",
    text: "Словарь",
  },
  {
    href: "/contacts",
    text: "Контакты",
  },
  {
    href: "/subscribe",
    text: "Подписаться",
  },
];

export const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <$Container>
      <$ClickArea show={open} onClick={() => setOpen(false)} />
      <MenuButton active={open} onClick={() => setOpen(!open)} />
      <$MenuList show={open} onClick={() => setOpen(!open)}>
        {links.map((link) => (
          <Link href={link.href} passHref>
            <$Link>{link.text}</$Link>
          </Link>
        ))}
      </$MenuList>
    </$Container>
  );
};

const $Container = styled.div`
  position: absolute;
  right: 15px;

  @media screen and (min-width: ${screenSize.PC}) {
    top: 25px;
  }

  @media screen and (max-width: ${screenSize.PC}) {
    top: 20px;
  }
`;

const $ClickArea = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
`;

const $MenuList = styled.div`
  position: absolute;
  z-index: 1000;
  top: 40px;
  right: 0;
  width: 216px;
  background-color: white;
  box-shadow: 0px 0px 8px rgba(50, 69, 103, 0.15);
  transition: ${dimens.transition};
  opacity: ${({ show }) => (show ? "1" : "0")};
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
`;

const $Link = styled.a`
  width: 100%;
  height: 30px;
  font-size: 16px;
  color: ${blueColor["1000"]};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 8px;
  cursor: pointer;
  background-color: white;
  transition: ${dimens.transition};
  text-decoration: none;

  &:hover {
    background-color: ${blueColor["200"]};
    color: white;
  }

  &:active {
    background-color: ${blueColor["400"]};
    color: white;
  }

  &:last-child {
    border-top: 1px solid ${blueColor["100"]};
  }
`;
