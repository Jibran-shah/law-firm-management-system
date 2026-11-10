import { Box, Link, Typography } from "@mui/material";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Client Stories", href: "/client-stories" },
  { label: "Members", href: "/Members" },
  { label: "Blogs", href: "/blogs" },
  { label: "Location", href: "/location" },
];

/** @type {import("@mui/material").SxProps} */
const navbarSx = {
  minHeight: 76,
  px: { xs: 2, md: 4, lg: 6 },
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 3,
  bgcolor: "background.paper",
  color: "text.primary",
  borderBottom: 1,
  borderColor: "divider",
  position: "relative",
  zIndex: 100,
};

/** @type {import("@mui/material").SxProps} */
const brandSx = {
  display: "flex",
  flexDirection: "column",
  flexShrink: 0,
  lineHeight: 1,
  "&:hover": {
    color: "primary.main",
  },
};

/** @type {import("@mui/material").SxProps} */
const brandTitleSx = {
  fontFamily: "Georgia, 'Times New Roman', serif",
  fontSize: { xs: "1.25rem", md: "1.55rem" },
  fontWeight: 700,
  letterSpacing: "-0.045em",
  lineHeight: 1.15,
  whiteSpace: "nowrap",
};

/** @type {import("@mui/material").SxProps} */
const brandSubtitleSx = {
  mt: 0.5,
  fontSize: "0.58rem",
  fontWeight: 600,
  letterSpacing: "0.19em",
  textTransform: "uppercase",
  color: "text.secondary",
  whiteSpace: "nowrap",
};

/** @type {import("@mui/material").SxProps} */
const navigationSx = {
  display: { xs: "none", md: "flex" },
  alignItems: "center",
  gap: { md: 2, lg: 3 },
};

/** @type {import("@mui/material").SxProps} */
const navLinkSx = {
  position: "relative",
  py: 1,
  color: "text.secondary",
  fontSize: "0.9rem",
  fontWeight: 500,
  whiteSpace: "nowrap",
  transition: "color 150ms ease",
  "&:hover": {
    color: "primary.main",
  },
};

/** @type {import("@mui/material").SxProps} */
const actionsSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: { xs: 1.5, sm: 2.5 },
  flexShrink: 0,
};

/** @type {import("@mui/material").SxProps} */
const loginSx = {
  color: "text.primary",
  fontSize: "0.9rem",
  fontWeight: 600,
  textDecoration: "none",
  "&:hover": {
    color: "primary.main",
  },
};

/** @type {import("@mui/material").SxProps} */
const contactSx = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  px: { xs: 1.5, sm: 2.5 },
  py: 1.25,
  borderRadius: 1,
  bgcolor: "primary.main",
  color: "primary.contrastText",
  fontSize: "0.875rem",
  fontWeight: 600,
  whiteSpace: "nowrap",
  textDecoration: "none",
  transition: "background-color 150ms ease",
  "&:hover": {
    bgcolor: "primary.dark",
    color: "primary.contrastText",
  },
};

const Navbar = () => {
  return (
    <Box component="nav" sx={navbarSx}>
      {/* Brand */}
      <Link
        href="/"
        underline="none"
        color="inherit"
        sx={brandSx}
        aria-label="Shah Law Firm home"
      >
        <Typography component="span" sx={brandTitleSx}>
          Shah Law Firm
        </Typography>

        <Typography component="span" sx={brandSubtitleSx}>
          Advocates & Legal Consultants
        </Typography>
      </Link>

      {/* Navigation */}
      <Box component="div" sx={navigationSx}>
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            underline="none"
            sx={navLinkSx}
          >
            {label}
          </Link>
        ))}
      </Box>

      {/* Actions */}
      <Box sx={actionsSx}>
        <Link href="/login" underline="none" sx={loginSx}>
          Login
        </Link>

        <Link href="/about/#contact" underline="none" sx={contactSx}>
          Contact Us
        </Link>
      </Box>
    </Box>
  );
};

export default Navbar;