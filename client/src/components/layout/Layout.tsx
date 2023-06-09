import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Outlet } from "react-router-dom";
import QrCodeIcon from "@mui/icons-material/QrCode";
import {
  AccountCircleOutlined,
  ChatBubbleOutline,
  PeopleAltOutlined,
  StarOutlineRounded,
  VillaOutlined,
} from "@mui/icons-material";

import { Header, DrawerLarge } from "../../components";
import { ALL_ROUTES } from "../../shared/routes";
//layout title changed
const sidebarList = [
  { title: "Dashboard", link: "", icon: QrCodeIcon },
  { title: "Properties", link: ALL_ROUTES.PROPERTIES, icon: VillaOutlined },
  { title: "Agents", link: ALL_ROUTES.AGENTS, icon: PeopleAltOutlined },
  { title: "Reviews", link: ALL_ROUTES.REVIEWS, icon: StarOutlineRounded },
  { title: "Messages", link: ALL_ROUTES.MESSAGES, icon: ChatBubbleOutline },
  {
    title: "My Profile",
    link: ALL_ROUTES.MY_PROFILE,
    icon: AccountCircleOutlined,
  },
  { title: "Sign out", link: "/auth", icon: LogoutOutlinedIcon },
];

export function DashboardContainer() {
  const [open, setOpen] = React.useState(true);

  const toggleDrawerLarge = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    const width = window.screen.availWidth;
    if (width < 900) {
      setOpen(false);
    }
  }, []);
  // const theme = useTheme();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header
        open={open}
        sidebarList={sidebarList}
        toggleDrawerLarge={toggleDrawerLarge}
      />

      <DrawerLarge
        open={open}
        sidebarList={sidebarList}
        toggleDrawerLarge={toggleDrawerLarge}
      ></DrawerLarge>

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey.A200
              : theme.palette.common.black,
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth={false} sx={{ mt: 3, mb: 4 }}>
          <Outlet></Outlet>
        </Container>
      </Box>
    </Box>
  );
}
