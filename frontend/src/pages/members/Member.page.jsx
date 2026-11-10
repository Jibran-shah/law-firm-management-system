import { Avatar, Box, Stack, Typography, Divider } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { apiClient } from "../../api/client.api";

const MemberPage = () => {
  const { id } = useParams();

  const {
    data,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["members", id],
    queryFn: async () => (await apiClient.get(`members/${id}`)).data?.data,
    enabled: Boolean(id),
  });

  if (isPending) {
    return <Typography sx={{ p: 4 }}>Loading member profile...</Typography>;
  }

  if (isError) {
    return (
      <Typography sx={{ p: 4 }} color="error">
        Unable to load this member profile.
      </Typography>
    );
  }

  const member = data.member
  const avatar =  member.avatar?.url;
  const cover = member.cover?.url;
  const address = member.location?.address;
  const contactInfo = member.contactInfo ?? {};
  const services = member.services ?? [];

  return (
    <Stack spacing={3} sx={{ p: { xs: 2, md: 4 }, maxWidth: 1100, mx: "auto" }}>
      {/* Cover and member details */}
      <Box>
        <Box
          sx={{
            height: { xs: 160, md: 260 },
            bgcolor: "grey.200",
            backgroundImage: cover ? `url("${cover}")` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 1,
          }}
        />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "flex-start", sm: "flex-end" }}
          sx={{ mt: { xs: -4, sm: -6 }, px: { xs: 2, sm: 3 } }}
        >
          <Avatar
            src={avatar}
            alt={member.name}
            sx={{
              width: { xs: 88, sm: 120 },
              height: { xs: 88, sm: 120 },
              border: 4,
              borderColor: "background.paper",
              bgcolor: "primary.main",
            }}
          >
            {member.name?.charAt(0)}
          </Avatar>

          <Box sx={{ pb: 1 }}>
            <Typography variant="h4" fontWeight={700}>
              {member.name}
            </Typography>

            {member.professionalTitle && (
              <Typography color="primary.main" fontWeight={600}>
                {member.professionalTitle}
              </Typography>
            )}

            {address && (
              <Typography color="text.secondary">{address}</Typography>
            )}
          </Box>
        </Stack>
      </Box>

      {/* Biography */}
      {member.bio && (
        <>
          <Box>
            <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
              About
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
              {member.bio}
            </Typography>
          </Box>
          <Divider />
        </>
      )}

      {/* Qualifications */}
      {member.qualifications && (
        <>
          <Box>
            <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
              Qualifications
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
              {member.qualifications}
            </Typography>
          </Box>
          <Divider />
        </>
      )}

      {/* Contact information */}
      <Box>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
          Contact Information
        </Typography>

        <Stack spacing={2}>
          {contactInfo.email && (
            <Box>
              <Typography variant="body2" color="text.secondary">
                Email
              </Typography>
              <Typography
                component="a"
                href={`mailto:${contactInfo.email}`}
                sx={{ color: "primary.main", textDecoration: "none" }}
              >
                {contactInfo.email}
              </Typography>
            </Box>
          )}

          {contactInfo.phoneNumbers?.length > 0 && (
            <Box>
              <Typography variant="body2" color="text.secondary">
                Phone
              </Typography>
              {contactInfo.phoneNumbers.map((phone) => (
                <Typography key={phone}>
                  <Box
                    component="a"
                    href={`tel:${phone}`}
                    sx={{ color: "primary.main", textDecoration: "none" }}
                  >
                    {phone}
                  </Box>
                </Typography>
              ))}
            </Box>
          )}

          {address && (
            <Box>
              <Typography variant="body2" color="text.secondary">
                Address
              </Typography>
              <Typography>{address}</Typography>
            </Box>
          )}
        </Stack>
      </Box>

      {/* Related services */}
      {services.length > 0 && (
        <>
          <Divider />
          <Box>
            <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
              Related Services
            </Typography>

            <Stack spacing={1}>
              {services.map((service) => (
                <Typography
                  key={service._id}
                  component={Link}
                  to={`/services/${service._id}`}
                  sx={{
                    color: "primary.main",
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {service.name}
                </Typography>
              ))}
            </Stack>
          </Box>
        </>
      )}
    </Stack>
  );
};

export default MemberPage;