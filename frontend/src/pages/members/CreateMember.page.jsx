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
import { createMemberSchema } from "../../schemas/createMember.schema";
import FileInput from "../../components/input/File/FileInput";
import { toFormData } from "../../utils/toFormData.utils";

const CreateMemberPage = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) =>
      (await apiClient.post("/members", data)).data,
    onSuccess: () => navigate("/home"),
    onError: (error) => console.error("Failed to save profile:", error),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createMemberSchema),
    defaultValues: createMemberSchema.parse({}),
  });

  const onSubmit = (data) => {
    mutate(toFormData(data));
  };

  return (
    <Box sx={createMemberPageSx}>
      <Paper elevation={2} sx={createMemberCardSx}>
        <Box sx={createMemberHeaderSx}>
          <Typography variant="h4" fontWeight={600}>
            Complete Your Profile
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Share your details so clients can get to know you and your work.
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
            label="Job Title"
            placeholder="e.g. Advocate High Court"
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          <TextField
            fullWidth
            label="About You"
            placeholder="Tell clients about yourself and your experience."
            multiline
            rows={4}
            {...register("bio")}
            error={!!errors.bio}
            helperText={errors.bio?.message}
          />

          <TextField
            fullWidth
            label="Education & Qualifications"
            placeholder="Add your degrees and qualifications."
            multiline
            rows={3}
            {...register("qualifications")}
            error={!!errors.qualifications}
            helperText={errors.qualifications?.message}
          />

          <TextField
            fullWidth
            label="Email Address"
            type="email"
            placeholder="Enter your email address"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            fullWidth
            label="Phone Number"
            type="tel"
            placeholder="Enter your phone number"
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />

          <TextField
            fullWidth
            label="Office Address"
            placeholder="Enter your office address"
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
            {isPending ? "Saving..." : "Save Profile"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

/** @type {import("@mui/material").SxProps} */
const createMemberPageSx = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  px: 2,
  py: 4,
  bgcolor: "background.default",
};

/** @type {import("@mui/material").SxProps} */
const createMemberCardSx = {
  display: "flex",
  flexDirection: "column",
  gap: 3,
  width: "100%",
  maxWidth: 520,
  p: { xs: 3, sm: 4 },
  borderRadius: 2,
};

/** @type {import("@mui/material").SxProps} */
const createMemberHeaderSx = {
  display: "flex",
  flexDirection: "column",
  gap: 0.75,
  textAlign: "center",
};

export default CreateMemberPage;
