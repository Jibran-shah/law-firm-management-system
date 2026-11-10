import { useState } from "react";
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const defaultStyles = {
  color: "",
  backgroundColor: "",
  fontSize: "",
  fontWeight: "",
  fontFamily: "",
  textAlign: "",
  lineHeight: "",
  letterSpacing: "",
  padding: "",
  margin: "",
  width: "",
  height: "",
  minHeight: "",
  maxWidth: "",
  border: "",
  borderRadius: "",
  boxShadow: "",
  opacity: "",
  display: "",
  flexDirection: "",
  justifyContent: "",
  alignItems: "",
  gap: "",
  overflow: "",
};

const StylesToolbar = ({ node }) => {
  const [styles, setStyles] = useState({
    ...defaultStyles,
    ...node?.styles,
  });

  if (!node) return null;

  const updateStyle = (key, value) => {
    const updatedStyles = {
      ...styles,
      [key]: value,
    };

    setStyles(updatedStyles);

    // Replace with your store's actual node-update method if different.
    node.update?.({ styles: updatedStyles });
  };

  const renderTextField = (label, key, placeholder = "") => (
    <TextField
      key={key}
      label={label}
      value={styles[key] ?? ""}
      placeholder={placeholder}
      size="small"
      fullWidth
      onChange={(event) => updateStyle(key, event.target.value)}
    />
  );

  const renderSelect = (label, key, options) => (
    <FormControl key={key} size="small" fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        value={styles[key] ?? ""}
        onChange={(event) => updateStyle(key, event.target.value)}
      >
        <MenuItem value="">Default</MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const renderSection = (title, children) => (
    <Stack spacing={1.5}>
      <Typography variant="subtitle2" fontWeight={600}>
        {title}
      </Typography>
      {children}
    </Stack>
  );

  return (
    <Stack spacing={2.5} sx={{ p: 2 }}>
      {renderSection("Text", [
        renderTextField("Text Color", "color", "#000000"),
        renderTextField("Font Size", "fontSize", "16px"),
        renderSelect("Font Weight", "fontWeight", [
          { label: "Normal", value: "400" },
          { label: "Medium", value: "500" },
          { label: "Semi-bold", value: "600" },
          { label: "Bold", value: "700" },
        ]),
        renderTextField("Font Family", "fontFamily", "inherit"),
        renderSelect("Text Alignment", "textAlign", [
          { label: "Left", value: "left" },
          { label: "Center", value: "center" },
          { label: "Right", value: "right" },
          { label: "Justify", value: "justify" },
        ]),
        renderTextField("Line Height", "lineHeight", "1.5"),
        renderTextField("Letter Spacing", "letterSpacing", "0px"),
      ])}

      <Divider />

      {renderSection("Background", [
        renderTextField("Background Color", "backgroundColor", "#ffffff"),
        renderTextField("Opacity", "opacity", "1"),
      ])}

      <Divider />

      {renderSection("Spacing", [
        renderTextField("Padding", "padding", "16px"),
        renderTextField("Margin", "margin", "0px"),
        renderTextField("Gap", "gap", "8px"),
      ])}

      <Divider />

      {renderSection("Dimensions", [
        renderTextField("Width", "width", "100%"),
        renderTextField("Height", "height", "auto"),
        renderTextField("Minimum Height", "minHeight", "0px"),
        renderTextField("Maximum Width", "maxWidth", "none"),
      ])}

      <Divider />

      {renderSection("Border & Effects", [
        renderTextField("Border", "border", "1px solid #ddd"),
        renderTextField("Border Radius", "borderRadius", "4px"),
        renderTextField("Box Shadow", "boxShadow", "none"),
      ])}

      <Divider />

      {renderSection("Layout", [
        renderSelect("Display", "display", [
          { label: "Block", value: "block" },
          { label: "Inline", value: "inline" },
          { label: "Inline Block", value: "inline-block" },
          { label: "Flex", value: "flex" },
          { label: "Grid", value: "grid" },
          { label: "None", value: "none" },
        ]),
        renderSelect("Flex Direction", "flexDirection", [
          { label: "Row", value: "row" },
          { label: "Column", value: "column" },
          { label: "Row Reverse", value: "row-reverse" },
          { label: "Column Reverse", value: "column-reverse" },
        ]),
        renderSelect("Justify Content", "justifyContent", [
          { label: "Start", value: "flex-start" },
          { label: "Center", value: "center" },
          { label: "End", value: "flex-end" },
          { label: "Space Between", value: "space-between" },
          { label: "Space Around", value: "space-around" },
          { label: "Space Evenly", value: "space-evenly" },
        ]),
        renderSelect("Align Items", "alignItems", [
          { label: "Start", value: "flex-start" },
          { label: "Center", value: "center" },
          { label: "End", value: "flex-end" },
          { label: "Stretch", value: "stretch" },
        ]),
        renderSelect("Overflow", "overflow", [
          { label: "Visible", value: "visible" },
          { label: "Hidden", value: "hidden" },
          { label: "Auto", value: "auto" },
          { label: "Scroll", value: "scroll" },
        ]),
      ])}
    </Stack>
  );
};

export default StylesToolbar;