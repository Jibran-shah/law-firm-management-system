import { Stack, TextField } from "@mui/material";
import { documentStore } from "../../../store/content.store";

const ImageContentToolbar = ({ node }) => {

  const updateNode = (updates) => documentStore.updateNodeContent(node.id,updates);

  const content = node.content

  return (
    <Stack spacing={2}>
      <TextField
        label="Image URL"
        size="small"
        fullWidth
        value={content.src ?? ""}
        onChange={(event) => updateNode({ src: event.target.value })}
        placeholder="https://example.com/image.jpg"
      />

      <TextField
        label="Alt Text"
        size="small"
        fullWidth
        value={content.alt ?? ""}
        onChange={(event) => updateNode({ alt: event.target.value })}
        placeholder="Describe the image"
      />

      <TextField
        label="Caption"
        size="small"
        fullWidth
        value={content.caption ?? ""}
        onChange={(event) => updateNode({ caption: event.target.value })}
        placeholder="Optional image caption"
      />
    </Stack>
  );
};

export default ImageContentToolbar;