import { Box, Button, FormHelperText, Stack, Typography } from "@mui/material";
import { useController } from "react-hook-form";
import FileList from "./FileList";
import {
  normalizeFiles,
  getNextFiles,
  validateFiles,
} from "./fileinput.utils.js";

const FileInput = ({
  name,
  control,
  label = "Upload files",
  multiple = false,
  minFiles = 0,
  maxFiles = multiple ? Infinity : 1,
  maxSizeMB = 5,
  accept,
  required = false,
  disabled = false,
}) => {
  const validationOptions = {
    multiple,
    minFiles,
    maxFiles,
    maxSizeMB,
    accept,
    required,
  };

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      validate: (value) => validateFiles({ value, ...validationOptions }),
    },
  });

  const files = normalizeFiles(field.value);

  const handleChange = (event) => {
    const selectedFiles = Array.from(event.target.files || []);
    event.target.value = "";

    if (!selectedFiles.length) return;

    const nextFiles = getNextFiles({
      currentFiles: files,
      selectedFiles,
      multiple,
      maxFiles,
    });

    field.onChange(multiple ? nextFiles : nextFiles[0] || null);
  };

  const handleRemove = (index) => {
    const nextFiles = files.filter((_, i) => i !== index);
    field.onChange(multiple ? nextFiles : null);
  };

  return (
    <Stack spacing={1}>
      <Typography variant="body2" fontWeight={500}>
        {label}
      </Typography>

      <Box>
        <Button
          component="label"
          variant="outlined"
          disabled={disabled || (!multiple && files.length >= 1)}
        >
          Choose {multiple ? "Files" : "File"}
          <input
            hidden
            type="file"
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            onChange={handleChange}
            onBlur={field.onBlur}
          />
        </Button>

        <FileList
          files={files}
          onRemove={handleRemove}
          disabled={disabled}
        />
      </Box>
    </Stack>
  );
};

export default FileInput;
