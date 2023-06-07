import ListItemButton from "@mui/material/ListItemButton";

import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";

import Divider from "@mui/material/Divider";

import { NavLink } from "react-router-dom";

const DrawerSmall = ({ open, state, toggleDrawerSmall, sidebarList }: any) => {
  return (
    <Drawer
      open={state}
      onClose={() => {
        toggleDrawerSmall(false);
      }}
    >
      <List component="nav" sx={{ marginTop: 8, width: 220 }}>
        {sidebarList.map((sidebar: any) => (
          <NavLink
            key={sidebar.link}
            to={sidebar.link}
            onClick={() => {
              toggleDrawerSmall(false);
            }}
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

export default DrawerSmall;
