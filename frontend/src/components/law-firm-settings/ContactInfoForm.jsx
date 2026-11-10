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

const contactInfoSchema = z.object({
  email: z.string().trim().email("Enter a valid email").optional().or(z.literal("")),
  whatsapp: z.string().trim().optional(),
  phoneNumbers: z.array(z.string().trim()).optional(),
});

const ContactInfoForm = () => {
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
      const response = await apiClient.patch("/law-firm", {
        contactInfo: data,
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["law-firm"] });
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      email: "",
      whatsapp: "",
      phoneNumbers: [],
    },
  });

  useEffect(() => {
    if (!firm) return;

    reset({
      email: firm.contactInfo?.email ?? "",
      whatsapp: firm.contactInfo?.whatsapp ?? "",
      phoneNumbers: firm.contactInfo?.phoneNumbers ?? [],
    });
  }, [firm, reset]);

  const onSubmit = (data) => {
    const payload = {};

    if (data.email?.trim()) payload.email = data.email.trim();
    if (data.whatsapp?.trim()) payload.whatsapp = data.whatsapp.trim();

    if (data.phoneNumbers?.length) {
      payload.phoneNumbers = data.phoneNumbers.filter(Boolean);
    }

    if (Object.keys(payload).length) {
      mutate(payload);
    }
  };

  if (isLoading) {
    return <Typography>Loading contact information...</Typography>;
  }

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6">Contact Information</Typography>

        {isError && (
          <Alert severity="error">
            {error?.response?.data?.error?.message ||
              error?.message ||
              "Failed to update contact information."}
          </Alert>
        )}

        {isSuccess && (
          <Alert severity="success">
            Contact information updated successfully.
          </Alert>
        )}

        <TextField
          label="Email"
          fullWidth
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="WhatsApp"
          fullWidth
          {...register("whatsapp")}
          error={!!errors.whatsapp}
          helperText={errors.whatsapp?.message}
        />

        <TextField
          label="Phone Numbers"
          fullWidth
          {...register("phoneNumbers", {
            setValueAs: (value) =>
              typeof value === "string"
                ? value.split(",").map((phone) => phone.trim()).filter(Boolean)
                : value,
          })}
          defaultValue={firm?.contactInfo?.phoneNumbers?.join(", ") ?? ""}
          helperText="Separate phone numbers with commas."
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isUpdating || !isDirty}
        >
          {isUpdating ? "Saving..." : "Save Contact Information"}
        </Button>
      </Stack>
    </Paper>
  );
};

export default ContactInfoForm;