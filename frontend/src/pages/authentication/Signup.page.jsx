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
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../schemas/signup.schema";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {

  const navigate = useNavigate()

  const { register, handleSubmit, formState:{ errors }} = useForm({
    resolver:zodResolver(signupSchema),
    defaultValues:signupSchema.parse({})
  })

  const { mutate, isError, isPending, error} = useMutation({
    mutationFn: async(data) => (await apiClient.post("/auth/signup", data)).data,
    onSuccess:(data)=>{
      navigate("/profile/create")
    }
  })

  const onSubmit = (data) => mutate(data)

  return (
    <Box sx={signupPageSx}>
      <Paper
        elevation={4}
        sx={signupCardSx}
      >
        <Box sx={signupHeaderSx}>
          <Typography variant="h4">
            Create Your Account
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Sign up to get started
          </Typography>
        </Box>

        <Stack spacing={2}>

          <TextField 
            fullWidth
            label="username"
            placeholder="your username"
            {...register("username")}
          />

          {errors.username&& <Typography variant="body2" color="error">{errors.username.message}</Typography>}

          <TextField
            fullWidth
            label="Email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            {...register("email")}
          />

          {errors.email && <Typography variant="body2" color="error">{errors.email.message}</Typography>}

          <TextField
            fullWidth
            label="Password"
            type="password"
            placeholder="Create a password"
            autoComplete="new-password"
            {...register("newPassword")}
          />

          {errors.newPassword && <Typography variant="body2" color="error">{errors.newPassword.message}</Typography>}

          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            autoComplete="new-password"
            {...register("confirmPassword")}
          />

          {errors.confirmPassword&& <Typography variant="body2" color="error">{errors.confirmPassword.message}</Typography>}

          {errors.form&& <Typography variant="body2" color="error">{errors.form.message}</Typography>}

          {errors.root&& <Typography variant="body2" color="error">{errors.root.message}</Typography>}

          <Button
            fullWidth
            variant="contained"
            size="large"
            disabled={ isError && isPending }
            onClick={handleSubmit(onSubmit)}
          >
            Create Account
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

        <Box sx={loginSectionSx}>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Already have an account?
          </Typography>

          <Button
            component={Link}
            to="/login"
            fullWidth
            variant="outlined"
            color="secondary"
            size="large"
            onClick={()=>navigate("/login")}
          >
            Login
          </Button>

        </Box>
      </Paper>
    </Box>
  );
};

/** @type {import("@mui/material").SxProps} */
const signupPageSx = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  px: 2,
  py: 4,
  backgroundColor: "background.default",
};

/** @type {import("@mui/material").SxProps} */
const signupCardSx = {
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
const signupHeaderSx = {
  display: "flex",
  flexDirection: "column",
  gap: 0.5,
  textAlign: "center",
};

/** @type {import("@mui/material").SxProps} */
const loginSectionSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 1.5,
};

export default SignupPage;