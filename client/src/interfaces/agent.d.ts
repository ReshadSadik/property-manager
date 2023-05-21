import { BaseKey } from "@refinedev/core";
import { PropertyProps } from "./common";
import { ReviewProps } from "./review";

export interface AgentCardProp {
  _id?: BaseKey | undefined;
  name: string;
  email: string;
  avatar: string;
  allProperties: PropertyProps[];
  reviews: ReviewProps[];
  role: string;
  status?: string;
}

export interface InfoBarProps {
  icon: ReactNode;
  name: string;
}
