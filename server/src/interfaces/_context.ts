import { Connection } from "typeorm";

export interface ContextProps {
  user?: any;
  connection: Connection;
}
