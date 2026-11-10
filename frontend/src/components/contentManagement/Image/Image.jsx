import Box from "@mui/material/Box";

function Image({ node }) {

  const content = node.content ?? {};
  
  const styles = content.styles ?? {};

  console.log("image updated", node.content)

  if(content.src){
    return (
      <Box
        component="img"
        src={content.src}
        alt={content.alt ?? ""}
        sx={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          ...styles
        }}
      />
    )
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        minHeight: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px dashed",
        borderColor: "divider",
        boxSizing: "border-box",
        ...styles
      }}
    >
      Image
    </Box>
  )
}

export default Image;