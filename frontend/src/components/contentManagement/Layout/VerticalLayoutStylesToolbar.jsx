import { Stack, TextField, MenuItem } from "@mui/material";
import { documentStore } from "../../../store/content.store";

const VerticalLayoutStylesToolbar = ({ node }) => {
  const styles = node.content?.styles ?? {};
  const updateStyles = (updates) => {
    documentStore.updateNodeStyles(node.id,updates)
  };
  return (
    <Stack spacing={2}>
      <TextField
        label="Background Color"
        type="color"
        size="small"
        fullWidth
        value={styles.backgroundColor ?? "#ffffff"}
        onChange={(event) =>
          updateStyles({ backgroundColor: event.target.value })
        }
      />

      <TextField
        label="Width"
        size="small"
        fullWidth
        value={styles.width ?? "100%"}
        onChange={(event) => updateStyles({ width: event.target.value })}
        placeholder="100%, 500px, auto"
      />

      <TextField
        label="Minimum Height"
        size="small"
        fullWidth
        value={styles.minHeight ?? ""}
        onChange={(event) => updateStyles({ minHeight: event.target.value })}
        placeholder="200px, 50vh"
      />

      <TextField
        label="Padding"
        size="small"
        fullWidth
        value={styles.padding ?? ""}
        onChange={(event) => updateStyles({ padding: event.target.value })}
        placeholder="16px or 16px 24px"
      />

      <TextField
        label="Border Radius"
        size="small"
        fullWidth
        value={styles.borderRadius ?? ""}
        onChange={(event) =>
          updateStyles({ borderRadius: event.target.value })
        }
        placeholder="8px"
      />

      <TextField
        select
        label="Overflow"
        size="small"
        fullWidth
        value={styles.overflow ?? "visible"}
        onChange={(event) => updateStyles({ overflow: event.target.value })}
      >
        <MenuItem value="visible">Visible</MenuItem>
        <MenuItem value="hidden">Hidden</MenuItem>
        <MenuItem value="auto">Auto</MenuItem>
      </TextField>
    </Stack>
  );
};

export default VerticalLayoutStylesToolbar;