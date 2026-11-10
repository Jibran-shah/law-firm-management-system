import { Box, Typography } from "@mui/material";
import StatisticCard from "./StatisticCard";
import { useContext } from "react";
import { FirmContext } from "../../layouts/RootLayout";

export const StatisticsSection = () => {
  const { firm } = useContext(FirmContext);
  const statistics = firm?.statistics ?? [];

  if (!statistics.length) return null;

  return (
    <Box component="section" sx={sectionSx}>
      <Box sx={introductionSx}>
        <Typography variant="overline" sx={eyebrowSx}>
          At a Glance
        </Typography>

        <Typography variant="h3" sx={titleSx}>
          Experience You Can Rely On
        </Typography>

        <Typography color="text.secondary" sx={descriptionSx}>
          Our experience and client-focused approach guide the work we do
          for every client.
        </Typography>
      </Box>

      <Box sx={gridSx}>
        {statistics.map(({ _id, name, value }, index) => (
          <StatisticCard
            key={_id ?? name ?? index}
            value={value}
            name={name}
          />
        ))}
      </Box>
    </Box>
  );
};

/** @type {import("@mui/material").SxProps} */
const sectionSx = {
  px: { xs: 2, md: 6 },
  py: { xs: 7, md: 10 },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: { xs: 4, md: 5 },
};

/** @type {import("@mui/material").SxProps} */
const introductionSx = {
  maxWidth: 680,
  textAlign: "center",
};

/** @type {import("@mui/material").SxProps} */
const eyebrowSx = {
  color: "secondary.main",
  fontWeight: 700,
  letterSpacing: "0.14em",
};

/** @type {import("@mui/material").SxProps} */
const titleSx = {
  mt: 1,
  mb: 2,
  fontWeight: 700,
};

/** @type {import("@mui/material").SxProps} */
const descriptionSx = {
  lineHeight: 1.8,
  maxWidth: 600,
  mx: "auto",
};

/** @type {import("@mui/material").SxProps} */
const gridSx = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: 2.5,
  width: "100%",
};