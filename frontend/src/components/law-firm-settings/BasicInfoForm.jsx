import { useEffect } from "react";
import {
  Alert,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "../../api/client.api.js";
import FileInput from "../input/File/FileInput.jsx";
import { toFormData } from "../../utils/toFormData.utils.js";
import { updateFirmSchema } from "../../schemas/updateFirm.schema.js";

const basicInfoSchema = updateFirmSchema.pick({
  name: true,
  description: true,
  combinedMembersImage: true,
});

const BasicInfoForm = () => {
  const queryClient = useQueryClient();

  const { data: firm, isPending: isLoading } = useQuery({
    queryKey: ["law-firm"],
    queryFn: async () => {
      const response = await apiClient.get("/law-firm");
      return response.data?.data ?? {};
    },
  });

  const {
    mutate,
    isPending: isUpdating,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: async (data) =>
      (await apiClient.patch("/law-firm", toFormData(data))).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["law-firm"] });
    },
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      name: "",
      description: "",
      combinedMembersImage: null,
    },
  });

  useEffect(() => {
    if (!firm) return;

    reset({
      name: firm.name ?? "",
      description: firm.description ?? "",
      combinedMembersImage: null,
    });
  }, [firm, reset]);

  const onSubmit = (data) => {
    const payload = {};

    if (data.name?.trim()) {
      payload.name = data.name.trim();
    }

    if (data.description?.trim()) {
      payload.description = data.description.trim();
    }

    if (data.combinedMembersImage) {
      payload.combinedMembersImage = data.combinedMembersImage;
    }

    if (Object.keys(payload).length) {
      console.log(payload)
      mutate(payload);
    }
  };

  if (isLoading) {
    return <Typography>Loading firm information...</Typography>;
  }

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Stack
        component="form"
        spacing={2}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h6">Basic Information</Typography>

        {isError && (
          <Alert severity="error">
            {error?.response?.data?.error?.message ||
              error?.message ||
              "Failed to update basic information."}
          </Alert>
        )}

        {isSuccess && (
          <Alert severity="success">
            Basic information updated successfully.
          </Alert>
        )}

        <TextField
          label="Firm Name"
          fullWidth
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        <FileInput
          name="combinedMembersImage"
          label="Combined Members Image"
          control={control}
          accept="image/*"
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isUpdating || !isDirty}
        >
          {isUpdating ? "Saving..." : "Save Basic Information"}
        </Button>
      </Stack>
    </Paper>
  );
};

export default BasicInfoForm;