import styled from "styled-components";
import { SubscribeButton, Logo } from "@components";
import { NavlinkProps } from "@interfaces";
import { Navlink } from "../navlink";
import { grayColor, screenSize } from "@constants";
import { useRouter } from "next/dist/client/router";
import { useMemo, useState, useEffect } from "react";
import { SearchInput } from "../inputs";
import { MobileMenu } from "../menu";

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

export const Navbar = () => {
  const router = useRouter();
  const isMainPage = useMemo(() => router.pathname === "/", [router]);

  if (isMainPage) {
    return (
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
  }

  return (
    <$Container>
      <Logo />
      <SearchInput />
      <MobileMenu />
    </$Container>
  );
};

const $Container = styled.nav`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 0 1px ${grayColor["200"]};
  background-color: white;

  @media screen and (min-width: ${screenSize.PC}) {
    height: 60px;
  }

  @media screen and (max-width: ${screenSize.PC}) {
    height: 50px;
  }
`;

const $NavItems = styled.div`
  position: relative;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;
