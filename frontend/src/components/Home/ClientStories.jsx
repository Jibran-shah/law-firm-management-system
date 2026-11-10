import { Box, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../api/client.api";
import ClientStory from "./ClientStory";

const ClientStories = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["client-stories"],
    queryFn: async () => {
      const response = await apiClient.get("client-stories");
      return response.data?.data;
    },
  });

  const stories = data?.clientStories ?? [];

  if (isPending || isError || stories.length === 0) {
    return null;
  }

  return (
    <Box component="section" sx={storiesSectionSx}>
      <Stack spacing={1.5} sx={storiesHeadingSx}>
        <Typography variant="overline" sx={storiesEyebrowSx}>
          CLIENT EXPERIENCES
        </Typography>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1.9rem", md: "2.6rem" },
            lineHeight: 1.2,
          }}
        >
          Trusted by the People We Represent
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ maxWidth: 650, lineHeight: 1.8 }}
        >
          Every case is different. We are committed to providing thoughtful
          guidance, clear communication, and dedicated legal representation
          throughout the process.
        </Typography>
      </Stack>

      <Box sx={storiesGridSx}>
        {stories.slice(0, 3).map((story) => (
          <ClientStory key={story._id} story={story} />
        ))}
      </Box>
    </Box>
  );
};

/** @type {import("@mui/material").SxProps} */
const storiesSectionSx = {
  display: "flex",
  flexDirection: "column",
  gap: { xs: 3, md: 4 },
  py: { xs: 5, md: 8 },
  px: { xs: 2, md: 4 },
};

/** @type {import("@mui/material").SxProps} */
const storiesHeadingSx = {
  maxWidth: 760,
};

/** @type {import("@mui/material").SxProps} */
const storiesEyebrowSx = {
  color: "secondary.dark",
  fontWeight: 700,
  letterSpacing: "0.14em",
};

/** @type {import("@mui/material").SxProps} */
const storiesGridSx = {
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    md: "repeat(2, minmax(0, 1fr))",
    lg: "repeat(3, minmax(0, 1fr))",
  },
  gap: 2.5,
  alignItems: "stretch",
};

export default ClientStories;