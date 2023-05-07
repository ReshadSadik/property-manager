import { Dispatch, SetStateAction, createContext } from "react";

export type AuthContextProps = {
  authToken: string | undefined;
  setAuthToken: Dispatch<SetStateAction<string | undefined>>;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
};

export const AuthContext = createContext<AuthContextProps>({
  authToken: undefined,
  setAuthToken: () => {},
  error: "",
  setError: () => {},
});
