import { ArrowBack, Email, Phone, Place } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import { PropertyCardProps, PropertyProps } from "../../interfaces/property";
import PropertyCard from "./PropertyCard";
import { ProfileProps } from "../../interfaces/common";
import { useNavigate } from "react-router-dom";
import PieChart from "../charts/PieChart";

function checkImage(url: any) {
  const img = new Image();
  img.src = url;
  return img.width !== 0 && img.height !== 0;
}

const MyProfileComponent = ({
  type,
  name,
  avatar,
  email,
  properties,
  loading,
  role,
}: ProfileProps) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
        <IconButton
          sx={{ padding: 0, paddingRight: 1, paddingTop: 0.7 }}
          onClick={() => {
            navigate("/agents");
          }}
        >
          <ArrowBack color="action"></ArrowBack>
        </IconButton>
        <Typography variant="h1">My Profile</Typography>
      </Box>
      <Box mt="20px" borderRadius="15px">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "330px 1fr" },
            gap: 4,
          }}
        >
          {/* primary section */}
          {loading ? (
            <Box sx={{ pt: 0.5 }}>
              <Skeleton sx={{ transform: "none" }} width={330} height="100%" />
            </Box>
          ) : (
            <Box
              width={{ md: 330, xs: "100%" }}
              borderRadius="10px"
              height="100%"
            >
              <Box
                display="flex"
                justifyContent="center"
                flexDirection="column"
                gap={8}
              >
                <PieChart
                  title="Total Listings"
                  value={1050}
                  series={[55, 45]}
                  colors={["#FE6D8E", "#E4E8EF"]}
                  sx={{ width: "auto" }}
                  padding={4}
                />
                <PieChart
                  title="Properties Sold"
                  value={650}
                  series={[60, 40]}
                  colors={["#c4e8ef", "#2ED480"]}
                  sx={{ width: "auto" }}
                  padding={4}
                />

                <PieChart
                  title="Properties Rent"
                  value={400}
                  series={[75, 25]}
                  colors={["#275be8", "#c4e8ef"]}
                  sx={{ width: "auto" }}
                  padding={4}
                />
              </Box>
            </Box>
          )}
          {/* details section */}
          {loading ? (
            <Box
              height={488}
              display="flex"
              flexDirection="column"
              sx={{ pt: 2, pl: 2 }}
              gap={5}
            >
              <Skeleton width="10%" />
              <Skeleton width="50%" height="100px" />
              <Box>
                <Skeleton width="40%" />
                <Skeleton width="40%" />
                <Skeleton width="40%" />
                <Skeleton width="40%" />
              </Box>
              <Skeleton width="90%" height="250px" sx={{ marginTop: 5 }} />
            </Box>
          ) : (
            <Box
              flex={1}
              sx={{
                background: "#fcfcfc",
                padding: "20px 20px 20px 20px",
                borderRadius: "10px",
              }}
            >
              <Box
                width={{ xs: "100%" }}
                borderRadius="10px"
                height="100%"
                sx={{}}
              >
                {/* image */}
                <Stack direction="row" alignItems="flex-end">
                  <Avatar
                    src={
                      avatar
                        ? avatar
                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                    }
                    sx={{
                      marginLeft: "15px",
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                    }}
                  ></Avatar>
                  <Stack direction="column" paddingLeft={2}>
                    <Typography variant="h3" textTransform="capitalize">
                      {name}
                    </Typography>
                    <Typography variant="body2" textTransform="capitalize">
                      {role}
                    </Typography>
                  </Stack>
                </Stack>
                {/* text */}
                <Stack
                  direction="row"
                  marginTop={4}
                  marginLeft="15px"
                  gap={3}
                  paddingBottom={2}
                >
                  <Stack direction="column" gap={2}>
                    <Typography variant="body2">Age:</Typography>
                    <Typography variant="body2">City:</Typography>
                    <Typography variant="body2">Country:</Typography>
                    <Typography variant="body2">{role} ID:</Typography>
                    <Typography variant="body2">Phone:</Typography>
                    <Typography variant="body2">Email:</Typography>
                  </Stack>
                  <Stack direction="column" gap={2}>
                    <Typography variant="body1" fontWeight={400}>
                      26
                    </Typography>
                    <Typography variant="body1" fontWeight={400}>
                      New York City
                    </Typography>
                    <Typography variant="body1" fontWeight={400}>
                      USA
                    </Typography>
                    <Typography variant="body1" fontWeight={400}>
                      #18457 865 8745
                    </Typography>
                    <Typography variant="body1" fontWeight={400}>
                      +021 541 236 4580
                    </Typography>
                    <Typography variant="body1" fontWeight={400}>
                      {email}
                    </Typography>
                  </Stack>
                </Stack>
                <Divider sx={{ margin: "20px 0" }} />
                <Typography
                  fontSize="16px"
                  fontWeight={300}
                  color="#808191"
                  lineHeight={1.5}
                >
                  Talent customers tend to earn a basic salary in the range of
                  £15,000 to £35,000 per <br /> annum. However, talented
                  customers also earn a commission for finding their client's
                  work. <br /> Typically, agents receive around 10% of what the
                  client is paid.
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      {properties?.length > 0 && (
        <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#FCFCFC">
          <Typography fontSize={18} fontWeight={600} color="#11142D">
            My Properties
          </Typography>

          <Box
            mt="20px"
            sx={{
              backgroundColor: "#fcfcfc",
              height: "auto",
              borderRadius: "15px",
              padding: "10px",
              display: "grid",
              gridGap: "10px",
              gridTemplateColumns: {
                md: "repeat(2, 1fr)",
                xs: "repeat(1, 1fr)",
              },
            }}
          >
            {(loading ? Array.from(new Array(4)) : properties).map(
              (property: PropertyCardProps) => (
                <PropertyCard
                  key={property?._id}
                  _id={property?._id}
                  title={property?.title}
                  location={property?.location}
                  price={property?.price}
                  photo={property?.photo}
                  loading={false}
                />
              )
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MyProfileComponent;
