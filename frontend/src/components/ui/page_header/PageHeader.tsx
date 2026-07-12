import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

function PageHeader({
  title,
  subtitle,
  action,
}: PageHeaderProps) {
  return (
    <Box
      sx={{
        mb: 4,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography
          variant="h4"
          fontWeight={700}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {subtitle}
          </Typography>
        )}
      </Box>

      {action}
    </Box>
  );
}

export default PageHeader;