import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../shared/hooks/useAuth";
import { axiosOpen } from "../services/api/axios";
import { CircularProgress } from "@mui/material";
import { green } from "@mui/material/colors";
import { toast } from "react-toastify";
import ReactToastify from "../components/common/ReactToastify";

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
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "left",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
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
            defaultValue="reshadsadik@gmail.com"
            helperText={errors.email ? `email is required` : ""}
            autoFocus
            {...register("email", { required: true })}
          />
          <TextField
            margin="normal"
            error={errors.password ? true : false}
            required
            fullWidth
            defaultValue="Resh4321#"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            helperText={errors.password ? `password is required` : ""}
            {...register("password", { required: true })}
          />
          {error ? <Typography sx={{ color: "red" }}>{error}</Typography> : ""}
          <FormControlLabel
            sx={{ textAlign: "left", width: "100%" }}
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

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

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      <ReactToastify />
    </Container>
  );
};

export default Login;
