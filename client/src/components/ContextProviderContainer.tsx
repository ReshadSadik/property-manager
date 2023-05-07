import { ThemeProvider } from "@emotion/react";
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../shared/context/AuthContext";
import { defaultTheme } from "../shared/theme";

export const ContextProviderContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authToken, setAuthToken] = useState<string | undefined>(undefined);
  const [error, setError] = useState("");
  return (
    <ThemeProvider theme={defaultTheme}>
      <AuthContext.Provider
        value={{ authToken, setAuthToken, error, setError }}
      >
        <BrowserRouter>{children}</BrowserRouter>
      </AuthContext.Provider>
    </ThemeProvider>
  );
};
