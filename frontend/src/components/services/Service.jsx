import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

/** @type {import("@mui/material").SxProps} */
const cardSx = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  bgcolor: "background.paper",
  border: 1,
  borderColor: "divider",
  borderRadius: 1.5,
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  "&:hover": {
    borderColor: "primary.main",
    boxShadow: 3,
    "& .service-image": {
      transform: "scale(1.04)",
    },
  },
};

/** @type {import("@mui/material").SxProps} */
const imageWrapperSx = {
  width: "100%",
  aspectRatio: "16 / 10",
  overflow: "hidden",
  bgcolor: "action.hover",
};

/** @type {import("@mui/material").SxProps} */
const imageSx = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
  transition: "transform 0.3s ease",
};

/** @type {import("@mui/material").SxProps} */
const contentSx = {
  p: 2.5,
};

/** @type {import("@mui/material").SxProps} */
const titleSx = {
  fontWeight: 600,
  lineHeight: 1.4,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
};

/** @type {import("@mui/material").SxProps} */
const descriptionSx = {
  mt: 1,
  lineHeight: 1.7,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 3,
  overflow: "hidden",
};

const Service = ({ title, image, description, id }) => {
  const navigate = useNavigate();
  const onClick = () => navigate(`/services/${id}`);
  return (
    <Box sx={cardSx} onClick={onClick}>
      {image && (
        <Box sx={imageWrapperSx}>
          <Box
            component="img"
            className="service-image"
            src={image?.url ?? image}
            alt={title}
            loading="lazy"
            sx={imageSx}
          />
        </Box>
      )}

      <Box sx={contentSx}>
        <Typography variant="subtitle1" sx={titleSx}>
          {title}
        </Typography>

        {description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={descriptionSx}
          >
            {description}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default Service;