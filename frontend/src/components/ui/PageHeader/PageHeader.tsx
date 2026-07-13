import { Box, Typography } from "@mui/material";

interface Props {
  title: string;
  subtitle?: string;
}

function PageHeader({ title, subtitle }: Props) {
  return (
    <Box mb={4}>
      <Typography variant="h4" fontWeight={800}>
        {title}
      </Typography>

      {subtitle && (
        <Typography mt={1} color="text.secondary" sx={{ maxWidth: 760, lineHeight: 1.7 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}

export default PageHeader;