import { Box, Stack, Typography, Divider } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { apiClient } from "../../api/client.api";

const ServicePage = () => {
  const { id } = useParams();

  const {
    data,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["services", id],
    queryFn: async () => (await apiClient.get(`services/${id}`)).data?.data,
    enabled: Boolean(id),
  });

  if (isPending) {
    return <Typography sx={{ p: 4 }}>Loading service...</Typography>;
  }

  if (isError) {
    return (
      <Typography color="error" sx={{ p: 4 }}>
        Unable to load this service.
      </Typography>
    );
  }

  const service = data.service;

  console.log(service)

  const image = service.image?.url;

  return (
    <Stack
      component="main"
      spacing={4}
      sx={{ p: { xs: 2, md: 4 }, maxWidth: 1100, mx: "auto" }}
    >
      {/* Service image */}
      <Box
        sx={{
          width: "100%",
          height: { xs: 220, sm: 320, md: 420 },
          bgcolor: "grey.100",
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        {image && (
          <Box
            component="img"
            src={image}
            alt={service.title}
            sx={{
              width: "100%",
              height: "100%",
              display: "block",
              objectFit: "cover",
            }}
          />
        )}
      </Box>

      {/* Service details */}
      <Stack spacing={2}>
        <Typography
          variant="overline"
          sx={{
            color: "primary.main",
            fontWeight: 700,
            letterSpacing: 2,
          }}
        >
          OUR LEGAL SERVICES
        </Typography>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1.9rem", md: "2.8rem" },
          }}
        >
          {service.title}
        </Typography>

        <Divider />

        <Typography variant="h5" fontWeight={600}>
          Overview
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ lineHeight: 1.9, whiteSpace: "pre-line" }}
        >
          {service.description}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ServicePage;