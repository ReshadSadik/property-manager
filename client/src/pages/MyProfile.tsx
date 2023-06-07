import { useEffect, useState } from "react";
import { axiosOpen } from "../services/api/axios";
import { AgentCardProp } from "../interfaces/agent.d";
import { useAuth } from "../shared/hooks/useAuth";
import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import AccountProfile from "../components/user/AccountProfile";
import { AccountProfileDetails } from "../components/user/AccountProfileDetails";
import { PieChart, PropertyCard } from "../components";
import { PropertyCardProps } from "../interfaces/property";

const MyProfile = () => {
  const [loading, setLoading] = useState(true);
  const { userDetails } = useAuth();
  const [myDetails, setMyDetails] = useState<AgentCardProp>({
    name: "",
    email: "",
    avatar: "",
    role: "",
    reviews: [],
    allProperties: [],
  });
  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await axiosOpen.get(`/users/${userDetails?._id}`);
      if (response.status == 200) {
        setMyDetails(response?.data?.agent);
        setLoading(false);
      }
    })();
  }, []);
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
      <Box sx={{ background: "#FCFCFC", borderRadius: "10px", padding: 1 }}>
        <Box mt="20px" borderRadius="15px">
          {/* details section */}
          {loading ? (
            <Box
              height={520}
              display="flex"
              flexDirection="column"
              sx={{ pt: 2, pl: 2 }}
              gap={10}
              justifyContent="space-between"
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
            <Box component="main">
              <Container maxWidth="xl">
                <Stack spacing={3}>
                  <div>
                    <Grid container spacing={3}>
                      <Grid xs={12} md={6} lg={4}>
                        <AccountProfile />
                      </Grid>
                      <Grid xs={12} md={6} lg={8}>
                        <AccountProfileDetails />
                      </Grid>
                    </Grid>
                  </div>
                </Stack>
              </Container>
            </Box>
          )}
        </Box>
        {myDetails?.allProperties?.length > 0 && (
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
                <Skeleton
                  sx={{ transform: "none" }}
                  width={330}
                  height="100%"
                />
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
                    value={myDetails?.allProperties?.length}
                    series={[myDetails?.allProperties?.length, 45]}
                    colors={["#FE6D8E", "#E4E8EF"]}
                    sx={{ width: "auto" }}
                    padding={4}
                  />
                  <PieChart
                    title="Properties Review"
                    value={myDetails?.reviews?.length}
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
                {(loading
                  ? Array.from(new Array(4))
                  : myDetails?.allProperties
                ).map((property: PropertyCardProps) => (
                  <PropertyCard
                    key={property?._id}
                    _id={property?._id}
                    title={property?.title}
                    location={property?.location}
                    price={property?.price}
                    photo={property?.photo}
                    loading={false}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MyProfile;
