import { useContext } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { FirmContext } from "../layouts/RootLayout";

const AboutUsPage = () => {
  const { firm } = useContext(FirmContext);
  const contactInfo = firm?.contactInfo;
  const timings = firm?.timings ?? [];
  const phoneNumbers = contactInfo?.phoneNumbers ?? [];
  const whatsapp = contactInfo?.whatsapp;

  return (
    <Stack component="main" spacing={0} sx={pageSx}>
      <Box component="section" sx={heroSx}>
        <Box sx={contentWidthSx}>
          <Typography sx={eyebrowSx}>ABOUT THE FIRM</Typography>

          <Typography variant="h4" sx={heroTitleSx}>
            {firm?.name ?? "Our Law Firm"}
          </Typography>

          <Typography sx={heroDescriptionSx}>
            {firm?.description ??
              "We provide legal guidance and representation shaped around our clients' circumstances and needs."}
          </Typography>

          <Button
            component={"a"}
            to="/services"
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={buttonSx}
          >
            Explore Our Services
          </Button>
        </Box>
      </Box>

      <Box component="section" sx={sectionSx}>
        <Box sx={contentWidthSx}>
          <Grid container spacing={{ xs: 3, md: 7 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography sx={eyebrowSx}>OUR APPROACH</Typography>
              <Typography variant="h5" sx={sectionTitleSx}>
                Clear advice. Personal attention.
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              <Stack spacing={2}>
                <Typography sx={bodyTextSx}>
                  Every legal matter has its own circumstances, concerns, and
                  challenges. Understanding those details is an important
                  part of providing useful legal guidance.
                </Typography>

                <Typography sx={bodyTextSx}>
                  We aim to explain legal options clearly, communicate
                  important developments, and help clients understand the
                  steps involved in their matter. Our approach is built around
                  careful consideration, direct communication, and attention
                  to each client's individual needs.
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {(phoneNumbers.length > 0 ||
        contactInfo?.email ||
        whatsapp ||
        timings.length > 0) && (
        <Box component="section" sx={contactSectionSx} id="contact-us">
          <Box sx={contentWidthSx}>
            <Grid container spacing={{ xs: 4, md: 8 }}>
              <Grid size={{ xs: 12, md: 5 }}>
                <Typography sx={eyebrowSx}>CONTACT</Typography>

                <Typography variant="h5" sx={sectionTitleSx}>
                  Get in touch
                </Typography>

                <Typography sx={bodyTextSx}>
                  Contact our office to make an enquiry about your legal
                  matter.
                </Typography>

                <Stack spacing={2.5} sx={{ mt: 3 }}>
                  {phoneNumbers.map((phone) => (
                    <ContactItem
                      key={phone}
                      icon={<CallOutlinedIcon />}
                      label="Phone"
                      value={phone}
                      href={`tel:${phone}`}
                    />
                  ))}

                  {contactInfo?.email && (
                    <ContactItem
                      icon={<EmailOutlinedIcon />}
                      label="Email"
                      value={contactInfo.email}
                      href={`mailto:${contactInfo.email}`}
                    />
                  )}

                  {whatsapp && (
                    <ContactItem
                      icon={<WhatsAppIcon />}
                      label="WhatsApp"
                      value="Message our office"
                      href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                      external
                    />
                  )}
                </Stack>
              </Grid>

              {timings.length > 0 && (
                <Grid size={{ xs: 12, md: 7 }}>
                  <Box sx={hoursCardSx}>
                    <Stack
                      direction="row"
                      spacing={1.5}
                      alignItems="center"
                      sx={{ mb: 2.5 }}
                    >
                      <AccessTimeOutlinedIcon color="action" />

                      <Typography variant="subtitle1" fontWeight={600}>
                        Office hours
                      </Typography>
                    </Stack>

                    <Stack divider={<Divider flexItem />} spacing={0}>
                      {timings.map(({ day, open, close, isClosed }) => (
                        <Stack
                          key={day}
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          spacing={2}
                          sx={{ py: 1.5 }}
                        >
                          <Typography variant="body2">{day}</Typography>

                          <Typography
                            variant="body2"
                            color={isClosed ? "text.secondary" : "text.primary"}
                            fontWeight={500}
                            textAlign="right"
                          >
                            {isClosed ? "Closed" : `${open} – ${close}`}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
      )}
    </Stack>
  );
};

const ContactItem = ({ icon, label, value, href, external = false }) => (
  <Stack direction="row" spacing={1.5} alignItems="flex-start">
    <Box sx={contactIconSx}>{icon}</Box>

    <Box sx={{ minWidth: 0 }}>
      <Typography variant="caption" color="text.secondary" display="block">
        {label}
      </Typography>

      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        underline="hover"
        color="text.primary"
        sx={contactLinkSx}
      >
        {value}
      </Link>
    </Box>
  </Stack>
);

/** @type {import("@mui/material").SxProps} */
const pageSx = {
  width: "100%",
  bgcolor: "background.default",
};

/** @type {import("@mui/material").SxProps} */
const contentWidthSx = {
  width: "100%",
  maxWidth: 1120,
  mx: "auto",
};

/** @type {import("@mui/material").SxProps} */
const heroSx = {
  px: { xs: 2.5, md: 5 },
  py: { xs: 7, md: 9 },
  bgcolor: "background.paper",
  borderBottom: 1,
  borderColor: "divider",
};

/** @type {import("@mui/material").SxProps} */
const eyebrowSx = {
  mb: 1.5,
  color: "secondary.main",
  fontSize: "0.72rem",
  fontWeight: 700,
  letterSpacing: "0.12em",
};

/** @type {import("@mui/material").SxProps} */
const heroTitleSx = {
  mb: 2,
  maxWidth: 760,
  fontWeight: 600,
  lineHeight: 1.2,
  overflowWrap: "anywhere",
};

/** @type {import("@mui/material").SxProps} */
const heroDescriptionSx = {
  maxWidth: 720,
  color: "text.secondary",
  fontSize: "1rem",
  lineHeight: 1.8,
};

/** @type {import("@mui/material").SxProps} */
const buttonSx = {
  mt: 3,
  px: 2,
  py: 1,
  borderRadius: 1,
  textTransform: "none",
  fontWeight: 500,
  boxShadow: "none",
  "&:hover": {
    boxShadow: 1,
  },
};

/** @type {import("@mui/material").SxProps} */
const sectionSx = {
  px: { xs: 2.5, md: 5 },
  py: { xs: 5, md: 7 },
};

/** @type {import("@mui/material").SxProps} */
const sectionTitleSx = {
  mt: 0.5,
  mb: 2,
  fontWeight: 600,
  lineHeight: 1.35,
};

/** @type {import("@mui/material").SxProps} */
const bodyTextSx = {
  color: "text.secondary",
  lineHeight: 1.85,
};

/** @type {import("@mui/material").SxProps} */
const contactSectionSx = {
  px: { xs: 2.5, md: 5 },
  py: { xs: 5, md: 7 },
  bgcolor: "background.paper",
  borderTop: 1,
  borderColor: "divider",
};

/** @type {import("@mui/material").SxProps} */
const contactIconSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  color: "text.secondary",
  pt: 0.25,
};

/** @type {import("@mui/material").SxProps} */
const contactLinkSx = {
  fontSize: "0.9rem",
  fontWeight: 500,
  overflowWrap: "anywhere",
};

/** @type {import("@mui/material").SxProps} */
const hoursCardSx = {
  p: { xs: 2, sm: 3 },
  border: 1,
  borderColor: "divider",
  borderRadius: 1.5,
  bgcolor: "background.default",
};

export default AboutUsPage;