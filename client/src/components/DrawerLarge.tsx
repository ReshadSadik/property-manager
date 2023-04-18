import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";

import Divider from "@mui/material/Divider";

import { NavLink } from "react-router-dom";

const drawerWidth = 220;
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }: any) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
    },
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",

      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: 0,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const DrawerLarge = ({ open, toggleDrawerLarge, sidebarList, state }: any) => {
  return (
    <Drawer
      sx={{ display: { sm: "flex", xs: "none" } }}
      variant="permanent"
      open={open}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawerLarge}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {sidebarList.map((sidebar: any) => (
          <NavLink
            key={sidebar.title}
            to={sidebar.link}
            style={({ isActive }) => ({
              color: isActive ? "blue" : "#545e6f",
              background: isActive ? "white" : "#f0f0f0",
            })}
          >
            <ListItemButton>
              <ListItemIcon>
                <sidebar.icon />
              </ListItemIcon>
              <ListItemText primary={sidebar.title} />
            </ListItemButton>
          </NavLink>
        ))}

        <Divider sx={{ my: 1 }} />
        {/* {secondaryListItems} */}
      </List>
    </Drawer>
  );
};

export default DrawerLarge;
