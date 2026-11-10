import { Box, Paper, Stack, Typography, Avatar, Divider } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { apiClient } from "../../api/client.api";

const ClientPage = () => {
  const { id } = useParams();

  const {
    data: client,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["client", id],
    queryFn: async () =>
      (await apiClient.get(`/clients/${id}`)).data?.data?.client,
    enabled: Boolean(id),
  });

  if (isPending) return <Typography>Loading client...</Typography>;
  if (isError || !client) return <Typography>Unable to load client information.</Typography>;

  return (
    <Box sx={pageSx}>
      <Paper sx={cardSx}>
        {client.cover?.url && (
          <Box
            component="img"
            src={client.cover.url}
            alt={`${client.name}'s cover`}
            sx={coverSx}
          />
        )}

        <Stack spacing={2} sx={contentSx}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              src={client.avatar?.url}
              alt={client.name}
              sx={avatarSx}
            >
              {client.name?.charAt(0)}
            </Avatar>

            <Box>
              <Typography variant="h4" fontWeight={600}>
                {client.name}
              </Typography>
              <Typography color="text.secondary">Client</Typography>
            </Box>
          </Stack>

          <Divider />

          <Box>
            <Typography variant="h6" sx={sectionTitleSx}>
              About
            </Typography>
            <Typography color="text.secondary" sx={textSx}>
              {client.bio || "No biography provided."}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" sx={sectionTitleSx}>
              Address
            </Typography>
            <Typography color="text.secondary" sx={textSx}>
              {client.address || "No address provided."}
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

/** @type {import("@mui/material").SxProps} */
const pageSx = {
  width: "100%",
  maxWidth: 900,
  mx: "auto",
  p: { xs: 2, md: 4 },
};

/** @type {import("@mui/material").SxProps} */
const cardSx = {
  overflow: "hidden",
  border: 1,
  borderColor: "divider",
  borderRadius: 2,
  bgcolor: "background.paper",
};

/** @type {import("@mui/material").SxProps} */
const coverSx = {
  display: "block",
  width: "100%",
  height: { xs: 180, sm: 260 },
  objectFit: "cover",
};

/** @type {import("@mui/material").SxProps} */
const contentSx = {
  p: { xs: 2.5, sm: 4 },
};

/** @type {import("@mui/material").SxProps} */
const avatarSx = {
  width: 88,
  height: 88,
  border: 2,
  borderColor: "background.paper",
  fontSize: "2rem",
};

/** @type {import("@mui/material").SxProps} */
const sectionTitleSx = {
  mb: 1,
  fontWeight: 600,
};

/** @type {import("@mui/material").SxProps} */
const textSx = {
  lineHeight: 1.8,
  whiteSpace: "pre-line",
  overflowWrap: "anywhere",
};

export default ClientPage;