import { ReactNode } from "react";

export enum ButtonThemes {
  PRIMARY="primary",
  SECONDARY="secondary",
}

export interface BaseButtonProps {
  children?: ReactNode;
  theme?: ButtonThemes;
  onClick: (props: any) => any;
}
