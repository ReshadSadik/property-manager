import { AgentCardProp } from "./agent";
import { ReviewProps } from "./review";
export interface FormFieldProp {
  title: string;
  labelName: string;
}

export interface FormValues {
  title: string;
  description: string;
  propertyType: string;
  location: string;
  price: number | undefined;
}

export interface PropertyCardProps {
  _id?: string | undefined;
  title: string;
  location: string;
  price: string;
  photo: string;
  loading: boolean;
}
export interface PropertyProps {
  _id: string;
  title: string;
  location: string;
  price: string;
  description: string;
  propertyType: string;
  photo: string;
  creator: {
    name: string;
    id: AgentCardProp;
  };
  reviews: [ReviewProps];
}
