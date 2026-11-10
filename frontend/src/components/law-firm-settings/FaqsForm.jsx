import { useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  Divider,
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

const faqsSchema = z.object({
  faqs: z.array(
    z.object({
      question: z.string().trim().min(1, "Question is required"),
      answer: z.string().trim().min(1, "Answer is required"),
    }),
  ),
});

const FaqsForm = () => {
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
    resolver: zodResolver(faqsSchema),
    defaultValues: {
      faqs: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "faqs",
  });

  useEffect(() => {
    if (!firm) return;

    reset({
      faqs: (firm.faqs ?? []).map(({ question, answer }) => ({
        question: question ?? "",
        answer: answer ?? "",
      })),
    });
  }, [firm, reset]);

  const onSubmit = (data) => {
    mutate({
      faqs: data.faqs.map(({ question, answer }) => ({
        question: question.trim(),
        answer: answer.trim(),
      })),
    });
  };

  if (isLoading) {
    return <Typography>Loading FAQs...</Typography>;
  }

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6">FAQs</Typography>

        {isError && (
          <Alert severity="error">
            {error?.response?.data?.error?.message ||
              error?.message ||
              "Failed to update FAQs."}
          </Alert>
        )}

        {isSuccess && (
          <Alert severity="success">FAQs updated successfully.</Alert>
        )}

        {fields.map((field, index) => (
          <Stack key={field.id} spacing={2}>
            <TextField
              label="Question"
              fullWidth
              {...register(`faqs.${index}.question`)}
              error={!!errors.faqs?.[index]?.question}
              helperText={errors.faqs?.[index]?.question?.message}
            />

            <TextField
              label="Answer"
              fullWidth
              multiline
              minRows={3}
              {...register(`faqs.${index}.answer`)}
              error={!!errors.faqs?.[index]?.answer}
              helperText={errors.faqs?.[index]?.answer?.message}
            />

            <Box>
              <Button
                color="error"
                type="button"
                onClick={() => remove(index)}
              >
                Remove FAQ
              </Button>
            </Box>

            <Divider />
          </Stack>
        ))}

        <Button
          variant="outlined"
          type="button"
          onClick={() => append({ question: "", answer: "" })}
        >
          Add FAQ
        </Button>

        <Button
          type="submit"
          variant="contained"
          disabled={isUpdating || !isDirty}
        >
          {isUpdating ? "Saving..." : "Save FAQs"}
        </Button>
      </Stack>
    </Paper>
  );
};

export default FaqsForm;