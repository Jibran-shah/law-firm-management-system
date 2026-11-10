
import { Stack } from "@mui/material";
import FilePreview from "./FilePreview";

const FileList = ({ files, onRemove, disabled = false }) => {
  return (
    <Stack>
      {files.map((file, index) => (
        <FilePreview
          key={`${file.name}-${file.size}-${index}`}
          file={file}
          disabled={disabled}
          onRemove={() => onRemove(index)}
        />
      ))}
    </Stack>
  );
};

export default FileList;
