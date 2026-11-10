import { Alert, Box, Divider, Paper, Stack, Typography } from "@mui/material";

import BasicInfoForm from "../components/law-firm-settings/BasicInfoForm.jsx";
import ContactInfoForm from "../components/law-firm-settings/ContactInfoForm.jsx";
import OfficeLocationForm from "../components/law-firm-settings/OfficeLocationForm.jsx";
import StatisticsForm from "../components/law-firm-settings/StatisticsForm.jsx";
import FaqsForm from "../components/law-firm-settings/FaqsForm.jsx";
import TimingsForm from "../components/law-firm-settings/TimingsForm.jsx";

const UpdateFirmPage = () => {
  return (
    <Box sx={pageSx}>
      <Paper elevation={2} sx={cardSx}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h4">Update Law Firm</Typography>
            <Typography color="text.secondary" variant="body2">
              Manage your firm's public information and contact details.
            </Typography>
          </Box>

          <BasicInfoForm />

          <Divider />

          <ContactInfoForm />

          <Divider />

          <OfficeLocationForm />

          <Divider />

          <StatisticsForm />

          <Divider />

          <FaqsForm />

          <Divider />

          <TimingsForm />
        </Stack>
      </Paper>
    </Box>
  );
};

/** @type {import("@mui/material").SxProps} */
const pageSx = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  px: 2,
  py: 4,
  bgcolor: "background.default",
};

/** @type {import("@mui/material").SxProps} */
const cardSx = {
  width: "100%",
  maxWidth: 760,
  p: { xs: 3, sm: 4 },
  borderRadius: 2,
  alignSelf: "flex-start",
};

export default UpdateFirmPage;