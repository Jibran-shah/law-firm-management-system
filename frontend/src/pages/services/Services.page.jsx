import { Box, Grid, Stack, Typography, Link } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { apiClient } from "../../api/client.api";
import { FirmContext } from "../../layouts/RootLayout";
import Service from "../../components/services/Service";
import ClientStoryCard from "../../components/Home/ClientStory";
import backgroundImage from "../../assets/heroServices.avif";

const ServicesPage = () => {
  const { firm } = useContext(FirmContext);

  const {
    data: services = [],
    isPending: servicesPending,
    isError: servicesError,
  } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const response = await apiClient.get("/services");
      return response.data?.data?.services ?? [];
    },
  });

  const {
    data: clientStories = [],
    isPending: storiesPending,
    isError: storiesError,
  } = useQuery({
    queryKey: ["client-stories"],
    queryFn: async () => {
      const response = await apiClient.get("/client-stories");
      return response.data?.data?.clientStories ?? [];
    },
  });

  const publishedStories = clientStories.filter(
    (story) => story.isPublished
  );

  return (
    <Stack spacing={{ xs: 4, md: 5 }} sx={pageSx}>
      <Box sx={heroSx}>
        <Typography variant="h4" sx={heroTitleSx}>
          Legal Services
        </Typography>

        {firm?.name && (
          <Typography variant="body1" sx={heroFirmNameSx}>
            {firm.name}
          </Typography>
        )}

        {firm?.description && (
          <Typography sx={heroDescriptionSx}>
            {firm.description}
          </Typography>
        )}
      </Box>

      {!servicesPending && !servicesError && services.length > 0 && (
        <Box component="section" sx={sectionSx}>
          <Typography variant="h5" sx={sectionTitleSx}>
            Our Services
          </Typography>

          <Grid container spacing={2.5}>
            {services.map((service) => (
              <Grid key={service._id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Service
                  id={service._id}
                  title={service.title}
                  image={service.image}
                  description={service.description}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {!storiesPending && !storiesError && publishedStories.length > 0 && (
        <Box component="section" sx={sectionSx}>
          <Typography variant="h5" sx={sectionTitleSx}>
            Client Stories
          </Typography>

          <Grid container spacing={2.5}>
            {publishedStories.map((story) => (
              <Grid key={story._id} size={{ xs: 12, sm: 6, md: 4 }}>
                <ClientStoryCard story={story} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

    </Stack>
  );
};


/** @type {import("@mui/material").SxProps} */
const pageSx = {
  width: "100%",
  pb: 5,
};

/** @type {import("@mui/material").SxProps} */
const heroSx = {
  minHeight: { xs: 220, md: 260 },
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  px: 2,
  py: 4,
  backgroundImage: `linear-gradient(rgba(0,0,0,0.48), rgba(0,0,0,0.48)), url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  color: "common.white",
};

/** @type {import("@mui/material").SxProps} */
const heroTitleSx = {
  fontWeight: 600,
};

/** @type {import("@mui/material").SxProps} */
const heroFirmNameSx = {
  mt: 1,
  opacity: 0.95,
};

/** @type {import("@mui/material").SxProps} */
const heroDescriptionSx = {
  mt: 1.5,
  maxWidth: 680,
  lineHeight: 1.7,
  opacity: 0.9,
};

/** @type {import("@mui/material").SxProps} */
const sectionSx = {
  width: "100%",
  px: { xs: 2, md: 4 },
};

/** @type {import("@mui/material").SxProps} */
const sectionTitleSx = {
  mb: 2.5,
  fontWeight: 600,
};

/** @type {import("@mui/material").SxProps} */
const contactSectionSx = {
  mx: { xs: 2, md: 4 },
  p: { xs: 2.5, md: 3 },
  border: 1,
  borderColor: "divider",
  borderRadius: 1,
  bgcolor: "background.paper",
};

export default ServicesPage;