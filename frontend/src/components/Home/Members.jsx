import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../api/client.api";
import MemberCard from "../members/MemberCard";

const MembersSection = () => {
  
  const { data, isPending, isError } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const response = await apiClient.get("members");
      return response.data?.data?.members;
    },
  });

  const members = Array.isArray(data) ? data : data?.data ?? [];

  return (
    <Box component="section" sx={{ py: { xs: 5, md: 8 } }}>
      <Stack spacing={1.5} alignItems="center" textAlign="center" mb={5}>
        <Typography
          variant="overline"
          sx={{
            color: "primary.main",
            fontWeight: 700,
            letterSpacing: 2,
          }}
        >
          THE PEOPLE BEHIND OUR PRACTICE
        </Typography>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1.9rem", md: "2.6rem" },
            color: "text.primary",
          }}
        >
          Meet Our Legal Team
        </Typography>

        <Typography
          sx={{ maxWidth: 620, color: "text.secondary", lineHeight: 1.8 }}
        >
          Experienced legal professionals committed to protecting your
          interests and delivering thoughtful, effective legal solutions.
        </Typography>
      </Stack>

      {isPending ? (
        <Typography textAlign="center">
          Loading our legal team...
        </Typography>
      ) : isError ? (
        <Typography textAlign="center" color="error">
          Unable to load our legal team. Please try again later.
        </Typography>
      ) : members.length === 0 ? (
        <Typography textAlign="center" color="text.secondary">
          Our legal team profiles will be available soon.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {members.slice(0, 3).map((member) => (
            <MemberCard key={member._id} member={member} />
          ))}
        </Box>
      )}

      <Stack alignItems="center" mt={5}>
        <Button
          component={Link}
          to="/members"
          variant="outlined"
          endIcon={<ArrowForwardIcon />}
          sx={{ px: 3, py: 1.2, borderRadius: 1 }}
        >
          Meet the Entire Team
        </Button>
      </Stack>
    </Box>
  );
};

export default MembersSection;