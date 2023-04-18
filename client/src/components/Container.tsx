import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Outlet } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import LayersIcon from "@mui/icons-material/Layers";
import DrawerLarge from "./DrawerLarge";
import DrawerSmall from "./DrawerSmall";
import CameraAlt from "@mui/icons-material/CameraAlt";
import QrCodeIcon from "@mui/icons-material/QrCode";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth = 220;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const sidebarList = [
  { title: "dashboard", link: "", icon: DashboardIcon },
  { title: "products", link: "products", icon: ShoppingCartIcon },
  { title: "scan", link: "scan", icon: CameraAlt },
  { title: "barcode", link: "barcode", icon: QrCodeIcon },
  { title: "category", link: "category", icon: PeopleIcon },
  { title: "brand", link: "brand", icon: LayersIcon },
  { title: "signOut", link: "stock", icon: AccountCircleIcon },
];

export function DashboardContainer() {
  const [open, setOpen] = React.useState(true);
  const [state, setState] = React.useState(false);
  const toggleDrawerLarge = () => {
    setOpen(!open);
  };

  const toggleDrawerSmall = (open: boolean) => {
    setState(open);
  };

  React.useEffect(() => {
    const width = window.screen.availWidth;
    if (width < 900) {
      setOpen(false);
    }
  }, []);

  const mdTheme = createTheme();

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute">
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawerLarge}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),

                display: { sm: "flex", xs: "none" },
              }}
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ display: { sm: "none", xs: "flex" } }}>
              <MenuIcon
                sx={{ marginRight: "36px" }}
                onClick={() => {
                  toggleDrawerSmall(true);
                }}
              ></MenuIcon>
              <DrawerSmall
                state={state}
                open={open}
                sidebarList={sidebarList}
                toggleDrawerSmall={toggleDrawerSmall}
              ></DrawerSmall>
            </Box>

            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              INVENTORY
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={2} color="secondary">
                <AccountCircleIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>

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
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Outlet></Outlet>
            hello
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
