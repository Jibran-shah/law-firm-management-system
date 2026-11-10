
export const normalizeFiles = (value) => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

export const getNextFiles = ({
  currentFiles,
  selectedFiles,
  multiple,
  maxFiles,
}) => {
  if (!multiple) return selectedFiles.slice(0, 1);

  return [...currentFiles, ...selectedFiles].slice(0, maxFiles);
};

export const validateFiles = ({
  value,
  multiple = false,
  minFiles = 0,
  maxFiles = multiple ? Infinity : 1,
  maxSizeMB = 5,
  accept,
  required = false,
}) => {
  const files = normalizeFiles(value);

  if (required && !files.length) {
    return "At least one file is required";
  }

  if (files.length < minFiles) {
    return `Select at least ${minFiles} file(s)`;
  }

  if (files.length > maxFiles) {
    return `Select no more than ${maxFiles} file(s)`;
  }

  const oversizedFile = files.find(
    (file) => file.size > maxSizeMB * 1024 * 1024
  );

  if (oversizedFile) {
    return `Each file must be ${maxSizeMB} MB or smaller`;
  }

  if (accept) {
    const allowed = accept
      .split(",")
      .map((type) => type.trim().toLowerCase());

    const invalidFile = files.find((file) => {
      const extension = `.${file.name.split(".").pop().toLowerCase()}`;

      return !allowed.some((type) => {
        if (type.startsWith(".")) return extension === type;
        if (type.endsWith("/*")) return file.type.startsWith(type.slice(0, -1));
        return file.type === type;
      });
    });

    if (invalidFile) {
      return `Invalid file type: ${invalidFile.name}`;
    }
  }

  return true;
};
