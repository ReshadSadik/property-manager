import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import { DrawerSmall } from "../../components";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth = 250;
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

const Header = ({ open, toggleDrawerLarge, sidebarList }: any) => {
  const theme = useTheme();
  const [state, setState] = React.useState(false);
  const toggleDrawerSmall = (open: boolean) => {
    setState(open);
  };
  return (
    <AppBar
      elevation={0}
      position="absolute"
      sx={{
        background: theme.palette.grey.A100,
        color: theme.palette.primary.main,
      }}
    >
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

            display: { md: "flex", xs: "none" },
          }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ display: { md: "none", xs: "flex" } }}>
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
  );
};

export default Header;
