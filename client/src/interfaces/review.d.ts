import { PropertyProps } from "./property";

export interface ReviewProps {
  _id?: string;
  message: string;
  rating: number;
  status: string;
  details?: boolean;
  creator: {
    name: string;
    id: AgentCardPro;
  };
  property?: PropertyProps[];
}
