
import { useState } from "react";
import ButtonMUI from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { documentStore } from "../../../store/content.store";

function Button({ node, selected = false }) {
  const [label, setLabel] = useState(node.label ?? "");
  const [url, setUrl] = useState(node.url ?? "");
  const [variant, setVariant] = useState(node.variant ?? "contained");
  const [newTab, setNewTab] = useState(node.newTab ?? false);

  function update(field, value) {
    documentStore.updateNode(node.id, {
      [field]: value,
    });
  }

  if (selected) {
    return (
      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Button Text"
          value={label}
          onChange={(event) => {
            const value = event.target.value;
            setLabel(value);
            update("label", value);
          }}
        />

        <TextField
          fullWidth
          label="URL"
          placeholder="https://example.com"
          value={url}
          onChange={(event) => {
            const value = event.target.value;
            setUrl(value);
            update("url", value);
          }}
        />

        <FormControl fullWidth>
          <InputLabel>Variant</InputLabel>
          <Select
            value={variant}
            label="Variant"
            onChange={(event) => {
              const value = event.target.value;
              setVariant(value);
              update("variant", value);
            }}
          >
            <MenuItem value="contained">Contained</MenuItem>
            <MenuItem value="outlined">Outlined</MenuItem>
            <MenuItem value="text">Text</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Switch
              checked={newTab}
              onChange={(event) => {
                const value = event.target.checked;
                setNewTab(value);
                update("newTab", value);
              }}
            />
          }
          label="Open in new tab"
        />

        <ButtonMUI
          variant={variant}
          component="span"
          sx={{ textTransform: "none", alignSelf: "flex-start" }}
        >
          {label || "Button"}
        </ButtonMUI>
      </Stack>
    );
  }

  if (!node.label) return null;

  return (
    <ButtonMUI
      component="a"
      href={node.url || "#"}
      target={node.newTab ? "_blank" : undefined}
      rel={node.newTab ? "noopener noreferrer" : undefined}
      variant={node.variant ?? "contained"}
      sx={{ textTransform: "none" }}
    >
      {node.label}
    </ButtonMUI>
  );
}

export default Button;
