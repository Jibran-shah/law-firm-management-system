import { Avatar, Box, Stack, Typography } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

const ClientStory = ({ story }) => {
  console.log(story)
  return (
    <Box component="article" sx={cardSx}>
      <FormatQuoteIcon
        sx={{ fontSize: 38, color: "secondary.main", mb: 1 }}
      />

      <Typography
        sx={{
          flexGrow: 1,
          color: "text.secondary",
          lineHeight: 1.85,
          whiteSpace: "pre-line",
        }}
      >
        {story.story}
      </Typography>

      <Stack
        direction="row"
        spacing={1.5}
        alignItems="center"
        sx={{ mt: 3, pt: 2, borderTop: 1, borderColor: "divider" }}
      >
        <Avatar
          src={story.client?.avatar?.url}
          alt={story.client?.name}
          sx={{ width: 46, height: 46 }}
        >
          {story.client?.name?.charAt(0)}
        </Avatar>

        <Box sx={{ minWidth: 0 }}>
          <Typography fontWeight={700}>{story.name}</Typography>
          {story.service && (
            <Typography variant="body2" color="text.secondary">
              {story.service.title}
            </Typography>
          )}
        </Box>
      </Stack>
    </Box>
  );
};


/** @type {import("@mui/material").SxProps} */
const cardSx = {
  display: "flex",
  flexDirection: "column",
  p: { xs: 2.5, md: 3 },
  height: "100%",
  minHeight: 260,
  bgcolor: "background.paper",
  border: "1px solid",
  borderColor: "divider",
  borderRadius: 1,
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  "&:hover": {
    boxShadow: "0 8px 28px rgba(15, 14, 14, 0.06)",
  },
};


export default ClientStory;