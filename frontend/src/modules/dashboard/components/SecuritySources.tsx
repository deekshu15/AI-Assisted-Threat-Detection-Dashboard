import StorageRoundedIcon from "@mui/icons-material/StorageRounded";

import {
  Avatar,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";

const sources = [
  {
    name: "Windows Logs",
    status: 98,
  },
  {
    name: "Firewall",
    status: 96,
  },
  {
    name: "IDS / IPS",
    status: 91,
  },
  {
    name: "Threat Intelligence",
    status: 87,
  },
  {
    name: "Authentication",
    status: 95,
  },
];

function SecuritySources() {
  return (
    <DashboardWidget
      title="Security Sources"
      subtitle="Connected log providers"
      height={420}
    >
      <Stack spacing={3}>
        {sources.map((source) => (
          <Stack
            key={source.name}
            spacing={1}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <Avatar
                  sx={{
                    bgcolor: "#E0F2FE",
                    color: "#0284C7",
                  }}
                >
                  <StorageRoundedIcon />
                </Avatar>

                <Typography fontWeight={600}>
                  {source.name}
                </Typography>
              </Stack>

              <Typography
                color="primary"
                fontWeight={700}
              >
                {source.status}%
              </Typography>
            </Stack>

            <LinearProgress
              variant="determinate"
              value={source.status}
              sx={{
                height: 8,
                borderRadius: 10,
              }}
            />
          </Stack>
        ))}
      </Stack>
    </DashboardWidget>
  );
}

export default SecuritySources;