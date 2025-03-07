import styled from "styled-components";
import { grayColor, dimens, screenSize } from "@constants";

interface SearchButtonProps {
  active: boolean;
  onClick: Function;
}

export const SearchButton = ({ active, onClick }: SearchButtonProps) => (
  <$Container onClick={onClick} active={active}>
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13.2125 12.3516L9.15469 8.29375C9.78438 7.47969 10.125 6.48438 10.125 5.4375C10.125 4.18438 9.63594 3.00938 8.75156 2.12344C7.86719 1.2375 6.68906 0.75 5.4375 0.75C4.18594 0.75 3.00781 1.23906 2.12344 2.12344C1.2375 3.00781 0.75 4.18438 0.75 5.4375C0.75 6.68906 1.23906 7.86719 2.12344 8.75156C3.00781 9.6375 4.18438 10.125 5.4375 10.125C6.48438 10.125 7.47813 9.78438 8.29219 9.15625L12.35 13.2125C12.3619 13.2244 12.376 13.2339 12.3916 13.2403C12.4071 13.2467 12.4238 13.2501 12.4406 13.2501C12.4575 13.2501 12.4741 13.2467 12.4897 13.2403C12.5052 13.2339 12.5194 13.2244 12.5313 13.2125L13.2125 12.5328C13.2244 12.5209 13.2339 12.5068 13.2403 12.4912C13.2467 12.4757 13.2501 12.459 13.2501 12.4422C13.2501 12.4254 13.2467 12.4087 13.2403 12.3931C13.2339 12.3776 13.2244 12.3635 13.2125 12.3516ZM7.9125 7.9125C7.25 8.57344 6.37188 8.9375 5.4375 8.9375C4.50313 8.9375 3.625 8.57344 2.9625 7.9125C2.30156 7.25 1.9375 6.37188 1.9375 5.4375C1.9375 4.50313 2.30156 3.62344 2.9625 2.9625C3.625 2.30156 4.50313 1.9375 5.4375 1.9375C6.37188 1.9375 7.25156 2.3 7.9125 2.9625C8.57344 3.625 8.9375 4.50313 8.9375 5.4375C8.9375 6.37188 8.57344 7.25156 7.9125 7.9125Z" />
    </svg>
  </$Container>
);

const $Container = styled.button`
  position: relative;
  width: 35px;
  height: 35px;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 0 1px ${grayColor["200"]};
  background-color: ${({ active }) => (active ? grayColor["600"] : "white")};
  transition: ${dimens.transition};
  cursor: pointer;

  @media screen and (min-width: ${screenSize.PC}) {
    width: 45px;
    height: 45px;
    svg{
      transform: scale(1.3);
    }
  }

  @media screen and (max-width: ${screenSize.PC}) {
    width: 35px;
    height: 35px;
  }

  svg {
    path {
      transition: ${dimens.transition};
      fill: ${grayColor["600"]};
    }
  }

  &:hover {
    background-color: ${grayColor["600"]};
    svg {
      path {
        fill: ${grayColor["200"]};
      }
    }
  }

  &:active {
    background-color: ${grayColor["800"]};
    svg {
      path {
        fill: ${grayColor["200"]};
      }
    }
  }
`;
