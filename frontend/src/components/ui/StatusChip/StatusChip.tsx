import Chip from "@mui/material/Chip";

export type StatusType =
  | "Healthy"
  | "Running"
  | "Online"
  | "Processing"
  | "Warning"
  | "Critical"
  | "Offline"
  | "Error"
  | "Resolved"
  | "Investigating"
  | "Open";

interface StatusChipProps {
  status: StatusType;
}

function StatusChip({
  status,
}: StatusChipProps) {
  const getColor = () => {
    switch (status) {
      case "Healthy":
      case "Running":
      case "Online":
      case "Resolved":
        return "success";

      case "Processing":
      case "Investigating":
      case "Warning":
        return "warning";

      case "Critical":
      case "Offline":
      case "Error":
      case "Open":
        return "error";

      default:
        return "default";
    }
  };

  return (
    <Chip
      label={status}
      color={getColor()}
      size="small"
      variant="filled"
    />
  );
}

export default StatusChip;