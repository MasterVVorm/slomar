import styled from "styled-components";
import Link from "next/link";
import { screenSize } from "@constants";

interface LogoProps {
  style?: Object;
}

export const Logo = ({ style }: LogoProps) => (
  <Link href="/" passHref>
    <$Container style={style}></$Container>
  </Link>
);

const $Container = styled.a`
  position: absolute;
  left: 15px;

  background-image: url("/assets/images/logo.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50% 50%;

  @media screen and (min-width: ${screenSize.PC}) {
    top: 10px;
    width: 91px;
    height: 39px;
  }

  @media screen and (max-width: ${screenSize.PC}) {
    top: 10px;
    width: 81px;
    height: 29px;
  }
`;
