import { Dispatch, SetStateAction, createContext } from "react";
import { AgentCardProp } from "../../interfaces/agent";

export type AuthContextProps = {
  authToken: string | undefined;
  setAuthToken: Dispatch<SetStateAction<string | undefined>>;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
  userDetails: AgentCardProp | undefined;
  setUserDetails: Dispatch<SetStateAction<AgentCardProp | undefined>>;
};

export const AuthContext = createContext<AuthContextProps>({
  authToken: undefined,
  setAuthToken: () => {},
  error: "",
  setError: () => {},
  userDetails: {
    _id: undefined,
    name: "",
    email: "",
    avatar: "",
    allProperties: [],
    role: "",
    status: undefined,
  },
  setUserDetails: () => {},
});
