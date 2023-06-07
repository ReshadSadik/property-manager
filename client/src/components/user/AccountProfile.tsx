import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

const AccountProfile = ({ user }: any) => {
  return (
    <Card
      sx={{
        background: "#FCFCFC",
        boxShadow:
          "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
      }}
    >
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              height: 80,
              mb: 2,
              width: 80,
            }}
          />
          <Typography gutterBottom variant="h5">
            {user.name}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            Los Angeles, California
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {user.timezone}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          component="label"
          sx={{
            width: "fit-content",
            fontSize: 16,
            textAlign: "center",
            margin: "0 auto",
          }}
        >
          Upload picture
          <input hidden accept="image/*" type="file" />
        </Button>
      </CardActions>
    </Card>
  );
};

export default AccountProfile;
