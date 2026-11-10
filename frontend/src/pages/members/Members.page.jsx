import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../api/client.api";
import MemberCard from "../../components/members/MemberCard";

const MembersPage = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const response = await apiClient.get("members");
      return response.data?.data?.members;
    },
  });

  const members = Array.isArray(data) ? data : data?.data ?? [];

  return (
    <Box component="main">
      {/* Hero */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          bgcolor: "primary.dark",
          color: "common.white",
          py: { xs: 9, md: 13 },
          "&::before": {
            content: '""',
            position: "absolute",
            width: { xs: 260, md: 440 },
            height: { xs: 260, md: 440 },
            border: "1px solid",
            borderColor: "rgba(255,255,255,0.12)",
            borderRadius: "50%",
            top: { xs: -130, md: -220 },
            right: { xs: -100, md: -80 },
          },
          "&::after": {
            content: '""',
            position: "absolute",
            width: { xs: 180, md: 300 },
            height: { xs: 180, md: 300 },
            border: "1px solid",
            borderColor: "rgba(255,255,255,0.1)",
            borderRadius: "50%",
            top: { xs: -90, md: -150 },
            right: { xs: -60, md: 0 },
          },
        }}
      >
        <Container maxWidth="lg">
          <Stack
            spacing={3}
            alignItems="flex-start"
            sx={{ position: "relative", zIndex: 1, maxWidth: 760 }}
          >
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box
                sx={{
                  width: 34,
                  height: 1,
                  bgcolor: "secondary.light",
                }}
              />
              <Typography
                variant="overline"
                sx={{
                  color: "secondary.light",
                  fontWeight: 700,
                  letterSpacing: 2.5,
                }}
              >
                OUR PEOPLE
              </Typography>
            </Stack>

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                fontWeight: 700,
                lineHeight: 1.12,
                letterSpacing: "-0.035em",
              }}
            >
              Meet the People
              <br />
              <Box component="span" sx={{ color: "secondary.light" }}>
                Behind Our Practice
              </Box>
            </Typography>

            <Typography
              sx={{
                maxWidth: 620,
                color: "rgba(255,255,255,0.78)",
                lineHeight: 1.9,
                fontSize: { xs: "1rem", md: "1.1rem" },
              }}
            >
              Get to know our legal professionals, their expertise, and their
              commitment to providing thoughtful legal guidance and
              representation.
            </Typography>

            <Button
              component="a"
              href="#legal-team"
              variant="contained"
              color="secondary"
              endIcon={<ArrowForwardIcon />}
              sx={{
                mt: 1,
                px: 3,
                py: 1.4,
                fontWeight: 700,
                borderRadius: 1,
              }}
            >
              Explore Our Team
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Members */}
      <Container maxWidth="lg">
        <Box
          component="section"
          id="legal-team"
          sx={{ py: { xs: 7, md: 11 }, scrollMarginTop: 80 }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "flex-end" }}
            spacing={2}
            sx={{ mb: 5 }}
          >
            <Stack spacing={1.5} sx={{ maxWidth: 650 }}>
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
                variant="h2"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "2rem", md: "2.8rem" },
                  letterSpacing: "-0.025em",
                  color: "text.primary",
                }}
              >
                Our Legal Team
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.8,
                  maxWidth: 580,
                }}
              >
                Dedicated professionals bringing knowledge, experience, and
                personal attention to every client and legal matter.
              </Typography>
            </Stack>

            {!isPending && !isError && members.length > 0 && (
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                  color: "text.secondary",
                  border: "1px solid",
                  borderColor: "divider",
                  px: 2,
                  py: 1,
                  flexShrink: 0,
                }}
              >
                <GroupsOutlinedIcon fontSize="small" color="primary" />
                <Typography variant="body2" fontWeight={600}>
                  {members.length}{" "}
                  {members.length === 1 ? "Professional" : "Professionals"}
                </Typography>
              </Stack>
            )}
          </Stack>

          {isPending ? (
            <Typography
              textAlign="center"
              sx={{ py: 8, color: "text.secondary" }}
            >
              Loading our legal team...
            </Typography>
          ) : isError ? (
            <Stack alignItems="center" spacing={2} sx={{ py: 8 }}>
              <Typography color="error">
                Unable to load our legal team. Please try again later.
              </Typography>
            </Stack>
          ) : members.length === 0 ? (
            <Stack
              alignItems="center"
              spacing={2}
              sx={{
                py: 9,
                px: 3,
                bgcolor: "background.default",
                border: "1px solid",
                borderColor: "divider",
                textAlign: "center",
              }}
            >
              <GroupsOutlinedIcon
                sx={{ fontSize: 42, color: "text.secondary" }}
              />
              <Typography variant="h6" fontWeight={700}>
                Our team profiles are coming soon
              </Typography>
              <Typography color="text.secondary">
                Please check back soon to learn more about our legal team.
              </Typography>
            </Stack>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, minmax(0, 1fr))",
                  md: "repeat(3, minmax(0, 1fr))",
                },
                gap: { xs: 2.5, md: 3 },
                alignItems: "stretch",
              }}
            >
              {members.map((member) => (
                <MemberCard key={member._id} member={member} />
              ))}
            </Box>
          )}
        </Box>
      </Container>

      {/* Closing section */}
      <Box
        sx={{
          bgcolor: "background.default",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
            spacing={3}
            sx={{ py: { xs: 5, md: 7 } }}
          >
            <Box>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                Need legal guidance?
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                Get in touch with our team to discuss your legal needs.
              </Typography>
            </Box>

            <Button
              component={Link}
              to="/contact"
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: 3,
                py: 1.4,
                borderRadius: 1,
                flexShrink: 0,
              }}
            >
              Contact Our Firm
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default MembersPage;