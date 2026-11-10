import { useEffect, useState } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";

const FilePreview = ({ file, onRemove, disabled = false }) => {
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (!file || !file.type.startsWith("image/")) {
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1.5}
      sx={{ mt: 1 }}
    >
      {previewUrl ? (
        <Box
          component="img"
          src={previewUrl}
          alt={file.name}
          sx={{
            width: 64,
            height: 64,
            objectFit: "cover",
            borderRadius: 1,
          }}
        />
      ) : (
        <Box
          sx={{
            width: 64,
            height: 64,
            display: "grid",
            placeItems: "center",
            bgcolor: "action.hover",
            borderRadius: 1,
          }}
        >
          <Typography variant="caption">
            {file.name.split(".").pop()?.toUpperCase()}
          </Typography>
        </Box>
      )}

      <Typography
        variant="body2"
        sx={{ flex: 1, overflowWrap: "anywhere" }}
      >
        {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
      </Typography>

      <IconButton
        size="small"
        aria-label={`Remove ${file.name}`}
        disabled={disabled}
        onClick={onRemove}
      >
        ×
      </IconButton>
    </Stack>
  );
};

export default FilePreview;