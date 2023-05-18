import { Avatar, Box, Rating, Stack, Typography } from "@mui/material";
import CustomButton from "./common/CustomButton";
import { ReviewProps } from "../interfaces/review";
import { axiosOpen } from "../services/api/axios";
import { useNavigate } from "react-router-dom";

const Review = ({
  message,
  rating,
  status,
  creator,
  _id,
  property,
  details = false,
}: ReviewProps) => {
  const navigate = useNavigate();

  const handleApproveReview = async () => {
    try {
      const res = await axiosOpen.patch(`/reviews/${_id}`);
      if (res.status === 200) {
        window.alert("review approved successfully!");
        navigate(`/properties/view/${property}`);
      }
    } catch (error) {}
  };
  return (
    <Box
      sx={{
        display: details ? "block" : "grid",
        gridTemplateColumns: details ? "300px auto" : "300px auto 300px",
        background: "#fcfcfc",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <Stack direction="row" gap={1}>
        <Avatar
          src={creator?.id?.avatar}
          sx={{
            height: details ? 50 : 70,
            width: details ? 50 : 70,
            borderRadius: "10px",
          }}
        ></Avatar>
        <Stack direction="column" gap={details ? 0 : 1}>
          {details ? (
            ""
          ) : (
            <Typography variant="body1" color="#475BE8">
              #CO1234
            </Typography>
          )}
          <Typography variant="h6">{creator?.name}</Typography>
          <Typography variant="body2">24-05-2022</Typography>
        </Stack>
      </Stack>
      <Box>
        {details ? (
          <Box marginTop={1}>
            <Rating readOnly name="size-large" defaultValue={rating} />
          </Box>
        ) : (
          ""
        )}
        <Typography variant="body2" marginBottom={details ? 0 : 2}>
          {message}
        </Typography>
      </Box>
      {details ? (
        ""
      ) : (
        <Box marginLeft="auto">
          <Stack direction="column" gap={2}>
            <Stack direction="row" gap={2} alignItems="center">
              <Typography variant="h3">{rating}.0</Typography>
              <Rating
                readOnly
                name="size-large"
                defaultValue={rating}
                size="large"
              />
            </Stack>
            <Stack direction="row" justifyContent="flex-end" gap={2}>
              <CustomButton
                handleClick={
                  status === "approved" ? undefined : handleApproveReview
                }
                backgroundColor={
                  status === "approved" ? "#2ed480" : "transparent"
                }
                color={status === "approved" ? "#000000" : "red"}
                title={status === "approved" ? "approved" : "approve now "}
                type="edit"
                sx={{
                  padding: "4px 0",
                  border: status === "approved" ? "none" : "1px solid #33a86d",
                  cursor: status === "approved" ? "default" : "pointer",
                }}
              />
            </Stack>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Review;
