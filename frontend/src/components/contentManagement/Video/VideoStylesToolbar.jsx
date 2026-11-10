import { Stack, TextField, MenuItem } from "@mui/material";
import { documentStore } from "../../../store/content.store";

const VideoStylesToolbar = ({ node }) => {
  
  const styles = node?.content?.styles ?? {};
  const updateStyles = (key, value) => {
    documentStore.updateNodeStyles(node.id, {
      [key]: value,
    });
  };

  return (
    <Stack spacing={2}>
      <TextField
        label="Width"
        size="small"
        fullWidth
        value={styles.width ?? ""}
        placeholder="100%"
        onChange={(event) => updateStyles("width", event.target.value)}
      />

      <TextField
        label="Height"
        size="small"
        fullWidth
        value={styles.height ?? ""}
        placeholder="400px"
        onChange={(event) => updateStyles("height", event.target.value)}
      />

      <TextField
        select
        label="Aspect Ratio"
        size="small"
        fullWidth
        value={styles.aspectRatio ?? ""}
        onChange={(event) => updateStyles("aspectRatio", event.target.value)}
      >
        <MenuItem value="">Default</MenuItem>
        <MenuItem value="16 / 9">16:9</MenuItem>
        <MenuItem value="4 / 3">4:3</MenuItem>
        <MenuItem value="1 / 1">1:1</MenuItem>
        <MenuItem value="9 / 16">9:16</MenuItem>
      </TextField>

      <TextField
        select
        label="Object Fit"
        size="small"
        fullWidth
        value={styles.objectFit ?? ""}
        onChange={(event) => updateStyles("objectFit", event.target.value)}
      >
        <MenuItem value="">Default</MenuItem>
        <MenuItem value="contain">Contain</MenuItem>
        <MenuItem value="cover">Cover</MenuItem>
        <MenuItem value="fill">Fill</MenuItem>
      </TextField>

      <TextField
        label="Border Radius"
        size="small"
        fullWidth
        value={styles.borderRadius ?? ""}
        placeholder="8px"
        onChange={(event) => updateStyles("borderRadius", event.target.value)}
      />

      <TextField
        label="Margin"
        size="small"
        fullWidth
        value={styles.margin ?? ""}
        placeholder="0 auto"
        onChange={(event) => updateStyles("margin", event.target.value)}
      />

      <TextField
        label="Background Color"
        size="small"
        fullWidth
        value={styles.backgroundColor ?? ""}
        placeholder="#000000"
        onChange={(event) =>
          updateStyles("backgroundColor", event.target.value)
        }
      />

      <TextField
        select
        label="Display Alignment"
        size="small"
        fullWidth
        value={styles.displayAlignment ?? ""}
        onChange={(event) =>
          updateStyles("displayAlignment", event.target.value)
        }
      >
        <MenuItem value="">Default</MenuItem>
        <MenuItem value="left">Left</MenuItem>
        <MenuItem value="center">Center</MenuItem>
        <MenuItem value="right">Right</MenuItem>
      </TextField>
    </Stack>
  );
};

export default VideoStylesToolbar;