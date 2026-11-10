import { Card, CardMedia, CardContent, Typography, Box, Button } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

const BlogCard = ({ blog })=>{
  return(
    <Card key={blog.title} sx={blogCardSx}>
      <CardMedia
        component="img"
        image={blog.image}
        alt={blog.title}
        sx={blogImageSx}
      />

      <CardContent sx={blogContentSx}>
        <Typography variant="overline" sx={blogCategorySx}>
          {blog.category}
        </Typography>

        <Typography variant="h4" sx={blogTitleSx}>
          {blog.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={blogDescriptionSx}
        >
          {blog.description}
        </Typography>

        <Box sx={blogMetaSx}>
          <Typography variant="caption" sx={blogDateSx}>
            {blog.date}
          </Typography>

          <Button
            size="small"
            endIcon={<SearchIcon />}
            color="primary"
          >
            Read Article
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}


export default BlogCard


/** @type {import("@mui/material").SxProps} */
const blogCardSx = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  border: 1,
  borderColor: "divider",
  borderRadius: 1,
  backgroundColor: "background.paper",
  overflow: "hidden",
  transition: "transform 180ms ease, box-shadow 180ms ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: 4,
  },
};

/** @type {import("@mui/material").SxProps} */
const blogImageSx = {
  aspectRatio: "16 / 9",
  objectFit: "cover",
};

/** @type {import("@mui/material").SxProps} */
const blogContentSx = {
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  p: 2.5,
};

/** @type {import("@mui/material").SxProps} */
const blogCategorySx = {
  color: "secondary.dark",
  fontWeight: 700,
  letterSpacing: "0.06em",
};

/** @type {import("@mui/material").SxProps} */
const blogTitleSx = {
  mt: 1,
  mb: 1.5,
};

/** @type {import("@mui/material").SxProps} */
const blogDescriptionSx = {
  lineHeight: 1.7,
};

/** @type {import("@mui/material").SxProps} */
const blogMetaSx = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 2,
  mt: "auto",
  pt: 3,
};

/** @type {import("@mui/material").SxProps} */
const blogDateSx = {
  color: "text.secondary",
};
