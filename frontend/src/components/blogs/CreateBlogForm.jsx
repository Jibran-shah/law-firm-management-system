import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";

const blogDetailsSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(300, "Description cannot exceed 300 characters"),
  image: z
    .custom((value) => value instanceof File, "Card image is required")
    .refine(
      (file) => file.type.startsWith("image/"),
      "Please select an image file"
    )
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Image must be 5 MB or smaller"
    ),
});

const BlogDetailsForm = ({ onSubmit, isSubmitting = false }) => {
  const [imagePreview, setImagePreview] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(blogDetailsSchema),
    defaultValues: {
      title: "",
      description: "",
      image: null,
    },
  });

  const image = watch("image");

  useEffect(() => {
    if (!image) {
      setImagePreview("");
      return;
    }

    const previewUrl = URL.createObjectURL(image);
    setImagePreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [image]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      setValue("image", file, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }

    event.target.value = "";
  };

  const handleRemoveImage = () => {
    setValue("image", null, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        p: { xs: 2, md: 4 },
        bgcolor: "grey.50",
      }}
    >
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          width: "100%",
          maxWidth: 680,
          p: { xs: 2.5, md: 4 },
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <Stack spacing={3}>
          <Box>
            <Typography variant="h5" fontWeight={700}>
              Create a blog
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 0.75 }}>
              Add the basic details before editing your blog content.
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2.5}>
              <TextField
                label="Blog title"
                placeholder="Enter your blog title"
                fullWidth
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
              />

              <TextField
                label="Description"
                placeholder="Write a short description for your blog"
                fullWidth
                multiline
                minRows={3}
                maxRows={6}
                {...register("description")}
                error={!!errors.description}
                helperText={
                  errors.description?.message ||
                  `${watch("description")?.length || 0}/300 characters`
                }
              />

              <Box>
                <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                  Card image
                </Typography>

                {imagePreview ? (
                  <Box
                    sx={{
                      position: "relative",
                      overflow: "hidden",
                      border: 1,
                      borderColor: "divider",
                      borderRadius: 1.5,
                    }}
                  >
                    <Box
                      component="img"
                      src={imagePreview}
                      alt="Blog card preview"
                      sx={{
                        display: "block",
                        width: "100%",
                        aspectRatio: "16 / 9",
                        objectFit: "cover",
                      }}
                    />

                    <Button
                      type="button"
                      size="small"
                      color="error"
                      startIcon={<DeleteOutlineIcon />}
                      onClick={handleRemoveImage}
                      sx={{ m: 1 }}
                    >
                      Remove image
                    </Button>
                  </Box>
                ) : (
                  <Button
                    component="label"
                    variant="outlined"
                    fullWidth
                    sx={{
                      minHeight: 150,
                      borderStyle: "dashed",
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      textTransform: "none",
                    }}
                  >
                    <ImageOutlinedIcon fontSize="large" />
                    <Typography variant="body2" fontWeight={600}>
                      Upload card image
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Image files, up to 5 MB
                    </Typography>

                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleImageChange}
                    />
                  </Button>
                )}

                {errors.image && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                    {errors.image.message}
                  </Typography>
                )}
              </Box>

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting}
                sx={{ alignSelf: "flex-end", minWidth: 180 }}
              >
                {isSubmitting ? "Creating draft..." : "Continue to editor"}
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default BlogDetailsForm;