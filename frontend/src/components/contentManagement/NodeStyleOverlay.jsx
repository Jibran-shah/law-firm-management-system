import { useSyncExternalStore } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { documentStore } from "../../store/content.store";

function NodeStyleOverlay({ node }) {
  useSyncExternalStore(
    (listener) => documentStore.subscribeNode(node.id, listener),
    () => node.version
  );

  const styles = node.content?.styles ?? {};

  function updateStyle(property, value) {
    const currentNode = documentStore.getNode(node.id);
    if (!currentNode) return;

    const currentContent = currentNode.content ?? {};

    documentStore.updateNode(node.id, {
      content: {
        ...currentContent,
        styles: {
          ...(currentContent.styles ?? {}),
          [property]: value,
        },
      },
    });
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: 360,
        overflowY: "auto",
        p: 1.25,
        backgroundColor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1.5,
        boxShadow: 3,

        "&::-webkit-scrollbar": {
          width: 5,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "divider",
          borderRadius: 5,
        },
      }}
      onClick={(event) => event.stopPropagation()}
    >
      <Stack spacing={1.25}>
        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <TextField
            size="small"
            label="Width"
            value={styles.width ?? ""}
            onChange={(e) => updateStyle("width", e.target.value)}
            placeholder="100%"
          />

          <TextField
            size="small"
            label="Height"
            value={styles.height ?? ""}
            onChange={(e) => updateStyle("height", e.target.value)}
            placeholder="auto"
          />

          <TextField
            size="small"
            label="Margin"
            value={styles.margin ?? ""}
            onChange={(e) => updateStyle("margin", e.target.value)}
            placeholder="16px"
          />

          <TextField
            size="small"
            label="Padding"
            value={styles.padding ?? ""}
            onChange={(e) => updateStyle("padding", e.target.value)}
            placeholder="16px"
          />

          <TextField
            size="small"
            label="Border"
            value={styles.border ?? ""}
            onChange={(e) => updateStyle("border", e.target.value)}
            placeholder="1px solid"
          />

          <TextField
            size="small"
            label="Radius"
            value={styles.borderRadius ?? ""}
            onChange={(e) => updateStyle("borderRadius", e.target.value)}
            placeholder="8px"
          />

          <TextField
            size="small"
            label="Background"
            value={styles.background ?? ""}
            onChange={(e) => updateStyle("background", e.target.value)}
            placeholder="#fff"
          />

          <TextField
            size="small"
            label="Opacity"
            value={styles.opacity ?? ""}
            onChange={(e) => updateStyle("opacity", e.target.value)}
            placeholder="1"
          />
        </Box>
      </Stack>
    </Box>
  );
}

export default NodeStyleOverlay;