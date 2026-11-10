import { Box, Button, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FirmContext } from "../../layouts/RootLayout";
import { apiClient } from "../../api/client.api";

export const HeroSection = () => {
  const { firm } = useContext(FirmContext);
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["services"],
    queryFn: async () => (await apiClient.get("services")).data?.data,
  });

  const services = data?.services ?? []

  return (
    <Box sx={heroContainerSx}>
      {/* Content */}
      <Box sx={heroContentSx}>
        <Box sx={heroTextSx}>
          <Typography variant="overline" sx={heroEyebrowSx}>
            Shah Law Firm
          </Typography>

          <Typography variant="h2" sx={heroTitleSx}>
            Trusted Legal Guidance When It Matters Most
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={heroDescriptionSx}
          >
            We provide clear, practical legal counsel focused on protecting
            your rights, resolving disputes, and helping your family move
            forward with confidence.
          </Typography>

          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={1.5}
            sx={heroActionsSx}
          >
            <Button variant="contained" href="#contact" size="large">
              Request a Consultation
            </Button>

            <Button variant="outlined" href="#services" size="large">
              Explore Our Services
            </Button>
          </Stack>
        </Box>

        {/* Quick links */}
        <Stack direction="row" spacing={3} sx={quickLinksSx}>
          {services.slice(0, 3).map((service) => (
            <Button
              key={service._id}
              variant="text"
              onClick={() => navigate(`/services/${service._id}`)}
              sx={quickLinkSx}
            >
              {service.title}
            </Button>
          ))}
        </Stack>
      </Box>

      {/* Image */}
      <Box sx={heroImageContainerSx}>
        {firm?.combinedMembersImage?.url && (
          <Box
            component="img"
            src={firm.combinedMembersImage.url}
            alt="Lawyers discussing a legal matter"
            sx={heroImageSx}
          />
        )}
      </Box>
    </Box>
  );
};

/** @type {import("@mui/material").SxProps} */
const heroContainerSx = {
  display: "flex",
  width: "100%",
  minHeight: {
    xs: "auto",
    md: "90vh",
  },
  gap: {
    xs: 3,
    md: 2,
  },
  flexDirection: {
    xs: "column",
    md: "row",
  },
};

/** @type {import("@mui/material").SxProps} */
const heroContentSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: {
    xs: "100%",
    md: "50%",
  },
  p: {
    xs: 2,
    md: 4,
  },
};

/** @type {import("@mui/material").SxProps} */
const heroTextSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  flexGrow: 1,
  maxWidth: 680,
};

/** @type {import("@mui/material").SxProps} */
const heroEyebrowSx = {
  color: "secondary.dark",
  fontWeight: 700,
  letterSpacing: "0.14em",
  mb: 1.5,
};

/** @type {import("@mui/material").SxProps} */
const heroTitleSx = {
  mb: 2,
  maxWidth: 650,
};

/** @type {import("@mui/material").SxProps} */
const heroDescriptionSx = {
  maxWidth: 580,
  fontSize: {
    xs: "1rem",
    md: "1.1rem",
  },
  lineHeight: 1.8,
};

/** @type {import("@mui/material").SxProps} */
const heroActionsSx = {
  mt: 4,
};

/** @type {import("@mui/material").SxProps} */
const quickLinksSx = {
  pt: 3,
  flexWrap: "wrap",
  rowGap: 1,
};

/** @type {import("@mui/material").SxProps} */
const quickLinkSx = {
  px: 0,
  color: "text.secondary",
  "&:hover": {
    color: "primary.main",
    backgroundColor: "transparent",
  },
};

/** @type {import("@mui/material").SxProps} */
const heroImageContainerSx = {
  width: {
    xs: "100%",
    md: "50%",
  },
  minHeight: {
    xs: 420,
    md: "auto",
  },
  overflow: "hidden",
  borderRadius: 1,
};

/** @type {import("@mui/material").SxProps} */
const heroImageSx = {
  display: "block",
  width: "100%",
  height: "100%",
  objectFit: "cover",
};