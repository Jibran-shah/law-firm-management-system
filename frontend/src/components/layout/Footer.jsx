import {
  Box,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";

import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import lawLogo from "../../assets/lawFirmLogo.svg";
import { useContext } from "react";
import { FirmContext } from "../../layouts/RootLayout";



const Footer = () => {
  const {firm} = useContext(FirmContext)
  const contactInfo = firm.contactInfo;
  const timings = firm.timings;
  return (
    <Box
      component="footer" 
      sx={footerSx}
    >
      {/* Main footer content */}
      <Box sx={footerMainSx}>
        {/* Closing statement */}
        <Box sx={footerStatementSx}>
          <Typography
            variant="h3"
            sx={footerHeadingSx}
          >
            Let's resolve your legal challenge.{" "}
            <Box
              component="span"
              sx={footerHeadingAccentSx}
            >
              Let's talk.
            </Box>
          </Typography>

          <Typography
            variant="body1"
            sx={footerDescriptionSx}
          >
            Get in touch with our team to discuss your circumstances and
            understand how we may be able to assist.
          </Typography>
        </Box>

        {/* Contact */}
        <Box sx={footerContactSx}>
          <Typography
            variant="overline"
            sx={footerContactLabelSx}
          >
            Contact
          </Typography>

          <Stack
            spacing={0.75}
            sx={footerContactLinksSx}
          >
            {
              contactInfo.phoneNumbers?.map((number)=>{
                return (
                  <Link
                    href={`tel:${number}`}
                    underline="hover"
                    sx={footerPhoneSx}
                  >
                    {number}
                  </Link>
                )
              })
            }

            {
              contactInfo.email && <Link
                href={`mailto:${contactInfo.email}`}
                underline="hover"
                sx={footerEmailSx}
              >
                {contactInfo.email}
              </Link>

            }
            <Stack spacing={0.5} sx={{ mt: 1 }}>
              {timings.map(({ day, open, close, isClosed }) => (
                <Typography key={day} variant="body2" sx={footerHoursSx}>
                  <Box component="span" sx={{ display: "inline-block", minWidth: 100 }}>
                    {day}
                  </Box>
                  {isClosed ? "Closed" : `${open} – ${close}`}
                </Typography>
              ))}
            </Stack>
          </Stack>
        </Box>
      </Box>

      <Divider sx={footerDividerSx} />

      {/* Bottom navigation */}
      <Box sx={footerBottomSx}>
        {/* Logo */}
        <Box sx={footerLogoContainerSx}>
          <Box
            component="img"
            src={lawLogo}
            alt="Shah Law Firm"
            sx={footerLogoSx}
          />

          <Typography
            variant="subtitle1"
            sx={footerBrandSx}
          >
            Shah Law Firm
          </Typography>
        </Box>

        {/* Links */}
        <Stack
          direction="row"
          spacing={3}
          sx={footerLinksSx}
        >
          <Link href="#services" underline="hover" color="inherit">
            Services
          </Link>

          <Link href="#about" underline="hover" color="inherit">
            About Us
          </Link>

          <Link href="#client-stories" underline="hover" color="inherit">
            Client Stories
          </Link>

          <Link href="#blogs" underline="hover" color="inherit">
            Blogs
          </Link>

          <Link
            href="#contact"
            underline="hover"
            sx={footerContactLinkSx}
          >
            Contact
            <ArrowOutwardIcon sx={footerContactIconSx} />
          </Link>
        </Stack>

        {/* Copyright */}
        <Typography
          variant="caption"
          sx={footerCopyrightSx}
        >
          © {new Date().getFullYear()} Shah Law Firm
        </Typography>
      </Box>
    </Box>
  );
};


/** @type {import("@mui/material").SxProps} */
const footerSx = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  p: {
    xs: 2,
    md: 4,
  },
  backgroundColor: "primary.main",
  color: "primary.contrastText",
};

/** @type {import("@mui/material").SxProps} */
const footerMainSx = {
  display: "flex",
  flexDirection: {
    xs: "column",
    md: "row",
  },
  justifyContent: "space-between",
  gap: 5,
};

/** @type {import("@mui/material").SxProps} */
const footerStatementSx = {
  maxWidth: {
    xs: "100%",
    md: "60%",
  },
};

/** @type {import("@mui/material").SxProps} */
const footerHeadingSx = {
  lineHeight: 1.15,
};

/** @type {import("@mui/material").SxProps} */
const footerHeadingAccentSx = {
  display: "inline-block",
  color: "secondary.light",
};

/** @type {import("@mui/material").SxProps} */
const footerDescriptionSx = {
  mt: 2,
  maxWidth: 560,
  color: "rgba(255, 255, 255, 0.7)",
  lineHeight: 1.8,
};

/** @type {import("@mui/material").SxProps} */
const footerContactSx = {
  minWidth: {
    md: 260,
  },
};

/** @type {import("@mui/material").SxProps} */
const footerContactLabelSx = {
  color: "secondary.light",
  fontWeight: 700,
  letterSpacing: "0.14em",
};

/** @type {import("@mui/material").SxProps} */
const footerContactLinksSx = {
  mt: 1,
};

/** @type {import("@mui/material").SxProps} */
const footerPhoneSx = {
  color: "inherit",
  fontSize: "1.05rem",
};

/** @type {import("@mui/material").SxProps} */
const footerEmailSx = {
  color: "rgba(255, 255, 255, 0.7)",
};

/** @type {import("@mui/material").SxProps} */
const footerHoursSx = {
  mt: 1,
  color: "rgba(255, 255, 255, 0.55)",
  lineHeight: 1.6,
};

/** @type {import("@mui/material").SxProps} */
const footerDividerSx = {
  borderColor: "rgba(255, 255, 255, 0.18)",
};

/** @type {import("@mui/material").SxProps} */
const footerBottomSx = {
  display: "flex",
  flexDirection: {
    xs: "column",
    md: "row",
  },
  alignItems: {
    md: "center",
  },
  justifyContent: "space-between",
  gap: 3,
};

/** @type {import("@mui/material").SxProps} */
const footerLogoContainerSx = {
  display: "flex",
  alignItems: "center",
  gap: 1.25,
};

/** @type {import("@mui/material").SxProps} */
const footerLogoSx = {
  width: 40,
  height: 40,
};

/** @type {import("@mui/material").SxProps} */
const footerBrandSx = {
  fontWeight: 600,
};

/** @type {import("@mui/material").SxProps} */
const footerLinksSx = {
  flexWrap: "wrap",
  rowGap: 1,
};

/** @type {import("@mui/material").SxProps} */
const footerContactLinkSx = {
  color: "secondary.light",
  display: "flex",
  alignItems: "center",
  gap: 0.5,
};

/** @type {import("@mui/material").SxProps} */
const footerContactIconSx = {
  fontSize: 16,
};

/** @type {import("@mui/material").SxProps} */
const footerCopyrightSx = {
  color: "rgba(255, 255, 255, 0.5)",
  whiteSpace: "nowrap",
};

export default Footer;