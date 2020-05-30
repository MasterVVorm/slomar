import styled from "styled-components";
import Link from "next/link";
import { blueColor, grayColor } from "@constants";

export const SubscribeButton = () => (
  <$Container>
    <Link href={'/subscribe'} passHref>
      <$Block>
        <$Icon />
        <$Text>Подписаться</$Text>
      </$Block>
    </Link>
  </$Container>
);

const trsn = ".3s";

const $Block = styled.a`
  position: absolute;
  top: 0;
  right: 0;
  width: 137px;
  height: 100%;
  background-color: ${blueColor["400"]};
  transform-origin: right bottom;
  transform: rotateZ(45deg);
  transition: ${trsn};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-decoration: none;
`;

const $Icon = styled.div`
  position: absolute;
  right: 25px;
  top: 50%;
  width: 20px;
  height: 20px;
  background-image: url("/assets/images/icons/email.svg");
  transition: ${trsn};
`;

const $Text = styled.div`
  color: ${grayColor["200"]};
  font-size: 16px;
  font-weight: 400;
  margin-right: 9px;
  opacity: 0;
  transform: scale(0);
  transition: ${trsn};
`;

const $Container = styled.div`
  position: relative;
  height: 100%;
  cursor: pointer;

  &:hover {
    ${$Block} {
      transform: rotateZ(0);
    }

    ${$Icon} {
      transform: translate(-83px, -10px) scale(1);
    }

    ${$Text} {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
