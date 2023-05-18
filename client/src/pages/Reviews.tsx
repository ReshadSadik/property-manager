import { useEffect, useState } from "react";
import Review from "../components/Review";
import { Box, Stack, Typography } from "@mui/material";
import { ReviewProps } from "../interfaces/review";
import { axiosOpen } from "../services/api/axios";

const Reviews = () => {
  const [reviews, setReviews] = useState<ReviewProps[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await axiosOpen.get("/reviews");
      if (response.status === 200) {
        setReviews(response?.data?.data);
        setLoading(false);
      }
    })();
  }, []);
  return (
    <Box>
      <Typography variant="h1" marginBottom={2}>
        Review List
      </Typography>
      <Stack gap={3}>
        {reviews?.map((review: ReviewProps) => (
          <Review
            key={review._id}
            _id={review._id}
            message={review.message}
            rating={review.rating}
            status={review.status}
            creator={review.creator}
            property={review.property}
          ></Review>
        ))}
      </Stack>
    </Box>
  );
};

export default Reviews;
