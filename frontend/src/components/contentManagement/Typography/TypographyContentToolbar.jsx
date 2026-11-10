// TypographyContentToolbar.jsx

import { Stack, TextField, MenuItem } from "@mui/material";

/**
 * Content settings for a typography node.
 *
 * @param {{ node: object }} props
 */
const TypographyContentToolbar = ({ node }) => {
  const updateNode = (updates) => {
    node.update?.(updates);
  };

  return (
    <Stack spacing={2}>
      <TextField
        select
        label="HTML Tag"
        size="small"
        fullWidth
        value={node.tag ?? "p"}
        onChange={(event) => updateNode({ tag: event.target.value })}
      >
        <MenuItem value="p">Paragraph</MenuItem>
        <MenuItem value="h1">Heading 1</MenuItem>
        <MenuItem value="h2">Heading 2</MenuItem>
        <MenuItem value="h3">Heading 3</MenuItem>
        <MenuItem value="h4">Heading 4</MenuItem>
        <MenuItem value="blockquote">Blockquote</MenuItem>
      </TextField>
    </Stack>
  );
};

export default TypographyContentToolbar;