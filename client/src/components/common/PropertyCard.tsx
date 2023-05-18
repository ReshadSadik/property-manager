import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { Link } from "react-router-dom";
import {
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Stack,
  CardActions,
  useTheme,
  Skeleton,
} from "@mui/material";

import { PropertyCardProps } from "../../interfaces/property";

const PropertyCard = ({
  _id,
  title,
  location,
  price,
  photo,
  loading,
}: PropertyCardProps) => {
  const theme = useTheme();
  console.log(title);

  return (
    <Card
      component={Link}
      to={`/properties/view/${_id}`}
      sx={{
        padding: "20px",
        display: "grid",
        borderRadius: "10px",
        gridTemplateColumns: {
          lg: "220px auto",
          sm: "150px auto",
          xs: "115px auto",
        },
        height: "auto",

        "&:hover": {
          boxShadow: "0 22px 45px 2px rgba(176, 176, 176, 0.2)",
        },
        background: "#fcfcfc",
        cursor: "pointer",
        textDecoration: "none",
      }}
      elevation={0}
    >
      {!loading ? (
        <CardMedia
          component="img"
          image={photo}
          alt="card image"
          sx={{
            borderRadius: "10px",
            height: { lg: 125, sm: 100, xs: 70 },
            width: { lg: 220, sm: 150, xs: 115 },
          }}
        />
      ) : (
        <Skeleton
          animation="pulse"
          variant="rectangular"
          width={210}
          height={118}
        />
      )}
      {!loading ? (
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "5px",
            padding: "0 0 2px 10px",
            textAlign: "left",
            ":last-child": {
              paddingBottom: 0,
            },
          }}
        >
          <Stack direction="column" gap={1} justifyContent="space-between">
            {" "}
            <Typography
              variant="subtitle2"
              sx={{
                background: "#DADEFA",
                padding: "5px 15px",
                borderRadius: "5px",
              }}
              width="fit-content"
              color="#475be8"
            >
              $ {price}
            </Typography>
            <Typography
              variant="h6"
              fontSize={{ md: "16px", xs: "12px" }}
              fontWeight={{ md: 600, xs: 500 }}
            >
              {title}
            </Typography>
            <Stack direction="row" gap={0.5} alignItems="flex-start">
              <LocationOnOutlinedIcon
                sx={{
                  fontSize: 20,
                  color: "#808191",
                  marginTop: 0.2,
                }}
              />
              <Typography variant="body2">{location}</Typography>
            </Stack>
            <CardActions sx={{ padding: "0 0 0 4px" }}>
              <Stack direction="row" gap={1.5} alignItems="flex-start">
                <Stack direction="row" gap={0.5} alignItems="flex-start">
                  <BedOutlinedIcon
                    sx={{
                      fontSize: 18,
                      color: theme.palette.text.secondary,
                    }}
                  />
                  <Typography variant="subtitle1" fontWeight={600}>
                    6 Beds
                  </Typography>
                </Stack>
                <Stack direction="row" gap={0.5} alignItems="flex-start">
                  <FavoriteIcon
                    sx={{
                      fontSize: 15,
                      color: theme.palette.text.secondary,
                      marginTop: 0.1,
                    }}
                  />
                  <Typography variant="subtitle1" fontWeight={600}>
                    2M
                  </Typography>
                </Stack>
              </Stack>
            </CardActions>
          </Stack>
        </CardContent>
      ) : (
        <Box sx={{ pt: 0.5 }}>
          <Skeleton width="10%" />
          <Skeleton width="50%" />
          <Skeleton width="40%" />
          <Skeleton width="20%" />
        </Box>
      )}
    </Card>
  );
};

export default PropertyCard;
