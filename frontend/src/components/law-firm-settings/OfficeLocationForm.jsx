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
import { z } from "zod";

import { apiClient } from "../../api/client.api.js";
import FileInput from "../input/File/FileInput.jsx";
import { toFormData } from "../../utils/toFormData.utils.js";

const locationSchema = z.object({
  address: z.string().trim().optional(),
  coordinates: z.object({
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),
  locationImages: z.any().optional(),
});

const OfficeLocationForm = () => {
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
    mutationFn: async (data) => {
      const response = await apiClient.patch(
        "/law-firm",
        toFormData(data),
      );
      return response.data;
    },
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
    resolver: zodResolver(locationSchema),
    defaultValues: {
      address: "",
      coordinates: {
        latitude: undefined,
        longitude: undefined,
      },
      locationImages: null,
    },
  });

  useEffect(() => {
    if (!firm) return;

    reset({
      address: firm.location?.address ?? "",
      coordinates: {
        latitude: firm.location?.coordinates?.latitude ?? undefined,
        longitude: firm.location?.coordinates?.longitude ?? undefined,
      },
      locationImages: null,
    });
  }, [firm, reset]);

  const onSubmit = (data) => {
    const location = {};

    if (data.address?.trim()) {
      location.address = data.address.trim();
    }

    const coordinates = {};

    if (data.coordinates.latitude !== undefined) {
      coordinates.latitude = data.coordinates.latitude;
    }

    if (data.coordinates.longitude !== undefined) {
      coordinates.longitude = data.coordinates.longitude;
    }

    if (Object.keys(coordinates).length) {
      location.coordinates = coordinates;
    }

    const payload = {};

    if (Object.keys(location).length) {
      payload.location = location;
    }

    if (data.locationImages) {
      payload.locationImages = data.locationImages;
    }

    if (Object.keys(payload).length) {
      mutate(payload);
    }
  };

  if (isLoading) {
    return <Typography>Loading office location...</Typography>;
  }

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6">Office Location</Typography>

        {isError && (
          <Alert severity="error">
            {error?.response?.data?.error?.message ||
              error?.message ||
              "Failed to update office location."}
          </Alert>
        )}

        {isSuccess && (
          <Alert severity="success">
            Office location updated successfully.
          </Alert>
        )}

        <TextField
          label="Address"
          fullWidth
          {...register("address")}
          error={!!errors.address}
          helperText={errors.address?.message}
        />

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Latitude"
            type="number"
            fullWidth
            slotProps={{ htmlInput: { step: "any" } }}
            {...register("coordinates.latitude", {
              setValueAs: (value) =>
                value === "" ? undefined : Number(value),
            })}
            error={!!errors.coordinates?.latitude}
            helperText={errors.coordinates?.latitude?.message}
          />

          <TextField
            label="Longitude"
            type="number"
            fullWidth
            slotProps={{ htmlInput: { step: "any" } }}
            {...register("coordinates.longitude", {
              setValueAs: (value) =>
                value === "" ? undefined : Number(value),
            })}
            error={!!errors.coordinates?.longitude}
            helperText={errors.coordinates?.longitude?.message}
          />
        </Stack>

        <Typography variant="body2" color="text.secondary">
          Current location images: {firm?.location?.images?.length ?? 0}
        </Typography>

        <FileInput
          name="locationImages"
          label="Replace Location Images"
          control={control}
          accept="image/*"
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isUpdating || !isDirty}
        >
          {isUpdating ? "Saving..." : "Save Office Location"}
        </Button>
      </Stack>
    </Paper>
  );
};

export default OfficeLocationForm;