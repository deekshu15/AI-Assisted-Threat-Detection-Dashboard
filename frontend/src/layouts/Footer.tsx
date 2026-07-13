import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 5,
        py: 3,
        borderTop: "1px solid",
        borderColor: "divider",
        textAlign: "center",
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
      >
        © 2026 AI-Assisted Threat Detection Dashboard
      </Typography>

      <Typography
        variant="caption"
        color="text.secondary"
      >
        Built with React • TypeScript • Material UI • AWS
      </Typography>
    </Box>
  );
}

export default Footer;