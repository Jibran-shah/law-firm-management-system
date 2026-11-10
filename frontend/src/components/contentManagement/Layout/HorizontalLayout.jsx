
import Box from "@mui/material/Box";
import NodeRenderer from "../NodeEditorRenderer";

function HorizontalLayout({ node, selected = false }) {
  const styles = node.content?.styles ?? {};
  const overflow = styles.overflow ?? "wrap";
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: `${styles.gap ?? 16}px`,
        width: styles.width ?? "100%",
        minHeight: styles.minHeight,
        p: styles.padding,
        backgroundColor: styles.backgroundColor,
        overflowX: overflow === "scroll" ? "auto" : "visible",
        flexWrap: overflow === "wrap" ? "wrap" : "nowrap",
        border: selected ? "1px dashed" : "1px solid transparent",
        borderColor: selected ? "primary.main" : "transparent",
        boxSizing: "border-box",
        ...styles
      }}
    >
      {node.children?.map((child) => (
        <NodeRenderer key={child.id} node={child} />
      ))}
    </Box>
  );
}

export default HorizontalLayout;
