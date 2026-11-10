// ButtonStylesToolbar.jsx

import { Stack, TextField, MenuItem } from "@mui/material";

/**
 * Styles settings for a button node.
 *
 * @param {{ node: object }} props
 */
const ButtonStylesToolbar = ({ node }) => {

  const styles = node.content?.styles ?? {};

  const updateStyles = (updates) => documentStore.updateNodeStyles(node.id,updates)

  return (
    <Stack spacing={2}>
      <TextField
        select
        label="Variant"
        size="small"
        fullWidth
        value={styles.variant ?? "contained"}
        onChange={(event) => updateStyles({ variant: event.target.value })}
      >
        <MenuItem value="contained">Contained</MenuItem>
        <MenuItem value="outlined">Outlined</MenuItem>
        <MenuItem value="text">Text</MenuItem>
      </TextField>

      <TextField
        label="Text Color"
        type="color"
        size="small"
        fullWidth
        value={styles.color ?? "#ffffff"}
        onChange={(event) => updateStyles({ color: event.target.value })}
      />

      <TextField
        label="Background Color"
        type="color"
        size="small"
        fullWidth
        value={styles.backgroundColor ?? "#1976d2"}
        onChange={(event) =>
          updateStyles({ backgroundColor: event.target.value })
        }
      />

      <TextField
        label="Font Size (px)"
        type="number"
        size="small"
        fullWidth
        value={styles.fontSize ?? 16}
        onChange={(event) =>
          updateStyles({
            fontSize: event.target.value === "" ? "" : Number(event.target.value),
          })
        }
        slotProps={{ htmlInput: { min: 8, max: 100 } }}
      />

      <TextField
        label="Padding (px)"
        type="number"
        size="small"
        fullWidth
        value={styles.padding ?? 10}
        onChange={(event) =>
          updateStyles({
            padding: event.target.value === "" ? "" : Number(event.target.value),
          })
        }
        slotProps={{ htmlInput: { min: 0, max: 100 } }}
      />

      <TextField
        label="Border Radius (px)"
        type="number"
        size="small"
        fullWidth
        value={styles.borderRadius ?? 4}
        onChange={(event) =>
          updateStyles({
            borderRadius:
              event.target.value === "" ? "" : Number(event.target.value),
          })
        }
        slotProps={{ htmlInput: { min: 0, max: 100 } }}
      />

      <TextField
        select
        label="Width"
        size="small"
        fullWidth
        value={styles.width ?? "fit-content"}
        onChange={(event) => updateStyles({ width: event.target.value })}
      >
        <MenuItem value="fit-content">Fit Content</MenuItem>
        <MenuItem value="100%">Full Width</MenuItem>
      </TextField>
    </Stack>
  );
};

export default ButtonStylesToolbar;