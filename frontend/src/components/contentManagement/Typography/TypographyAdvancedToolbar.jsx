// TypographyAdvancedToolbar.jsx

import { Stack, TextField, FormControlLabel, Switch } from "@mui/material";

/**
 * Advanced settings for a typography node.
 *
 * @param {{ node: object }} props
 */
const TypographyAdvancedToolbar = ({ node }) => {
  const updateNode = (updates) => {
    node.update?.(updates);
  };

  return (
    <Stack spacing={2}>
      <TextField
        label="HTML ID"
        size="small"
        fullWidth
        value={node.htmlId ?? ""}
        onChange={(event) => updateNode({ htmlId: event.target.value })}
        placeholder="text-section"
      />

      <TextField
        label="CSS Class"
        size="small"
        fullWidth
        value={node.cssClass ?? ""}
        onChange={(event) => updateNode({ cssClass: event.target.value })}
        placeholder="custom-text"
      />

      <FormControlLabel
        label="Hide Text"
        control={
          <Switch
            checked={Boolean(node.hidden)}
            onChange={(event) => updateNode({ hidden: event.target.checked })}
          />
        }
      />
    </Stack>
  );
};

export default TypographyAdvancedToolbar;