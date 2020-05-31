import { ReactNode } from "react";
import styled from "styled-components";
import { grayColor, blueColor, dimens } from "@constants";
import { BaseButtonProps, ButtonThemes } from "@interfaces";

export const BaseButton = ({
  children,
  theme = ButtonThemes.PRIMARY,
  onClick,
}: BaseButtonProps) => (
  <$Container theme={theme} onClick={onClick}>
    {children}
  </$Container>
);

const $Container = styled.button`
  position: relative;
  outline: none;
  font-size: 14px;
  font-weight: 400;
  border: none;
  cursor: pointer;
  color: ${({ theme }) =>
    theme === ButtonThemes.PRIMARY ? grayColor["200"] : blueColor["900"]};
  padding: 6.5px 20px 6.5px 20px;
  border-radius: ${dimens.borderRadius};
  transition: ${dimens.transition};
  background-color: ${({ theme }) =>
    theme === ButtonThemes.PRIMARY ? blueColor["500"] : "white"};
  box-shadow: ${({ theme }) =>
    theme === ButtonThemes.SECONDARY
      ? `0 0 0 1px ${blueColor["300"]} inset`
      : "none"};

  &:hover {
    color: ${({ theme }) =>
      theme === ButtonThemes.PRIMARY ? grayColor["200"] : grayColor["100"]};
    background-color: ${({ theme }) =>
      theme === ButtonThemes.PRIMARY ? blueColor["700"] : blueColor["200"]};
    box-shadow: none;
  }

  &:active {
    color: ${({ theme }) =>
      theme === ButtonThemes.PRIMARY ? grayColor["200"] : grayColor["100"]};
    background-color: ${({ theme }) =>
      theme === ButtonThemes.PRIMARY ? blueColor["900"] : blueColor["400"]};
    box-shadow: none;
  }
`;
