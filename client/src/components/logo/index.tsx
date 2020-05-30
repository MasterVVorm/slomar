import styled from "styled-components";
import Link from "next/link";

export const Logo = () => (
  <Link href="/" passHref>
    <$Container></$Container>
  </Link>
);

const $Container = styled.a`
  position: relative;
  width: 81px;
  height: 29px;
  background-image: url("/assets/images/logo.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50% 50%;
  margin-left: 15px;
`;
