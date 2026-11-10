export const toFormData = (data) => {
  const formData = new FormData();

  const append = (value, key) => {
    if (value === undefined || value === null) return;

    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        append(item, `${key}[${index}]`);
      });
      return;
    }

    if (typeof value === "object") {
      Object.entries(value).forEach(([childKey, childValue]) => {
        append(childValue, key ? `${key}[${childKey}]` : childKey);
      });
      return;
    }

    formData.append(key, String(value));
  };

  Object.entries(data).forEach(([key, value]) => {
    append(value, key);
  });

  return formData;
};