import styled from "styled-components";
import { blueColor, dimens, screenSize } from "@constants";

interface MenuButtonProps {
  onClick: () => any;
  active: boolean;
}

export const MenuButton = ({ active, onClick }: MenuButtonProps) => (
  <$Container active={active} onClick={onClick}>
    <span></span>
  </$Container>
);

const $Container = styled.div`
  position: relative;
  cursor: pointer;

  @media screen and (min-width: ${screenSize.PC}) {
    width: 24px;
    height: 16px;
  }

  @media screen and (max-width: ${screenSize.PC}) {
    width: 18px;
    height: 12px;
  }

  span {
    position: absolute;
    top: 50%;
    right: 0;

    height: 2px;
    transform: translateY(-50%);
    background-color: ${blueColor["900"]};
    transition: ${dimens.transition};

    @media screen and (min-width: ${screenSize.PC}) {
      width: ${({ active }) => (active ? "16px" : "24px")};
      height: 4px;
    }

    @media screen and (max-width: ${screenSize.PC}) {
      width: ${({ active }) => (active ? "12px" : "18px")};
      height: 2px;
    }

    &::before,
    &::after {
      position: absolute;
      right: 0;
      content: "";
      height: inherit;
      background-color: inherit;
      transition: ${dimens.transition};
    }

    &::before {
      @media screen and (min-width: ${screenSize.PC}) {
        top: -8px;
        width: ${({ active }) => (active ? "8px" : "24px")};
      }

      @media screen and (max-width: ${screenSize.PC}) {
        top: -6px;
        width: ${({ active }) => (active ? "6px" : "18px")};
      }
    }

    &::after {
      @media screen and (min-width: ${screenSize.PC}) {
        top: 8px;
        width: 24px;
      }

      @media screen and (max-width: ${screenSize.PC}) {
        top: 6px;
        width: 18px;
      }
    }
  }
`;
