import Box from "@mui/material/Box";
import NodeRenderer from "../NodeEditorRenderer";
function VerticalLayout({ node, selected = false }) {
  const styles = node.content?.styles ?? {};
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: `${styles.gap ?? 16}px`,
        width: styles.width ?? "100%",
        minHeight: styles.minHeight,
        p: styles.padding,
        backgroundColor: styles.backgroundColor,
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

export default VerticalLayout;
