import {
  Typography,
  Box,
  Stack,
  IconButton,
  Skeleton,
  Rating,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowBack,
  ChatBubble,
  Delete,
  Edit,
  Phone,
  Place,
  PlaceOutlined,
  Star,
} from "@mui/icons-material";
import { useAuth } from "../../shared/hooks/useAuth";
import { axiosOpen } from "../../services/api/axios";
import { useEffect, useState } from "react";
import { CustomButton } from "../../components";
import { PropertyProps } from "../../interfaces/property.d";
import Review from "../../components/Review";
import { ReviewProps } from "../../interfaces/review";
import ReviewForm from "../../components/property/ReviewForm";
import ReactToastify from "../../components/common/ReactToastify";

const PropertyDetails = () => {
  const navigate = useNavigate();
  const { userDetails } = useAuth();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [propertyDetails, setPropertyDetails] = useState<PropertyProps>();
  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await axiosOpen.get(`/properties/${id}`);
      if (response.status == 200) {
        setPropertyDetails(response?.data?.data[0]);
        setLoading(false);
      }
    })();
  }, []);

  const isCurrentUser =
    userDetails?.email === propertyDetails?.creator?.id?.email;

  const handleDeleteProperty = async (id: string | undefined) => {
    const response = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (response) {
      try {
        const res = await axiosOpen.delete(`/properties/${id}`);
        if (res.status === 200) {
          console.log("property deleted successfully");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Box borderRadius="15px" padding="20px" bgcolor="#FCFCFC" width="100%">
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          onClick={() => {
            navigate("/properties");
          }}
        >
          <ArrowBack color="action"></ArrowBack>
        </IconButton>
        <Typography variant="h3" textAlign="left">
          Details
        </Typography>
      </Box>

      <Box
        mt="20px"
        display="flex"
        justifyContent="space-around"
        flexDirection={{ xs: "column", md: "row" }}
        gap={4}
        flexWrap="nowrap"
      >
        <Box
          flex={1}
          display="grid"
          gridTemplateColumns="1fr 400px"
          gap={3}
          width="100%"
        >
          <Box>
            <img
              src={propertyDetails?.photo}
              alt="property_details-img"
              height={350}
              width="100%"
              style={{
                objectFit: "cover",
                borderRadius: "10px",
                display: "block",
              }}
              className="property_details-img"
            />
            <Stack></Stack>

            <Box mt="15px">
              <Stack
                direction="row"
                justifyContent="space-between"
                flexWrap="wrap"
                alignItems="center"
              >
                <Typography variant="h5" textTransform="capitalize">
                  {propertyDetails?.propertyType}
                </Typography>
                <Rating readOnly name="size-large" defaultValue={5} />
              </Stack>

              <Stack
                direction="row"
                flexWrap="wrap"
                justifyContent="space-between"
                alignItems="center"
                gap={2}
              >
                <Box>
                  <Typography variant="h3">{propertyDetails?.title}</Typography>
                  <Stack mt={0.5} direction="row" alignItems="center" gap={0.5}>
                    <PlaceOutlined sx={{ color: "#808191", fontSize: 18 }} />
                    <Typography variant="body2">
                      {propertyDetails?.location}
                    </Typography>
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="h6" textAlign="right" mt="10px">
                    Price
                  </Typography>
                  <Stack direction="row" alignItems="flex-end" gap={1}>
                    <Typography variant="h1" color="#475BE8">
                      ${propertyDetails?.price}
                    </Typography>
                    <Typography fontSize={14} color="#808191" mb={0.5}>
                      for one day
                    </Typography>
                  </Stack>
                </Box>
              </Stack>

              <Stack mt="25px" direction="column" gap="10px">
                <Typography variant="h5">Description</Typography>
                <Typography variant="body2">
                  {propertyDetails?.description}
                </Typography>
              </Stack>
            </Box>
          </Box>
          <Stack
            sx={{
              background: "#f8f5f5",
              padding: "20px",
              borderRadius: "10px",
            }}
            direction="column"
            justifyContent="space-between"
          >
            {/* review section */}
            <Stack direction="column" gap={3}>
              {propertyDetails?.reviews?.length
                ? propertyDetails?.reviews.map((review: ReviewProps) => (
                    <Review
                      details={true}
                      message={review.message}
                      rating={review.rating}
                      status={review.status}
                      creator={review.creator}
                    />
                  ))
                : "no review yet"}
            </Stack>
            {/* add review section */}
            <Stack>
              <ReviewForm
                propertyId={id}
                email={userDetails?.email}
              ></ReviewForm>
            </Stack>
          </Stack>
        </Box>

        <Box
          width="100%"
          flex={1}
          maxWidth={326}
          display="flex"
          flexDirection="column"
          gap="20px"
        >
          {loading ? (
            <Skeleton variant="rectangular" width={326} height={320} />
          ) : (
            <Stack
              width="100%"
              p={2}
              direction="column"
              justifyContent="center"
              alignItems="center"
              border="1px solid #E4E4E4"
              borderRadius={2}
            >
              <Stack
                mt={2}
                justifyContent="center"
                alignItems="center"
                textAlign="center"
              >
                <img
                  src={
                    propertyDetails?.creator
                      ? propertyDetails?.creator?.id?.avatar
                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                  }
                  alt="avatar"
                  width={90}
                  height={90}
                  style={{
                    borderRadius: "100%",
                    objectFit: "cover",
                  }}
                />

                <Box mt="15px">
                  <Typography variant="h5" fontWeight={600}>
                    {propertyDetails?.creator?.name}
                  </Typography>
                  <Typography mt="5px" variant="body2">
                    {propertyDetails?.creator?.id?.role}
                  </Typography>
                </Box>

                <Stack mt="15px" direction="row" alignItems="center" gap={1}>
                  <Place sx={{ color: "#808191" }} />
                  <Typography variant="body2">North Carolina, USA</Typography>
                </Stack>

                <Typography mt={1} variant="h6">
                  {propertyDetails?.creator?.id?.allProperties?.length}{" "}
                  Properties
                </Typography>
              </Stack>

              <Stack
                width="100%"
                mt="25px"
                direction="row"
                flexWrap="wrap"
                gap={2}
              >
                <CustomButton
                  title={!isCurrentUser ? "Message" : "Edit"}
                  backgroundColor="#475BE8"
                  color="#FCFCFC"
                  fullWidth
                  icon={!isCurrentUser ? <ChatBubble /> : <Edit />}
                  handleClick={() => {
                    if (isCurrentUser) {
                      navigate(`/properties/edit/${propertyDetails?._id}`, {
                        state: { propertyDetails: propertyDetails },
                      });
                    } else {
                      (() => {
                        window.location.href = `mailto:${propertyDetails?.creator?.id?.email}`;
                      })();
                    }
                  }}
                />
                <CustomButton
                  title={!isCurrentUser ? "Call" : "Delete"}
                  backgroundColor={!isCurrentUser ? "#2ED480" : "#d42e2e"}
                  color="#FCFCFC"
                  fullWidth
                  icon={!isCurrentUser ? <Phone /> : <Delete />}
                  handleClick={() => {
                    if (isCurrentUser) {
                      handleDeleteProperty(id);
                    } else {
                      (() => {
                        window.location.href = `tel:"+8801768111368"`;
                      })();
                    }
                  }}
                />
              </Stack>
            </Stack>
          )}

          <Stack>
            <img
              src="https://serpmedia.org/scigen/images/googlemaps-nyc-standard.png?crc=3787557525"
              width="100%"
              height={306}
              style={{ borderRadius: 10, objectFit: "cover" }}
            />
          </Stack>

          <Box>
            <CustomButton
              title="Book Now"
              backgroundColor="#475BE8"
              color="#FCFCFC"
              fullWidth
            />
          </Box>
        </Box>
      </Box>
      <ReactToastify />
    </Box>
  );
};

export default PropertyDetails;
