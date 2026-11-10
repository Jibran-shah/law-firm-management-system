import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

function Video({ node }) {
  const styles = node.content?.styles || {};
  const videoUrl = node.content?.url;

  const videoStyles = {
    width: "100%",
    aspectRatio: "16 / 9",
    height: "auto",
    border: 0,
    display: "block",
    ...styles,
  };

  return videoUrl ? (
    <Box
      component="iframe"
      src={videoUrl}
      title="Video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      sx={videoStyles}
    />
  ) : (
    <Skeleton
      variant="rectangular"
      animation="wave"
      sx={{
        ...videoStyles,
        borderRadius: 1,
      }}
    />
  );
}

export default Video;