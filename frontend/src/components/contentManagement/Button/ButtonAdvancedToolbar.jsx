import { Stack, TextField, FormControlLabel, Switch } from "@mui/material";
import { documentStore } from "../../../store/content.store";

const ButtonAdvancedToolbar = ({ node }) => {

  const updateNodeContent = (updates)=>documentStore.updateNodeContent(node.id, updates)

  return (
    <Stack spacing={2}>
      <TextField
        label="HTML ID"
        size="small"
        fullWidth
        value={node.htmlId ?? ""}
        onChange={(event) => updateNodeContent({ htmlId: event.target.value })}
        placeholder="my-button"
      />

      <TextField
        label="CSS Class"
        size="small"
        fullWidth
        value={node.cssClass ?? ""}
        onChange={(event) => updateNodeContent({ cssClass: event.target.value })}
        placeholder="custom-button"
      />

      <FormControlLabel
        label="Hidden"
        control={
          <Switch
            checked={Boolean(node.hidden)}
            onChange={(event) => updateNodeContent({ hidden: event.target.checked })}
          />
        }
      />
    </Stack>
  );
};

export default ButtonAdvancedToolbar;