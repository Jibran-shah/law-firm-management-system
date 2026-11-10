import { Avatar, Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../api/client.api";

const ClientStoriesPage = () => {
  const {
    data: stories = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["client-stories"],
    queryFn: async () => {
      const response = await apiClient.get("/client-stories");
      console.log(response.data.data.clientStories)
      return response.data?.data?.clientStories ?? [];
    },
  });

  const publishedStories = stories.filter((story) => story.isPublished);

  return (
    <Stack spacing={6} sx={{ py: 8, px: { xs: 2, md: 6 } }}>
      <Box textAlign="center">
        <Typography variant="h1" sx={{ fontSize: { xs: 36, md: 52 }, fontWeight: 700 }}>
          Client Stories
        </Typography>
      </Box>

      <Box>
        <Typography variant="h2" sx={{ fontSize: { xs: 28, md: 36 }, mb: 4 }}>
          Stories From Our Clients
        </Typography>

        {isPending && (
          <Typography>Loading client stories...</Typography>
        )}

        {isError && (
          <Typography color="error">
            Failed to load client stories. Please try again later.
          </Typography>
        )}

        {!isPending && !isError && publishedStories.length === 0 && (
          <Typography color="text.secondary">
            No client stories available yet.
          </Typography>
        )}

        <Grid container spacing={3}>
          {publishedStories.map((story) => (
            <Grid key={story._id} size={{ xs: 12, md: 6 }}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent sx={{ p: 3 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        src={story.client?.avatar?.url}
                        alt={story.client?.name ?? "Client"}
                        sx={{ width: 52, height: 52 }}
                      >
                        {story.client?.name?.charAt(0)}
                      </Avatar>

                      <Box>
                        <Typography fontWeight={600}>
                          {story.client?.name ?? "Client"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(story.createdAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Stack>

                    <Typography variant="h5" fontWeight={600}>
                      {story.title}
                    </Typography>

                    {story.service && (
                      <Typography variant="body2" color="text.secondary">
                        Service: {story.service.title}
                      </Typography>
                    )}

                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ whiteSpace: "pre-line", lineHeight: 1.8 }}
                    >
                      {story.story}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
};

export default ClientStoriesPage;