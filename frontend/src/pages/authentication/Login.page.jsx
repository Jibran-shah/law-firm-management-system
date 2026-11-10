import {
  Box,
  Button,
  Divider,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../api/client.api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "../../schemas/login.schema";
import { useNavigate } from "react-router-dom"

const LoginPage = () => {

  const navigate = useNavigate();

  const { register, handleSubmit, formState: {errors, isSubmitting, isLoading } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: loginSchema.parse({})
  })

  const { mutate,  } = useMutation({
    mutationFn: async (data)=> (await apiClient.post("/auth/login",data)).data,
    onError:(error)=>{
      console.log("error logging in", error)
    },
    onSuccess:(data)=>{
      if(!data.profile)
        navigate("/profile/create")
      else
        navigate("/home")
    }
  })

  const onSubmit = (data) => {
    console.log("onSubmit data:",data);
    mutate(data);
  }

  return (
    <Box sx={loginPageSx}>
      <Paper
        elevation={4}
        sx={loginCardSx}
      >
        <Box sx={loginHeaderSx}>
          <Typography variant="h4">
            Welcome Back
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Sign in to your account to continue
          </Typography>
        </Box>

        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            {...register("email")}
          />
          
          {errors.email && <p>{ errors.email.message }</p>}

          <TextField
            fullWidth
            label="Password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            {...register("password")}
          />

          {errors.password && <p> { errors.password.message } </p>}

          <Box sx={forgotPasswordContainerSx}>
            <Link
              href="/forgot-password"
              underline="hover"
              variant="body2"
            >
              Forgot password?
            </Link>
          </Box>

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleSubmit(onSubmit)}
          >
            Login
          </Button>
        </Stack>

        <Divider>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            OR
          </Typography>
        </Divider>

        <Box sx={registerSectionSx}>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Don't have an account?
          </Typography>

          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            size="large"
            onClick={()=>navigate("/signup")}
          >
            Create a New Account
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

/** @type {import("@mui/material").SxProps} */
const loginPageSx = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  px: 2,
  py: 4,
  backgroundColor: "background.default",
};

/** @type {import("@mui/material").SxProps} */
const loginCardSx = {
  display: "flex",
  flexDirection: "column",
  gap: 3,
  width: "100%",
  maxWidth: 440,
  p: {
    xs: 3,
    sm: 4,
  },
  borderRadius: 2,
};

/** @type {import("@mui/material").SxProps} */
const loginHeaderSx = {
  display: "flex",
  flexDirection: "column",
  gap: 0.5,
  textAlign: "center",
};

/** @type {import("@mui/material").SxProps} */
const forgotPasswordContainerSx = {
  display: "flex",
  justifyContent: "flex-end",
};

/** @type {import("@mui/material").SxProps} */
const registerSectionSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 1.5,
};

export default LoginPage;