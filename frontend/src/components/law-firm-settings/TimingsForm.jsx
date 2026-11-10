import { useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  MenuItem,
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

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const timingsSchema = z.object({
  timings: z.array(
    z
      .object({
        day: z.enum(DAYS),
        open: z.string().optional(),
        close: z.string().optional(),
        isClosed: z.boolean(),
      })
      .superRefine((timing, ctx) => {
        if (timing.isClosed) return;

        if (!timing.open) {
          ctx.addIssue({
            code: "custom",
            path: ["open"],
            message: "Opening time is required",
          });
        }

        if (!timing.close) {
          ctx.addIssue({
            code: "custom",
            path: ["close"],
            message: "Closing time is required",
          });
        }
      }),
  ),
});

const TimingsForm = () => {
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
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(timingsSchema),
    defaultValues: {
      timings: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "timings",
  });

  useEffect(() => {
    if (!firm) return;

    reset({
      timings: (firm.timings ?? []).map((timing) => ({
        day: timing.day ?? "Monday",
        open: timing.open ?? "",
        close: timing.close ?? "",
        isClosed: timing.isClosed ?? false,
      })),
    });
  }, [firm, reset]);

  const onSubmit = (data) => {
    mutate({
      timings: data.timings.map((timing) => ({
        day: timing.day,
        isClosed: timing.isClosed,
        open: timing.isClosed ? "" : timing.open,
        close: timing.isClosed ? "" : timing.close,
      })),
    });
  };

  if (isLoading) {
    return <Typography>Loading office timings...</Typography>;
  }

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6">Office Timings</Typography>

        {isError && (
          <Alert severity="error">
            {error?.response?.data?.error?.message ||
              error?.message ||
              "Failed to update office timings."}
          </Alert>
        )}

        {isSuccess && (
          <Alert severity="success">
            Office timings updated successfully.
          </Alert>
        )}

        {fields.map((field, index) => {
          const isClosed = watch(`timings.${index}.isClosed`) ?? false;

          return (
            <Stack key={field.id} spacing={2}>
              <TextField
                select
                label="Day"
                fullWidth
                {...register(`timings.${index}.day`)}
                error={!!errors.timings?.[index]?.day}
                helperText={errors.timings?.[index]?.day?.message}
              >
                {DAYS.map((day) => (
                  <MenuItem key={day} value={day}>
                    {day}
                  </MenuItem>
                ))}
              </TextField>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!isClosed}
                    onChange={(event) => {
                      const closed = event.target.checked;

                      setValue(`timings.${index}.isClosed`, closed, {
                        shouldDirty: true,
                        shouldValidate: true,
                      });

                      if (closed) {
                        setValue(`timings.${index}.open`, "", {
                          shouldDirty: true,
                        });
                        setValue(`timings.${index}.close`, "", {
                          shouldDirty: true,
                        });
                      }
                    }}
                  />
                }
                label="Closed all day"
              />

              {!isClosed && (
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    label="Opening Time"
                    type="time"
                    fullWidth
                    slotProps={{ inputLabel: { shrink: true } }}
                    {...register(`timings.${index}.open`)}
                    error={!!errors.timings?.[index]?.open}
                    helperText={errors.timings?.[index]?.open?.message}
                  />

                  <TextField
                    label="Closing Time"
                    type="time"
                    fullWidth
                    slotProps={{ inputLabel: { shrink: true } }}
                    {...register(`timings.${index}.close`)}
                    error={!!errors.timings?.[index]?.close}
                    helperText={errors.timings?.[index]?.close?.message}
                  />
                </Stack>
              )}

              <Box>
                <Button
                  color="error"
                  type="button"
                  onClick={() => remove(index)}
                >
                  Remove Day
                </Button>
              </Box>

              <Divider />
            </Stack>
          );
        })}

        <Button
          variant="outlined"
          type="button"
          onClick={() =>
            append({
              day: "Monday",
              open: "09:00",
              close: "17:00",
              isClosed: false,
            })
          }
        >
          Add Timing
        </Button>

        <Button
          type="submit"
          variant="contained"
          disabled={isUpdating || !isDirty}
        >
          {isUpdating ? "Saving..." : "Save Office Timings"}
        </Button>
      </Stack>
    </Paper>
  );
};

export default TimingsForm;