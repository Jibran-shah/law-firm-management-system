import { useEffect } from "react";
import {
  Alert,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { apiClient } from "../../api/client.api.js";

const statisticsSchema = z.object({
  statistics: z.array(
    z.object({
      name: z.string().trim().min(1, "Name is required"),
      value: z.string().trim().min(1, "Value is required"),
    }),
  ),
});

const StatisticsForm = () => {
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
      const response = await apiClient.patch("/law-firm", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["law-firm"] });
    },
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(statisticsSchema),
    defaultValues: {
      statistics: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "statistics",
  });

  useEffect(() => {
    if (!firm) return;

    reset({
      statistics: (firm.statistics ?? []).map(({ name, value }) => ({
        name: name ?? "",
        value: String(value ?? ""),
      })),
    });
  }, [firm, reset]);

  const onSubmit = (data) => {
    const statistics = data.statistics
      .filter((item) => item.name.trim() && item.value.trim())
      .map((item) => ({
        name: item.name.trim(),
        value: item.value.trim(),
      }));

    mutate({ statistics });
  };

  if (isLoading) {
    return <Typography>Loading statistics...</Typography>;
  }

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6">Statistics</Typography>

        {isError && (
          <Alert severity="error">
            {error?.response?.data?.error?.message ||
              error?.message ||
              "Failed to update statistics."}
          </Alert>
        )}

        {isSuccess && (
          <Alert severity="success">
            Statistics updated successfully.
          </Alert>
        )}

        {fields.map((field, index) => (
          <Stack
            key={field.id}
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems="flex-start"
          >
            <TextField
              label="Name"
              fullWidth
              {...register(`statistics.${index}.name`)}
              error={!!errors.statistics?.[index]?.name}
              helperText={errors.statistics?.[index]?.name?.message}
            />

            <TextField
              label="Value"
              fullWidth
              {...register(`statistics.${index}.value`)}
              error={!!errors.statistics?.[index]?.value}
              helperText={errors.statistics?.[index]?.value?.message}
            />

            <Button
              color="error"
              onClick={() => remove(index)}
              type="button"
            >
              Remove
            </Button>
          </Stack>
        ))}

        <Button
          variant="outlined"
          type="button"
          onClick={() => append({ name: "", value: "" })}
        >
          Add Statistic
        </Button>

        <Button
          type="submit"
          variant="contained"
          disabled={isUpdating || !isDirty}
        >
          {isUpdating ? "Saving..." : "Save Statistics"}
        </Button>
      </Stack>
    </Paper>
  );
};

export default StatisticsForm;