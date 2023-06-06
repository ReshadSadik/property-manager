import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useForm, SubmitHandler } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../shared/hooks/useAuth";
import { axiosOpen } from "../../services/api/axios";
import { CircularProgress, Stack } from "@mui/material";
import { green } from "@mui/material/colors";
import { toast } from "react-toastify";
import ReactToastify from "../../components/common/ReactToastify";

interface RegisterType {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const Register = () => {
  const { error, setError } = useAuth();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterType>();

  const onFormSubmit: SubmitHandler<RegisterType> = async (data) => {
    setError("");
    if (data.password != data.confirmPassword) {
      return toast.warning("password doesn't match");
    }
    try {
      const response = await axiosOpen.post("users/signUp", {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      if (response.status == 200) {
        toast.success("Successfully signed up! You can log in now");
        navigate("/auth");
      }
    } catch (error: any) {
      if (error?.code == "ERR_NETWORK") {
        toast.error(error?.message);
      } else {
        setError(error.response.data.error.message.slice(24));
      }
    }
  };

  return (
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
            <Typography variant="h1">Register</Typography>
            <Typography
              color="text.secondary"
              variant="h6"
              fontWeight="regular"
            >
              Already have an account? &nbsp;
              <NavLink to="/auth">Login</NavLink>
            </Typography>
          </Stack>

          <Box
            component="form"
            onSubmit={handleSubmit(onFormSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              error={errors.name ? true : false}
              required
              fullWidth
              id="name"
              label="Name"
              autoComplete="name"
              helperText={errors.name ? `name is required` : ""}
              autoFocus
              {...register("name", { required: true })}
            />
            <TextField
              margin="normal"
              error={errors.email ? true : false}
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              helperText={errors.email ? `email is required` : ""}
              {...register("email", { required: true })}
            />
            <TextField
              sx={{ marginBottom: 4, marginTop: 2 }}
              margin="normal"
              error={errors.password ? true : false}
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText={errors.password ? `password is required` : ""}
              {...register("password", { required: true })}
            />
            <TextField
              sx={{ marginBottom: 4, marginTop: 2 }}
              margin="normal"
              error={errors.confirmPassword ? true : false}
              required
              fullWidth
              label="confirmPassword"
              type="password"
              id="confirmPassword"
              helperText={errors.confirmPassword ? `password is required` : ""}
              {...register("confirmPassword", { required: true })}
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
        </div>
      </Box>
      <ReactToastify />
    </Box>
  );
};

export default Register;
