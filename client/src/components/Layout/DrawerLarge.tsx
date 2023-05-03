import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { NavLink } from "react-router-dom";
import { Tooltip } from "@mui/material";

const drawerWidth = 250;
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
        width: theme.spacing(10),
      },
    }),
  },
}));
const DrawerLarge = ({ open, toggleDrawerLarge, sidebarList, state }: any) => {
  const theme = useTheme();

  return (
    <Drawer
      sx={{ display: { md: "flex", xs: "none" } }}
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
        <IconButton color={"success"} onClick={toggleDrawerLarge}>
          <ChevronLeftIcon color="primary" />
        </IconButton>
      </Toolbar>

      <List component="nav" sx={{ margin: open ? "0 16px" : "0 6px" }}>
        {sidebarList.map((sidebar: any) => (
          <NavLink
            key={sidebar.title}
            to={sidebar.link}
            style={{ textDecoration: "none" }}
          >
            {({ isActive }) => (
              <ListItemButton
                sx={{
                  background: isActive ? theme.palette.primary.main : "#fcfcfc",
                  borderRadius: "12px",
                  ":hover": {
                    background: isActive
                      ? theme.palette.primary.main
                      : "#f6f5ff",
                  },
                }}
              >
                <Tooltip
                  title={!open ? sidebar.title : ""}
                  placement="right-end"
                >
                  <ListItemIcon
                    sx={{
                      justifyContent: "center",
                      minWidth: 36,
                      color: isActive
                        ? theme.palette.common.white
                        : theme.palette.text.secondary,
                    }}
                  >
                    <sidebar.icon />
                  </ListItemIcon>
                </Tooltip>
                <ListItemText
                  primary={sidebar.title}
                  primaryTypographyProps={{
                    noWrap: true,
                    fontSize: "16px",
                    color: isActive
                      ? theme.palette.grey.A100
                      : theme.palette.text.secondary,
                  }}
                />
              </ListItemButton>
            )}
          </NavLink>
        ))}
        <Divider sx={{ my: 1 }} />
        {/* {secondaryListItems} */}
      </List>
    </Drawer>
  );
};

export default DrawerLarge;
