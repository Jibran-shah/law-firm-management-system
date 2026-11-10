import {Box, Divider, Stack, Typography} from "@mui/material"
import { HeroSection } from "../components/Home/HeroSection"
import { StatisticsSection } from "../components/Home/StatisticsSection"
import Services from "../components/Home/Services"
import Advantages from "../components/Home/Advantages"
import ConsultationCTA from "../components/Home/ConsultationCTA"
import ClientStories from "../components/Home/ClientStories"
import FAQ from "../components/Home/FAQ"
import { createMemberSchema } from "../schemas/createMember.schema"
import MembersSection from "../components/Home/Members"

const HomePage = ()=>{
  return (
  <Box sx={{
    px:2,
    py:1
    }}>
    <Stack
      sx={{
        gap:"36px"
      }}
    >
      <HeroSection/>
      <StatisticsSection />
      <Services/>
      <MembersSection/>
      <Advantages/>
      <ConsultationCTA/>
      <ClientStories/>
      <FAQ/>
    </Stack>
  </Box>)
}

export default HomePage