import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { apiClient } from "../../api/client.api";
import { createClientSchema } from "../../schemas/createClient.schema";
import FileInput from "../../components/input/File/FileInput";
import { toFormData } from "../../utils/toFormData.utils";

const CreateClientPage = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) =>
      (await apiClient.post("/clients", data)).data,
    onSuccess: () => navigate("/home"),
    onError: (error) => console.error("Failed to save profile:", error),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createClientSchema),
    defaultValues: createClientSchema.parse({}),
  });

  const onSubmit = (data) => {
    mutate(toFormData(data));
  };

  return (
    <Box sx={createClientPageSx}>
      <Paper elevation={2} sx={createClientCardSx}>
        <Box sx={createClientHeaderSx}>
          <Typography variant="h4" fontWeight={600}>
            Set Up Your Profile
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Introduce yourself by adding your photo and personal details.
          </Typography>
        </Box>

        <Stack
          component="form"
          spacing={2.5}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FileInput
            name="avatar"
            label="Profile Photo"
            control={control}
            accept="image/*"
          />

          <FileInput
            name="cover"
            label="Cover Image"
            control={control}
            accept="image/*"
          />

          <TextField
            fullWidth
            label="Full Name"
            placeholder="Enter your full name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            fullWidth
            label="Bio"
            placeholder="Tell us a little about yourself (optional)"
            multiline
            rows={4}
            {...register("bio")}
            error={!!errors.bio}
            helperText={errors.bio?.message}
          />

          <TextField
            fullWidth
            label="Address"
            placeholder="Enter your address (optional)"
            multiline
            rows={2}
            {...register("address")}
            error={!!errors.address}
            helperText={errors.address?.message}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            disabled={isPending}
          >
            {isPending ? "Saving Your Profile..." : "Save Profile"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

/** @type {import("@mui/material").SxProps} */
const createClientPageSx = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  px: 2,
  py: 4,
  bgcolor: "background.default",
};

/** @type {import("@mui/material").SxProps} */
const createClientCardSx = {
  display: "flex",
  flexDirection: "column",
  gap: 3,
  width: "100%",
  maxWidth: 520,
  p: { xs: 3, sm: 4 },
  borderRadius: 2,
};

/** @type {import("@mui/material").SxProps} */
const createClientHeaderSx = {
  display: "flex",
  flexDirection: "column",
  gap: 0.75,
  textAlign: "center",
};

export default CreateClientPage;