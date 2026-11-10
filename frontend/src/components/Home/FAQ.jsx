import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useContext } from "react";
import { FirmContext } from "../../layouts/RootLayout";


const FAQ = () => {

  const {firm} = useContext(FirmContext);

  const faqs = firm.faqs ?? []

  return (
    <Box
      component="section"
      sx={faqSectionSx}
    >
      {/* Header */}
      <Box sx={faqHeaderSx}>
        <Box>
          <Typography
            variant="overline"
            sx={faqEyebrowSx}
          >
            FAQ
          </Typography>

          <Typography variant="h3">
            Frequently asked questions
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            alignItems:"center"
          }}
        >
          <Button
            href="#help-center"
            sx={faqHelpButtonSx}
          >
            Help Center
          </Button>

          <IconButton
            href="#help-center"
            aria-label="Visit help center"
            sx={faqHelpIconButtonSx}
          >
            <ArrowRightAltIcon sx={faqHelpIconSx} />
          </IconButton>
        </Stack>
      </Box>

      {/* Questions */}
      <Stack spacing={1}>
        {faqs.map((faq, index) => (
          <Accordion
            key={faq.question}
            defaultExpanded={index === 0}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`faq-${index}-content`}
              id={`faq-${index}-header`}
            >
              <Typography
                variant="h6"
                sx={faqQuestionSx}
              >
                {faq.question}
              </Typography>
            </AccordionSummary>

            <AccordionDetails id={`faq-${index}-content`}>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={faqAnswerSx}
              >
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Box>
  );
};


const faqs = [
  {
    question: "What areas of family law do you handle?",
    answer:
      "We assist with a range of family law matters, including divorce and separation, child-related matters, financial disputes, and other legal issues affecting families.",
  },
  {
    question: "What should I bring to my first consultation?",
    answer:
      "Bring any documents that are relevant to your matter, along with a clear summary of your circumstances and any important dates or existing court orders.",
  },
  {
    question: "How does the initial consultation work?",
    answer:
      "The initial consultation gives you an opportunity to explain your circumstances, discuss your concerns, and understand the legal options that may be available to you.",
  },
  {
    question: "How long will my case take?",
    answer:
      "The timeframe depends on the nature and complexity of the matter, the parties involved, and whether an agreement can be reached. We can provide a more specific indication after understanding your circumstances.",
  },
];

/** @type {import("@mui/material").SxProps} */
const faqSectionSx = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  mb: 2,
};

/** @type {import("@mui/material").SxProps} */
const faqHeaderSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 2,
};

/** @type {import("@mui/material").SxProps} */
const faqEyebrowSx = {
  color: "secondary.dark",
  fontWeight: 700,
  letterSpacing: "0.14em",
};

/** @type {import("@mui/material").SxProps} */
const faqHelpButtonSx = {
  display: {
    xs: "none",
    sm: "inline-flex",
  },
};

/** @type {import("@mui/material").SxProps} */
const faqHelpIconButtonSx = {
  color: "primary.main",
};

/** @type {import("@mui/material").SxProps} */
const faqHelpIconSx = {
  transform: "rotate(-45deg)",
};

/** @type {import("@mui/material").SxProps} */
const faqQuestionSx = {
  fontSize: {
    xs: "1rem",
    md: "1.1rem",
  },
  fontWeight: 600,
};

/** @type {import("@mui/material").SxProps} */
const faqAnswerSx = {
  maxWidth: 800,
  lineHeight: 1.8,
};

export default FAQ;