import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";

const sections = ["Blogs", "Client Reviews"];

const DashboardPage = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Typography variant="h1">Dashboard</Typography>
        <Typography color="text.secondary">
          Manage your blogs and client reviews.
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        {sections.map((section) => (
          <Grid key={section} size={{ xs: 12, md: 6 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h3" sx={{ mb: 2 }}>
                  {section}
                </Typography>

                <Box
                  sx={{
                    py: 6,
                    textAlign: "center",
                    bgcolor: "background.default",
                    borderRadius: 1,
                  }}
                >
                  <Typography color="text.secondary">
                    Recent {section}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardPage;