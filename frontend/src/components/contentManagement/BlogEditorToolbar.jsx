import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Chip,
  MenuItem,
  Select,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../api/client.api";

const BlogEditorToolbar = ({ blogId, root }) => {
  const [status, setStatus] = useState("draft");

  const updateBlogMutation = useMutation({
    mutationFn: async () => {
      const response = await apiClient.patch(`blogs/${blogId}`, {
        content: root,
        status,
      });

      return response.data;
    },
  });

  const handleSave = () => {
    if (!blogId || !root) return;

    updateBlogMutation.mutate();
  };

  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Toolbar
        sx={{
          minHeight: "64px !important",
          px: { xs: 2, md: 3 },
          gap: 2,
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight={700}
          color="text.primary"
          sx={{ whiteSpace: "nowrap" }}
        >
          Blog Editor
        </Typography>

        <Chip
          label={status === "published" ? "Published" : "Draft"}
          size="small"
          color={status === "published" ? "success" : "default"}
          variant="outlined"
        />

        <Box sx={{ flex: 1 }} />

        <Stack direction="row" spacing={1.5} alignItems="center">
          <Select
            size="small"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            disabled={updateBlogMutation.isPending}
            sx={{ minWidth: 130 }}
            aria-label="Blog publication status"
          >
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="published">Published</MenuItem>
          </Select>

          <Button
            variant="contained"
            startIcon={<SaveOutlinedIcon />}
            onClick={handleSave}
            disabled={
              !blogId || !root || updateBlogMutation.isPending
            }
          >
            {updateBlogMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </Stack>
      </Toolbar>

      {updateBlogMutation.isError && (
        <Typography
          variant="caption"
          color="error"
          sx={{ px: 3, pb: 1 }}
        >
          Unable to save the blog. Please try again.
        </Typography>
      )}

      {updateBlogMutation.isSuccess && (
        <Typography
          variant="caption"
          color="success.main"
          sx={{ px: 3, pb: 1 }}
        >
          Blog saved successfully.
        </Typography>
      )}
    </AppBar>
  );
};

export default BlogEditorToolbar;