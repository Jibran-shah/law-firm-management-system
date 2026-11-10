
import { useSyncExternalStore } from "react";
import { Box } from "@mui/material";

import { documentStore } from "../../store/content.store.js";
import componentsRegistry from "../../registeries/contentComponents.js";

function NodeEditorRenderer({ node }) {
  const currentNode = useSyncExternalStore(
    (listener) => documentStore.subscribeNode(node.id, listener),
    () => documentStore.getNode(node.id)
  );

  const selectedNodeId = useSyncExternalStore(
    (listener) => documentStore.subscribeSelection(listener),
    () => documentStore.selectedNodeId
  );

  if (!currentNode) return null;

  const component = componentsRegistry[currentNode.type];

  if (!component) return null;

  const Component = component.component;
  const selected = selectedNodeId === currentNode.id;

  function handleClick(event) {
    event.stopPropagation();
    documentStore.selectNode(currentNode.id);
  }

  return (
    <Box sx={{ position: "relative" }} onClick={handleClick}>
      <Component node={currentNode} selected={selected} />
    </Box>
  );
}

export default NodeEditorRenderer;
