import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";

import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { DrawerSmall } from "../../components";
import { NotificationsOutlined } from "@mui/icons-material";
import { Avatar, Menu, MenuItem, Stack, Tooltip } from "@mui/material";
import { useAuth } from "../../shared/hooks/useAuth";
const settings = ["Profile", "Account", "Dashboard", "Logout"];

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
  const { userDetails } = useAuth();
  const [state, setState] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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

            display: { lg: "flex", xs: "none" },
          }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ display: { lg: "none", xs: "flex" } }}>
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
          <Badge color="secondary">
            <NotificationsOutlined color="disabled" />
          </Badge>
        </IconButton>
        <Stack sx={{ padding: "0 20px" }} direction="column">
          <Typography
            variant="body1"
            sx={{
              fontWeight: 700,
              textAlign: "right",
              textTransform: "capitalize",
            }}
          >
            {userDetails?.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: "right",
              textTransform: "capitalize",
            }}
          >
            {userDetails?.role}
          </Typography>
        </Stack>
        <Box
          sx={{
            flexGrow: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src={userDetails?.avatar} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
