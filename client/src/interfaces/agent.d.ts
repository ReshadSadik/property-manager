import { BaseKey } from "@refinedev/core";
import { PropertyProps } from "./common";

export interface AgentCardProp {
  _id?: BaseKey | undefined;
  name: string;
  email: string;
  avatar: string;
  allProperties: PropertyProps[];
  role: string;
  status?: string;
}

export interface InfoBarProps {
  icon: ReactNode;
  name: string;
}
