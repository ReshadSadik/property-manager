import * as React from "react";
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

type loginType = {
  email: string;
  password: string;
};

const Login = () => {
  const { setAuthToken } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginType>();

  const onFormSubmit: SubmitHandler<loginType> = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const user = await response.json();
      console.log(user.data);
      if (user) {
        localStorage.authToken = JSON.stringify(user.data.token);
        localStorage.userDetails = JSON.stringify(user.data.user);
      }
      if (user.data.token) {
        setAuthToken(user.data.token);
        navigate("/", { replace: true });
      }
    } catch (error) {}
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
          <FormControlLabel
            sx={{ textAlign: "left", width: "100%" }}
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
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
    </Container>
  );
};

export default Login;
