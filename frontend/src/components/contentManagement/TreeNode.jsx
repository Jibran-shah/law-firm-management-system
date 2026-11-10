import { useState, useSyncExternalStore } from "react";

import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { documentStore } from "../../store/content.store";


/**
 * @param {{ node: Object, depth?: number }} props
 * @returns {JSX.Element}
 */
export const TreeNode = ({ node, depth = 0 }) => {

  const [expanded, setExpanded] = useState(true);

  const updatedNode = useSyncExternalStore(
    (listener)=>documentStore.subscribeNode(node.id,listener),
    ()=>documentStore.getNode(node.id)
  )

  const selectedNodeId = useSyncExternalStore(
    (listener) => documentStore.subscribeSelection(listener),
    () => documentStore.selectedNodeId
  );

  const children = updatedNode.children ?? [];
  const hasChildren = children.length > 0;
  const selected = selectedNodeId === node.id;

  return (
    <>
      <ListItemButton
        selected={selected}
        onClick={() => documentStore.selectNode(node.id)}
        sx={blogTreeNodeSx(depth)}
      >
        <Box
          sx={blogTreeExpandButtonSx}
          onClick={(event) => {
            event.stopPropagation();

            if (hasChildren) {
              setExpanded((value) => !value);
            }
          }}
        >
          {hasChildren ? (
            expanded ? (
              <ExpandMoreIcon fontSize="small" />
            ) : (
              <ChevronRightIcon fontSize="small" />
            )
          ) : (
            <Box sx={blogTreeEmptyExpandButtonSx} />
          )}
        </Box>

        <ListItemText
          primary={getNodeLabel(node)}
          primaryTypographyProps={{
            fontSize: 13,
            noWrap: true,
            fontWeight: selected ? 600 : 400,
          }}
        />
      </ListItemButton>

      {hasChildren && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <List disablePadding>
            {children.map((child) => (
              <TreeNode key={child.id} node={child} depth={depth + 1} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}



/**
 * Styles for an individual node in the blog structure tree.
 *
 * @param {number} depth - The node's nesting depth.
 * @returns {import("@mui/material").SxProps<import("@mui/material").Theme>}
 */
export const blogTreeNodeSx = (depth) => ({
  pl: 1.5 + depth * 2,
  pr: 1,
  py: 0.75,
  minHeight: 36,
  borderRadius: 1,
  "&.Mui-selected": {
    bgcolor: "action.selected",
    color: "primary.main",
  },
});

/**
 * Styles for the expand/collapse icon container in a tree node.
 *
 * @type {import("@mui/material").SxProps<import("@mui/material").Theme>}
 */
export const blogTreeExpandButtonSx = {
  width: 24,
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

/**
 * Styles for the placeholder shown when a tree node has no children.
 *
 * @type {import("@mui/material").SxProps<import("@mui/material").Theme>}
 */
export const blogTreeEmptyExpandButtonSx = {
  width: 16,
};



const getNodeLabel = (node) => {
  const labels = {
    "layout:vertical": "Vertical layout",
    "layout:horizontal": "Horizontal layout",
    text: "Text",
    image: "Image",
    video: "Video",
  };

  return labels[node.type] || node.type;
};