import Chip from "@mui/material/Chip";

interface StatusChipProps {
  status: "Online" | "Offline";
}

function StatusChip({
  status,
}: StatusChipProps) {
  return (
    <Chip
      label={status}
      color={
        status === "Online"
          ? "success"
          : "error"
      }
      size="small"
    />
  );
}

export default StatusChip;