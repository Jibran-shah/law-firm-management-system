import { Box, Typography } from "@mui/material";
import Service from "../services/Service";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../api/client.api";

const Services = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["services"],
    queryFn: async () => (await apiClient.get("/services")).data?.data,
  });

  if (isPending || isError) return null;
  const services = data?.services ?? [];
  if (!services.length) return null;

  return (
    <Box sx={servicesContentSx}>
      <Typography variant="h3" sx={servicesTitleSx}>
        Practice Areas
      </Typography>

      <Box sx={servicesListSx}>
        {services.map((service) => (
          <Box key={service._id} sx={serviceCardSx}>
            <Service
              id={service._id}
              title={service.title}
              image={service.image}
              description={service.description}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

/** @type {import("@mui/material").SxProps} */
const servicesContentSx = {
  width: "100%",
  p: { xs: 2, md: 4 },
  bgcolor: "background.paper",
  borderRadius: 1,
};

/** @type {import("@mui/material").SxProps} */
const servicesTitleSx = {
  mb: 3,
};

/** @type {import("@mui/material").SxProps} */
const servicesListSx = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "stretch",
  gap: 3,
};

/** @type {import("@mui/material").SxProps} */
const serviceCardSx = {
  flex: "1 1 260px",
  maxWidth: 360,
  minWidth: 0,
};

export default Services;