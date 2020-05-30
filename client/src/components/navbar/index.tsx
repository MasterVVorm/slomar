import styled from "styled-components";
import { SubscribeButton, Logo } from "@components";
import { NavlinkProps } from "@interfaces";
import { Navlink } from "../navlink";
import { grayColor } from "@constants";

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
];

export const Navbar = () => (
  <$Container>
    <Logo />
    <$NavItems>
      {links.map((link) => (
        <Navlink key={link.text} {...link} />
      ))}
    </$NavItems>
    <SubscribeButton />
  </$Container>
);

const $Container = styled.nav`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 0 1px ${grayColor['200']};
`;

const $NavItems = styled.div`
  position: relative;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 81px;
`;
