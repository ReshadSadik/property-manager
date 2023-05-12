import { ThemeProvider } from "@emotion/react";
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../shared/context/AuthContext";
import { defaultTheme } from "../shared/theme";
import { AgentCardProp } from "../interfaces/agent";

export const ContextProviderContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authToken, setAuthToken] = useState<string | undefined>(undefined);
  const [error, setError] = useState("");
  const [userDetails, setUserDetails] = useState<AgentCardProp | undefined>();
  return (
    <ThemeProvider theme={defaultTheme}>
      <AuthContext.Provider
        value={{
          authToken,
          setAuthToken,
          error,
          setError,
          userDetails,
          setUserDetails,
        }}
      >
        <BrowserRouter>{children}</BrowserRouter>
      </AuthContext.Provider>
    </ThemeProvider>
  );
};
