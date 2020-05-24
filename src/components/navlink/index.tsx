import styled from "styled-components";
import Link from "next/link";
import { NavlinkProps } from "@interfaces";
import { blueColor, grayColor } from "@constants";

export const Navlink = ({ href, text }: NavlinkProps) => (
  <Link href={href} passHref>
    <$Container>{text}</$Container>
  </Link>
);

const $Container = styled.a`
  text-decoration: none;
  color: ${blueColor["900"]};
  padding: 5px 10px 5px 10px;
  border-radius: 2px;
  transition: 0.1s;

  &:nth-child(2) {
    margin: 0 10px 0 10px;
  }

  &:hover {
    background-color: ${blueColor['300']};
    color: ${grayColor['100']};
  }

  &:active {
    background-color: ${blueColor['500']};
    color: ${grayColor['100']};
  }
`;
