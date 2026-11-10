import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

/** @type {import("@mui/material").SxProps} */
const consultationSectionSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  gap: 2,
  px: {
    xs: 2,
    md: 4,
  },
  py: {
    xs: 6,
    md: 9,
  },
  backgroundColor: "secondary.main",
  color: "secondary.contrastText",
  borderRadius: 1,
};

/** @type {import("@mui/material").SxProps} */
const consultationEyebrowSx = {
  fontWeight: 700,
  letterSpacing: "0.14em",
  opacity: 0.85,
};

/** @type {import("@mui/material").SxProps} */
const consultationTitleSx = {
  maxWidth: 800,
};

/** @type {import("@mui/material").SxProps} */
const consultationDescriptionSx = {
  maxWidth: 620,
  opacity: 0.9,
  lineHeight: 1.8,
};

/** @type {import("@mui/material").SxProps} */
const consultationActionsSx = {
  mt: 2,
  alignItems: "center",
};

/** @type {import("@mui/material").SxProps} */
const consultationButtonSx = {
  backgroundColor: "primary.main",
  color: "primary.contrastText",
  "&:hover": {
    backgroundColor: "primary.dark",
  },
};

/** @type {import("@mui/material").SxProps} */
const consultationIconButtonSx = {
  width: 48,
  height: 48,
  backgroundColor: "primary.main",
  color: "primary.contrastText",
  "&:hover": {
    backgroundColor: "primary.dark",
  },
};

/** @type {import("@mui/material").SxProps} */
const consultationArrowSx = {
  transform: "rotate(-45deg)",
};

const ConsultationCTA = () => {
  return (
    <Box
      component="section"
      sx={consultationSectionSx}
    >
      <Typography
        variant="overline"
        sx={consultationEyebrowSx}
      >
        Take the next step
      </Typography>

      <Typography
        variant="h3"
        sx={consultationTitleSx}
      >
        Let's discuss how we can help
      </Typography>

      <Typography
        variant="body1"
        sx={consultationDescriptionSx}
      >
        Every legal matter begins with understanding your circumstances.
        Schedule a consultation to discuss your situation and understand the
        options available to you.
      </Typography>

      <Stack
        direction="row"
        spacing={1}
        sx={consultationActionsSx}
      >
        <Button
          variant="contained"
          href="#contact"
          size="large"
          sx={consultationButtonSx}
        >
          Request a Consultation
        </Button>

        <IconButton
          aria-label="Request a consultation"
          href="#contact"
          sx={consultationIconButtonSx}
        >
          <ArrowRightAltIcon sx={consultationArrowSx} />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default ConsultationCTA;