import { Stack, TextField } from "@mui/material";

const VideoContentToolbar = ({ node }) => {
  const updateNode = (updates) => {
    node.update?.(updates);
  };

  return (
    <Stack spacing={2}>
      <TextField
        label="Video URL"
        value={node?.src ?? ""}
        onChange={(event) => updateNode({ src: event.target.value })}
        size="small"
        fullWidth
        placeholder="https://example.com/video.mp4"
      />

      <TextField
        label="Poster Image URL"
        value={node?.poster ?? ""}
        onChange={(event) => updateNode({ poster: event.target.value })}
        size="small"
        fullWidth
        placeholder="https://example.com/thumbnail.jpg"
      />

      <TextField
        label="Caption"
        value={node?.caption ?? ""}
        onChange={(event) => updateNode({ caption: event.target.value })}
        size="small"
        fullWidth
        placeholder="Enter video caption"
      />
    </Stack>
  );
};

export default VideoContentToolbar;