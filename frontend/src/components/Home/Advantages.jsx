import {
  Box,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import GavelIcon from "@mui/icons-material/Gavel";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import { useContext } from "react";
import { FirmContext } from "../../layouts/RootLayout";

const dummyAdvantages = [
  {
    icon: GavelIcon,
    title: "Focused Legal Experience",
    description:
      "Dedicated legal support with careful attention to the details that matter to your case.",
  },
  {
    icon: SupportAgentIcon,
    title: "Personal Attention",
    description:
      "We take the time to understand your circumstances and provide guidance tailored to your needs.",
  },
  {
    icon: VisibilityIcon,
    title: "Clear Communication",
    description:
      "Straightforward explanations and practical advice, so you understand your options at every stage.",
  },
  {
    icon: ShieldOutlinedIcon,
    title: "Your Interests Come First",
    description:
      "We approach every matter with discretion, professionalism, and a strong focus on protecting your interests.",
  },
];

const Advantages = () => {
  const {firm} = useContext(FirmContext)
  const advantages = firm.advantages.length ? firm.advantages : [];
  return (
    <Box component="section" sx={advantagesSectionSx}>
      {/* Section heading */}
      <Box sx={advantagesHeadingSx}>
        <Typography variant="overline" sx={advantagesEyebrowSx}>
          Why Choose Us
        </Typography>

        <Typography variant="h3">
          Legal support built around your needs
        </Typography>

        <Typography variant="body1" sx={advantagesDescriptionSx}>
          When dealing with a family legal matter, you need more than legal
          information. You need clear guidance, careful representation, and
          someone who understands what is at stake.
        </Typography>
      </Box>

      {/* Advantage cards */}
      <Stack
        direction="row"
        spacing={2}
        sx={advantageListSx}
      >
        {advantages.map((advantage) => {
          const Icon = advantage.icon;

          return (
            <Box
              key={advantage.title}
              sx={advantageCardSx}
            >
              <IconButton
                aria-label={advantage.title}
                sx={advantageIconSx}
              >
                <Icon />
              </IconButton>

              <Box>
                <Typography
                  variant="h5"
                  sx={advantageTitleSx}
                >
                  {advantage.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={advantageDescriptionSx}
                >
                  {advantage.description}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

/** @type {import("@mui/material").SxProps} */
const advantagesSectionSx = {
  display: "flex",
  flexDirection: "column",
  gap: 3,
  p: {
    xs: 2,
    md: 4,
  },
  backgroundColor: "primary.main",
  color: "primary.contrastText",
  borderRadius: 1,
};

/** @type {import("@mui/material").SxProps} */
const advantagesHeadingSx = {
  display: "flex",
  flexDirection: "column",
  gap: 1,
  maxWidth: 650,
};

/** @type {import("@mui/material").SxProps} */
const advantagesEyebrowSx = {
  color: "secondary.light",
  fontWeight: 700,
  letterSpacing: "0.14em",
};

/** @type {import("@mui/material").SxProps} */
const advantagesDescriptionSx = {
  color: "rgba(255, 255, 255, 0.72)",
  maxWidth: 580,
  lineHeight: 1.8,
};

/** @type {import("@mui/material").SxProps} */
const advantageListSx = {
  overflowX: "auto",
  overflowY: "hidden",
  pb: 1,
  "&::-webkit-scrollbar": {
    height: 6,
  },
};

/** @type {import("@mui/material").SxProps} */
const advantageCardSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minWidth: {
    xs: 280,
    sm: 320,
    md: 300,
  },
  minHeight: 300,
  p: 2.5,
  backgroundColor: "background.paper",
  color: "text.primary",
  border: 1,
  borderColor: "divider",
  borderRadius: 1,
  transition: "transform 180ms ease, box-shadow 180ms ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: 3,
  },
};

/** @type {import("@mui/material").SxProps} */
const advantageIconSx = {
  alignSelf: "flex-start",
  width: 48,
  height: 48,
  color: "secondary.dark",
  backgroundColor: "background.default",
  "&:hover": {
    backgroundColor: "background.default",
    color: "secondary.main",
  },
};

/** @type {import("@mui/material").SxProps} */
const advantageTitleSx = {
  mb: 1,
};

/** @type {import("@mui/material").SxProps} */
const advantageDescriptionSx = {
  lineHeight: 1.7,
};

export default Advantages;