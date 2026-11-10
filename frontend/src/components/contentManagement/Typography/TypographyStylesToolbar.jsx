import { Stack, TextField, MenuItem } from "@mui/material";
import { documentStore } from "../../../store/content.store";

const TypographyStylesToolbar = ({ node }) => {

  const styles = node.content?.styles ?? {};
  
  const updateStyles = (key, value) => {
    documentStore.updateNodeStyles(node.id, {
      [key]: value,
    });
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
          updateStyles("backgroundColor", event.target.value)
        }
      />

      {fields.map(({ key, label, placeholder, defaultValue = "" }) => (
        <TextField
          key={key}
          label={label}
          size="small"
          fullWidth
          value={styles[key] ?? defaultValue}
          onChange={(event) => updateStyles(key, event.target.value)}
          placeholder={placeholder}
        />
      ))}

      <TextField
        select
        label="Overflow"
        size="small"
        fullWidth
        value={styles.overflow ?? "visible"}
        onChange={(event) => updateStyles("overflow", event.target.value)}
      >
        <MenuItem value="visible">Visible</MenuItem>
        <MenuItem value="hidden">Hidden</MenuItem>
        <MenuItem value="auto">Auto</MenuItem>
        <MenuItem value="scroll">Scroll</MenuItem>
      </TextField>
    </Stack>
  );
};

export default TypographyStylesToolbar;


const fields = [
    {
      key: "width",
      label: "Width",
      placeholder: "100%, 500px, auto",
      defaultValue: "100%",
    },
    {
      key: "minHeight",
      label: "Minimum Height",
      placeholder: "100px, 50vh",
    },
    {
      key: "padding",
      label: "Padding",
      placeholder: "16px or 16px 24px",
    },
    {
      key: "margin",
      label: "Margin",
      placeholder: "16px 0",
    },
    {
      key: "borderRadius",
      label: "Border Radius",
      placeholder: "8px",
    },
    {
      key: "border",
      label: "Border",
      placeholder: "1px solid #dddddd",
    },
  ];