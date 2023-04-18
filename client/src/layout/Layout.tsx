/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";
import { Box } from "@mui/material";
import { DashboardContainer } from "../components/Container";

export const Layout: FC = ({ children }: any) => {
  return (
    <div
      css={css`
        min-height: 100vh;
      `}
    >
      {/* <div
        css={css`
          display: flex;
          min-height: calc(100vh - 200px);
        `}
      >
      </div> */}
      <Box component="header">
        <DashboardContainer />
      </Box>
    </div>
  );
};
