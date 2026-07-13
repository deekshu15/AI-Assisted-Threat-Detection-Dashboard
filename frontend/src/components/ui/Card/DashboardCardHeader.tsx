import { Box, Divider, Typography } from "@mui/material";
import React from "react";

interface DashboardCardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

function DashboardCardHeader({
  title,
  subtitle,
  action,
}: DashboardCardHeaderProps) {
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        mb={2}
      >
        <Box>
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>

          {subtitle && (
            <Typography
              variant="body2"
              color="text.secondary"
              mt={0.5}
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        {action}
      </Box>

      <Divider />
    </>
  );
}

export default DashboardCardHeader;