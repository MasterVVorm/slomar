import { ReactNode } from "react";
import styled from "styled-components";

interface BaseButtonProps {
  children?: ReactNode;
}

export const BaseButton = ({ children }: BaseButtonProps) => (
  <$Container>{children}</$Container>
);

const $Container = styled.button`
  position: relative;
`;
