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
import { Notifications, NotificationsOutlined } from "@mui/icons-material";
import { Avatar, Menu, MenuItem, Stack, Tooltip } from "@mui/material";
const settings = ["Profile", "Account", "Dashboard", "Logout"];

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
type userDetailsType = {
  name: string;
  email: string;
  role: string;
};

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
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [userDetails, setUserDetails] = React.useState<userDetailsType>();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // const getUserDetails = () => {
  //   return (
  //     (localStorage.getItem("userDetails") &&
  //       JSON.parse(localStorage.getItem("userDetails")!)) ||
  //     {}
  //   );
  // };

  React.useEffect(() => {
    console.log("working");
    setUserDetails(JSON.parse(localStorage.getItem("userDetails")!));
  }, []);
  console.log(userDetails);

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
          <Badge color="secondary">
            <NotificationsOutlined color="disabled" />
          </Badge>
        </IconButton>
        <Stack sx={{ padding: "0 20px" }} direction="column">
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#11142D",
              textAlign: "right",
            }}
          >
            {userDetails?.name}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              color: "#808191 ",
              textAlign: "right",
            }}
          >
            {/* {userDetails?.role} */}
            Company Manager
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
              <Avatar
                alt="Remy Sharp"
                src="https://media.licdn.com/dms/image/C4D03AQHXjwV7bPfPtw/profile-displayphoto-shrink_800_800/0/1648570818590?e=2147483647&v=beta&t=YvJKpJ7sSehYyXFP-6trEczbrYDNkSucA3g99oCR2f8"
              />
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
