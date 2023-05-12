import { BaseKey } from "@refinedev/core";

export interface AgentCardProp {
  id?: BaseKey | undefined;
  name: string;
  email: string;
  avatar: string;
  noOfProperties: number;
  role: string;
  status?: string;
}

export interface InfoBarProps {
  icon: ReactNode;
  name: string;
}
