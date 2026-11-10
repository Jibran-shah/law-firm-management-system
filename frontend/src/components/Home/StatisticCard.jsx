import { Box, Typography } from "@mui/material";

/** @type {import("@mui/material").SxProps} */
const cardSx = {
  width: "fit-content",
  minWidth: 160,
  maxWidth: 280,
  p: 3,
  border: 1,
  borderColor: "divider",
  borderRadius: 2,
  bgcolor: "background.paper",
  transition: "border-color 0.2s, box-shadow 0.2s",
  "&:hover": {
    borderColor: "primary.main",
    boxShadow: 2,
  },
};

/** @type {import("@mui/material").SxProps} */
const valueSx = {
  color: "primary.main",
  fontWeight: 700,
  mb: 1,
};

const StatisticCard = ({ value, name }) => (
  <Box sx={cardSx}>
    <Typography variant="h3" sx={valueSx}>
      {value}
    </Typography>

    <Typography variant="body2" color="text.secondary">
      {name}
    </Typography>
  </Box>
);

export default StatisticCard;