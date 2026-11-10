import {
  Box,
  Button,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BlogCard from "../../components/blogs/BlogCard";

const BlogsPage = () => {
  return (
    <Stack component="main" sx={pageSx}>
      {/* Hero */}
      <Box component="section" sx={heroSx}>
        <Box sx={heroContentSx}>
          <Typography variant="overline" sx={heroEyebrowSx}>
            Shah Law Firm
          </Typography>

          <Typography variant="h1" sx={heroTitleSx}>
            Legal Insights & Resources
          </Typography>

          <Typography variant="body1" sx={heroDescriptionSx}>
            Explore practical legal information, guidance, and insights
            designed to help you better understand your rights, options, and
            the legal matters that may affect you.
          </Typography>

          <Box sx={searchContainerSx}>
            <OutlinedInput
              fullWidth
              placeholder="Search articles..."
              sx={searchInputSx}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon sx={searchIconSx} />
                </InputAdornment>
              }
            />
          </Box>
        </Box>
      </Box>

      {/* Blogs */}
      <Box component="section" sx={blogSectionSx}>
        <Box sx={sectionHeaderSx}>
          <Box>
            <Typography variant="overline" sx={sectionEyebrowSx}>
              Our Articles
            </Typography>

            <Typography variant="h2" sx={sectionTitleSx}>
              Explore Our Legal Insights
            </Typography>
          </Box>

          <Stack direction="row" sx={categoryListSx}>
            {blogCategories.map((category, index) => (
              <Button
                key={category}
                variant={index === 0 ? "contained" : "outlined"}
                color={index === 0 ? "primary" : "inherit"}
                size="small"
                sx={categoryButtonSx}
              >
                {category}
              </Button>
            ))}
          </Stack>
        </Box>

        <Box sx={blogGridSx}>
          {blogs.map((blog) => {
              return (<BlogCard blog={blog}/>)
            })}
        </Box>
      </Box>
    </Stack>
  );
};

export default BlogsPage;


const blogCategories = [
  "All",
  "Family Law",
  "Legal Advice",
  "Property",
  "Court & Representation",
];

const blogs = [
  {
    category: "Family Law",
    title: "Understanding Your Legal Options During Separation",
    description:
      "A practical overview of the legal considerations individuals should understand when dealing with separation and related family matters.",
    date: "June 12, 2026",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=900&q=80",
  },
  {
    category: "Legal Advice",
    title: "What to Consider Before Seeking Legal Advice",
    description:
      "Understanding your circumstances and preparing the right information can help make your initial legal consultation more productive.",
    date: "May 28, 2026",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80",
  },
  {
    category: "Property",
    title: "Important Considerations in Property Disputes",
    description:
      "An introduction to some of the legal and practical considerations that may arise when dealing with property-related disputes.",
    date: "May 10, 2026",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80",
  },
  {
    category: "Court & Representation",
    title: "Understanding the Legal Representation Process",
    description:
      "Learn what clients can generally expect when seeking legal representation and how matters may progress through the legal process.",
    date: "April 22, 2026",
    image:
      "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?auto=format&fit=crop&w=900&q=80",
  },
];

/** @type {import("@mui/material").SxProps} */
const pageSx = {
  backgroundColor: "background.default",
};

/** @type {import("@mui/material").SxProps} */
const heroSx = {
  minHeight: { xs: 420, md: 500 },
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  px: { xs: 2, md: 4 },
  py: { xs: 7, md: 10 },
  textAlign: "center",
  backgroundColor: "primary.main",
  color: "primary.contrastText",
};

/** @type {import("@mui/material").SxProps} */
const heroContentSx = {
  width: "100%",
  maxWidth: 800,
};

/** @type {import("@mui/material").SxProps} */
const heroEyebrowSx = {
  color: "secondary.light",
  fontWeight: 700,
  letterSpacing: "0.14em",
};

/** @type {import("@mui/material").SxProps} */
const heroTitleSx = {
  mt: 1,
  mb: 2,
};

/** @type {import("@mui/material").SxProps} */
const heroDescriptionSx = {
  maxWidth: 650,
  mx: "auto",
  lineHeight: 1.8,
  opacity: 0.85,
};

/** @type {import("@mui/material").SxProps} */
const searchContainerSx = {
  width: "100%",
  maxWidth: 600,
  mt: 4,
  mx: "auto",
};

/** @type {import("@mui/material").SxProps} */
const searchInputSx = {
  width: "100%",
  backgroundColor: "background.paper",
  color: "text.primary",
  borderRadius: 1,
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "secondary.main",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "secondary.main",
  },
};

/** @type {import("@mui/material").SxProps} */
const searchIconSx = {
  color: "text.secondary",
};

/** @type {import("@mui/material").SxProps} */
const blogSectionSx = {
  px: { xs: 2, md: 4 },
  py: { xs: 6, md: 9 },
};

/** @type {import("@mui/material").SxProps} */
const sectionHeaderSx = {
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  alignItems: { md: "flex-end" },
  justifyContent: "space-between",
  gap: 3,
  mb: 4,
};

/** @type {import("@mui/material").SxProps} */
const sectionEyebrowSx = {
  color: "secondary.dark",
  fontWeight: 700,
  letterSpacing: "0.14em",
};

/** @type {import("@mui/material").SxProps} */
const sectionTitleSx = {
  mt: 1,
};

/** @type {import("@mui/material").SxProps} */
const categoryListSx = {
  display: "flex",
  flexWrap: "wrap",
  gap: 1,
};

/** @type {import("@mui/material").SxProps} */
const categoryButtonSx = {
  borderRadius: 1,
};

/** @type {import("@mui/material").SxProps} */
const blogGridSx = {
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(2, 1fr)",
    lg: "repeat(3, 1fr)",
  },
  gap: 3,
};