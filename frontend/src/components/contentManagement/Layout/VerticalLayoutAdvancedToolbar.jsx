import { Stack, TextField, FormControlLabel, Switch } from "@mui/material";
import {documentStore} from "../../../store/content.store"

const VerticalLayoutAdvancedToolbar = ({ node }) => {

  const updateNodeContent = (updates) => documentStore.updateNodeContent(node.id,updates);

  const content = node.content

  return (
    <Stack spacing={2}>
      <TextField
        label="HTML ID"
        size="small"
        fullWidth
        value={content.htmlId ?? ""}
        onChange={(event) => updateNodeContent({ htmlId: event.target.value })}
        placeholder="section-id"
      />

      <TextField
        label="CSS Class"
        size="small"
        fullWidth
        value={content.cssClass ?? ""}
        onChange={(event) => updateNodeContent({ cssClass: event.target.value })}
        placeholder="custom-class"
      />

      <FormControlLabel
        label="Hide Layout"
        control={
          <Switch
            checked={Boolean(content.hidden)}
            onChange={(event) => updateNodeContent({ hidden: event.target.checked })}
          />
        }
      />
    </Stack>
  );
};

export default VerticalLayoutAdvancedToolbar;