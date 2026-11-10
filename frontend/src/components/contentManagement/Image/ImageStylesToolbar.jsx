import { Stack, TextField, MenuItem } from "@mui/material";
import { documentStore } from "../../../store/content.store";

const ImageStylesToolbar = ({ node }) => {
  const styles = node.content?.styles ?? {};

  const updateStyles = (updates) =>
    documentStore.updateNodeStyles(node.id, updates);

  return (
    <Stack spacing={1.5}>
      <TextField
        label="Width"
        size="small"
        fullWidth
        value={styles.width ?? "100%"}
        onChange={(e) => updateStyles({ width: e.target.value })}
        placeholder="100%, 500px, auto"
      />

      <TextField
        label="Height"
        size="small"
        fullWidth
        value={styles.height ?? "auto"}
        onChange={(e) => updateStyles({ height: e.target.value })}
        placeholder="auto, 300px"
      />

      <TextField
        select
        label="Aspect Ratio"
        size="small"
        fullWidth
        value={styles.aspectRatio ?? "auto"}
        onChange={(e) => updateStyles({ aspectRatio: e.target.value })}
      >
        <MenuItem value="auto">Auto (Original)</MenuItem>
        <MenuItem value="1 / 1">1:1 (Square)</MenuItem>
        <MenuItem value="4 / 3">4:3</MenuItem>
        <MenuItem value="3 / 2">3:2</MenuItem>
        <MenuItem value="16 / 9">16:9</MenuItem>
        <MenuItem value="9 / 16">9:16 (Portrait)</MenuItem>
        <MenuItem value="21 / 9">21:9</MenuItem>
      </TextField>

      <TextField
        select
        label="Object Fit"
        size="small"
        fullWidth
        value={styles.objectFit ?? "cover"}
        onChange={(e) => updateStyles({ objectFit: e.target.value })}
      >
        <MenuItem value="cover">Cover</MenuItem>
        <MenuItem value="contain">Contain</MenuItem>
        <MenuItem value="fill">Fill</MenuItem>
        <MenuItem value="none">None</MenuItem>
        <MenuItem value="scale-down">Scale Down</MenuItem>
      </TextField>

      <TextField
        select
        label="Alignment"
        size="small"
        fullWidth
        value={styles.displayAlignment ?? "left"}
        onChange={(e) =>
          updateStyles({ displayAlignment: e.target.value })
        }
      >
        <MenuItem value="left">Left</MenuItem>
        <MenuItem value="center">Center</MenuItem>
        <MenuItem value="right">Right</MenuItem>
      </TextField>

      <TextField
        label="Border Radius"
        size="small"
        fullWidth
        value={styles.borderRadius ?? "0px"}
        onChange={(e) => updateStyles({ borderRadius: e.target.value })}
        placeholder="8px, 50%"
      />

      <TextField
        label="Margin"
        size="small"
        fullWidth
        value={styles.margin ?? ""}
        onChange={(e) => updateStyles({ margin: e.target.value })}
        placeholder="0 auto, 16px 0"
      />
    </Stack>
  );
};

export default ImageStylesToolbar;