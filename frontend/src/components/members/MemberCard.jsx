import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

const MemberCard = ({ member }) => {
  return (
    <Box
      sx={{
        overflow: "hidden",
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 16px 36px rgba(0,0,0,0.1)",
          borderColor: "primary.light",
        },
        "&:hover .member-image": {
          transform: "scale(1.05)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          aspectRatio: "4 / 4.2",
          bgcolor: "action.hover",
        }}
      >
        <Box
          component="img"
          className="member-image"
          src={member.avatar?.url}
          alt={member.name}
          loading="lazy"
          sx={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            transition: "transform 0.5s ease",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: "45% 0 0",
            background:
              "linear-gradient(to bottom, transparent, rgba(0,0,0,0.48))",
            pointerEvents: "none",
          }}
        />

        <Typography
          sx={{
            position: "absolute",
            bottom: 16,
            left: 20,
            color: "#fff",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          Legal Professional
        </Typography>
      </Box>

      <Stack spacing={1.5} sx={{ p: { xs: 2.5, md: 3 } }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            lineHeight: 1.35,
            color: "text.primary",
          }}
        >
          {member.name}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "primary.main",
            fontWeight: 600,
            lineHeight: 1.6,
          }}
        >
          {member.professionalTitle}
        </Typography>

        <Box
          sx={{
            width: 40,
            height: 2,
            bgcolor: "primary.main",
            my: 0.5,
          }}
        />

        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            lineHeight: 1.8,
            minHeight: 50,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {member.qualifications}
        </Typography>

        <Button
          component={Link}
          to={`/members/${member._id}`}
          variant="text"
          endIcon={<ArrowForwardIcon />}
          sx={{
            alignSelf: "flex-start",
            px: 0,
            mt: 0.5,
            fontWeight: 600,
            "& .MuiButton-endIcon": {
              transition: "transform 0.2s ease",
            },
            "&:hover .MuiButton-endIcon": {
              transform: "translateX(4px)",
            },
          }}
        >
          View Profile
        </Button>
      </Stack>
    </Box>
  );
};

export default MemberCard;