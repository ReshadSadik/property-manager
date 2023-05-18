import React from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  TextField,
  Stack,
  Rating,
} from "@mui/material";

import CustomButton from "../common/CustomButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { axiosOpen } from "../../services/api/axios";
import { useNavigate } from "react-router-dom";
interface ReviewFormProps {
  message: string;
  rating: number;
}
const ReviewForm = ({ propertyId, email }: any) => {
  const navigate = useNavigate();

  const [value, setValue] = React.useState<number | null>(0);
  const {
    formState: { isSubmitting, errors },
    register,
    handleSubmit,
  } = useForm<ReviewFormProps>();

  const onSubmit: SubmitHandler<ReviewFormProps> = async (data) => {
    const reviewObject = {
      ...data,
      rating: value,
      email: email,
    };
    try {
      const response = await axiosOpen.post(
        `reviews/${propertyId}`,
        reviewObject
      );
      if (response.status === 200) {
        window.alert("review added successfully. please approve first");
        navigate("/reviews");
      }
    } catch (error) {}
  };
  return (
    <Stack
      sx={{ borderRadius: "5px" }}
      marginTop={3}
      padding="20px 20px 0 20px"
      justifyContent="flex-end"
      direction="column"
    >
      <Box mt={1.5} borderRadius="15px">
        <form
          noValidate
          style={{
            marginTop: "20px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d",
              }}
            >
              Rate us !
            </FormHelperText>
            <Rating
              size="large"
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            <FormControl sx={{ margin: "20px 0 10px 0px" }}>
              <TextField
                fullWidth
                error={errors.message ? true : false}
                required
                id="outlined-basic"
                color="info"
                variant="outlined"
                placeholder="tell us what you think..."
                helperText={errors.message ? `a message is required` : ""}
                {...register("message", { required: true })}
              />
            </FormControl>
          </FormControl>

          <CustomButton
            fullWidth
            type="submit"
            title={isSubmitting ? "Submitting..." : "Submit"}
            backgroundColor="#475be8"
            color="#fcfcfc"
            sx={{ padding: "5px" }}
          />
        </form>
      </Box>
    </Stack>
  );
};

export default ReviewForm;
