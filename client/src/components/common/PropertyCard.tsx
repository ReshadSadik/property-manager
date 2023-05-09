import { Place } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Stack,
} from "@mui/material";

import { PropertyCardProps } from "../../interfaces/property";

const PropertyCard = ({
  _id,
  title,
  location,
  price,
  photo,
}: PropertyCardProps) => {
  return (
    <Card
      component={Link}
      to={`/properties/show/${_id}`}
      sx={{
        padding: "10px",
        display: "grid",
        gridTemplateColumns: { md: "230px auto", sm: "120px auto" },
        height: "auto",

        "&:hover": {
          boxShadow: "0 22px 45px 2px rgba(176, 176, 176, 0.1)",
        },
        cursor: "pointer",
      }}
      elevation={0}
    >
      <CardMedia
        component="img"
        image={photo}
        alt="card image"
        sx={{
          borderRadius: "10px",
          height: { md: 130, xs: 70 },
          width: { md: 220, xs: 115 },
        }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "10px",

          paddingX: "5px",
        }}
      >
        <Stack direction="column" gap={1}>
          <Box
            px={1.5}
            py={0.5}
            borderRadius={1}
            bgcolor="#dadefa"
            height="fit-content"
          >
            {" "}
            <Typography fontSize={12} fontWeight={600} color="#475be8">
              ${price}
            </Typography>
          </Box>

          <Typography fontSize={16} fontWeight={500} color="#11142d">
            {title}
          </Typography>
          <Stack direction="row" gap={0.5} alignItems="flex-start">
            <Place
              sx={{
                fontSize: 18,
                color: "#11142d",
                marginTop: 0.5,
              }}
            />
            <Typography fontSize={14} color="#808191">
              {location}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
