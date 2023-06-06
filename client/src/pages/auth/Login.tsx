import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useForm, SubmitHandler } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../shared/hooks/useAuth";
import { axiosOpen } from "../../services/api/axios";
import { CircularProgress, Stack, Tab, Tabs } from "@mui/material";
import { green } from "@mui/material/colors";
import { toast } from "react-toastify";
import ReactToastify from "../../components/common/ReactToastify";
import React, { useCallback, useState } from "react";

interface loginType {
  email: string;
  password: string;
}
const Login = () => {
  const { setAuthToken, setUserDetails, error, setError } = useAuth();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginType>();

  const onFormSubmit: SubmitHandler<loginType> = async (data) => {
    setError("");
    try {
      const response = await axiosOpen.post("users/login", {
        email: data.email,
        password: data.password,
      });
      const user = await response.data.data;

      if (user) {
        localStorage.userDetails = JSON.stringify(user.user);
        setUserDetails(user.user);
      }
      if (user.token) {
        localStorage.authToken = JSON.stringify(user.token);
        setAuthToken(user.token);
        navigate("/", { replace: true });
      }
    } catch (error: any) {
      if (error?.code == "ERR_NETWORK") {
        toast.error(error?.message);
      } else {
        setError(error?.response?.data?.error);
      }
    }
  };
  const [method, setMethod] = useState("email");
  const handleMethodChange = useCallback(
    (event: React.FormEvent, value: string) => {
      setMethod(value);
    },
    []
  );
  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 500,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h1">Login</Typography>
              <Typography
                color="text.secondary"
                variant="h6"
                fontWeight="regular"
              >
                Don&apos;t have an account? &nbsp;
                <NavLink to="/auth/register">Register</NavLink>
              </Typography>
            </Stack>
            <Tabs onChange={handleMethodChange} sx={{ mb: 3 }} value={method}>
              <Tab label="Email" value="email" />
              <Tab label="Phone Number" value="phoneNumber" />
            </Tabs>
            {method === "email" && (
              <Box
                component="form"
                onSubmit={handleSubmit(onFormSubmit)}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  error={errors.email ? true : false}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  defaultValue="davidsmith@gmail.com"
                  helperText={errors.email ? `email is required` : ""}
                  {...register("email", { required: true })}
                />
                <TextField
                  sx={{ marginBottom: 4, marginTop: 3 }}
                  margin="normal"
                  error={errors.password ? true : false}
                  required
                  fullWidth
                  defaultValue="David4321#"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  helperText={errors.password ? `password is required` : ""}
                  {...register("password", { required: true })}
                />
                {error ? (
                  <Typography sx={{ color: "red", marginBottom: 2 }}>
                    {error}
                  </Typography>
                ) : (
                  ""
                )}

                <Box sx={{ m: 0, position: "relative" }}>
                  <Box>
                    <Button
                      sx={{ marginBottom: 2 }}
                      size="large"
                      disabled={isSubmitting}
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Sign In
                    </Button>
                    {isSubmitting && (
                      <CircularProgress
                        size={24}
                        sx={{
                          color: green[500],
                          position: "absolute",
                          top: "26%",
                          left: "50%",
                          marginTop: "-12px",
                          marginLeft: "-12px",
                        }}
                      />
                    )}
                  </Box>
                </Box>
              </Box>
            )}
            {method === "phoneNumber" && (
              <div>
                <Typography sx={{ mb: 1 }} variant="h6">
                  Not available now
                </Typography>
              </div>
            )}
          </div>
        </Box>
        <ReactToastify />
      </Box>
    </>
  );
};

export default Login;
