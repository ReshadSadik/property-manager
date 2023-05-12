import { EmailOutlined, LocationCity, Phone, Place } from "@mui/icons-material";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

import { AgentCardProp, InfoBarProps } from "../../interfaces/agent.d";
import CustomButton from "../common/CustomButton";
import { useAuth } from "../../shared/hooks/useAuth";

const InfoBar = ({ icon, name }: InfoBarProps) => (
  <Stack
    flex={1}
    minWidth={{ xs: "100%", sm: 300 }}
    gap={1}
    direction="row"
    alignItems="center"
  >
    {icon}
    <Typography variant="body2">{name}</Typography>
  </Stack>
);

const AgentCard = ({
  id,
  name,
  email,
  avatar,
  noOfProperties,
  role,
}: AgentCardProp) => {
  const theme = useTheme();
  const { userDetails } = useAuth();
  const generateLink = () => {
    // if (currentUser.email === email) return "/my-profile";
    if (true) return "/my-profile";

    return `/agents/show/${id}`;
  };

  const handleManager = () => {};
  return (
    <Box
      component={Link}
      to={generateLink()}
      width="100%"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        gap: "20px",
        padding: "20px",
        borderRadius: "10px",
        textDecoration: "none",

        "&:hover": {
          boxShadow: "0 22px 45px 2px rgba(176,176,176,0.1)",
        },
      }}
    >
      <Box width={{ md: 250, xs: "100%" }} height={{ lg: 200, xs: 150 }}>
        <img
          src={
            avatar
              ? avatar
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
          }
          alt="user"
          width="100%"
          height="100%"
          style={{ borderRadius: 8, objectFit: "cover" }}
        />
      </Box>
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems=""
        flex={1}
        gap={{ xs: 4, sm: 2 }}
      >
        <Box>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            gap={5}
          >
            <Typography textTransform="capitalize" variant="h3">
              {name}
            </Typography>
            {userDetails?.role === "manager" ? (
              <CustomButton
                title="Make A Manager"
                handleClick={handleManager}
                backgroundColor="#475be8"
                color="#fcfcfc"
                sx={{ fontSize: "12px", padding: "7px " }}
              ></CustomButton>
            ) : (
              ""
            )}
          </Stack>
          <Typography textTransform="capitalize" variant="body2" mt={1}>
            {role}
          </Typography>
        </Box>
        <Stack marginBottom={1} direction="column" rowGap={2}>
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
            gap={2}
          >
            <InfoBar
              icon={
                <EmailOutlined
                  sx={{ color: theme.palette.text.secondary, fontSize: "17px" }}
                />
              }
              name={email}
            />
            <InfoBar
              icon={
                <LocationCity
                  sx={{ color: theme.palette.text.secondary, fontSize: "17px" }}
                />
              }
              name={`${noOfProperties} Properties`}
            />
          </Stack>
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
            gap={2}
          >
            <InfoBar
              icon={
                <Phone
                  sx={{ color: theme.palette.text.secondary, fontSize: "17px" }}
                />
              }
              name="+502-3231-4141"
            />
            <InfoBar
              icon={
                <Place
                  sx={{ color: theme.palette.text.secondary, fontSize: "17px" }}
                />
              }
              name="London"
            />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default AgentCard;
