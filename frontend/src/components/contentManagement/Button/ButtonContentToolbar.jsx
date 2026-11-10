import { Stack, TextField } from "@mui/material";
import { documentStore } from "../../../store/content.store";

const ButtonContentToolbar = ({ node }) => {

  const updateNodeContent = (updates) => documentStore.updateNodeContent(node.id,updates);

  const content = node.content;

  return (
    <Stack spacing={2}>
      <TextField
        label="Button Text"
        size="small"
        fullWidth
        value={content?.text ?? ""}
        onChange={(event) => updateNodeContent({ text: event.target.value })}
        placeholder="Learn More"
      />

      <TextField
        label="Link URL"
        size="small"
        fullWidth
        value={content?.href ?? ""}
        onChange={(event) => updateNodeContent({ href: event.target.value })}
        placeholder="https://example.com"
      />
    </Stack>
  );
};

export default ButtonContentToolbar;