import { Stack, Box, Typography } from "@mui/material"

const ClientStoryPage = () => {
  return (
    <Stack>
      <Box sx={{
        display:"flex",
        justifyContent:"center",
        p:2
      }}>
        <Box sx={{
          width:"100%",
          backgroundColor:"#f12972ec",
          aspectRatio:"3/1",
          maxWidth:"700px",
          borderRadius:"8px"
        }}>
        </Box>
      </Box>
      <Box sx={{
        p:2
      }}>
        <Typography variant="h1">What he says</Typography>
      </Box>
      <Box sx={{
        p:2
      }}>
        <Typography variant="h6">story in text</Typography>
        <Typography variant="body1">Name</Typography>
        <Typography variant="body2">Designation</Typography>
      </Box>
    </Stack>
  )
}


export default ClientStoryPage