import { Stack, TextField, FormControlLabel, Switch } from "@mui/material";

import { documentStore } from "../../../store/content.store";

const ImageAdvancedToolbar = ({ node }) => {

  const updateNodeContent = (updates) => documentStore.updateNodeContent(node.id,updates);

  return (
    <Stack spacing={2}>
      <TextField
        label="HTML ID"
        size="small"
        fullWidth
        value={node.htmlId ?? ""}
        onChange={(event) => updateNodeContent({ htmlId: event.target.value })}
        placeholder="image-id"
      />

      <TextField
        label="CSS Class"
        size="small"
        fullWidth
        value={node.cssClass ?? ""}
        onChange={(event) => updateNodeContent({ cssClass: event.target.value })}
        placeholder="custom-image"
      />

      <FormControlLabel
        label="Hide Image"
        control={
          <Switch
            checked={Boolean(node.hidden)}
            onChange={(event) => updateNodeContent({ hidden: event.target.checked })}
          />
        }
      />

      <FormControlLabel
        label="Lazy Load"
        control={
          <Switch
            checked={node.loading !== "eager"}
            onChange={(event) =>
              updateNodeContent({
                loading: event.target.checked ? "lazy" : "eager",
              })
            }
          />
        }
      />
    </Stack>
  );
};

export default ImageAdvancedToolbar;