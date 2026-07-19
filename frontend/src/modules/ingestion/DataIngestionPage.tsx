import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { useRef } from "react";

import { Box, Button, Typography } from "@mui/material";

function DataIngestionPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 180px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        pt: { xs: 2, md: 4 },
        px: { xs: 2, md: 3 },
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 860 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, fontSize: { xs: "1.6rem", md: "1.9rem" } }}>
          Static Data Upload
        </Typography>

        <Typography sx={{ color: "text.secondary", mb: 4, maxWidth: 700, lineHeight: 1.7, fontSize: { xs: "0.95rem", md: "1rem" } }}>
          Upload CSV or JSON threat data files to visualize on the dashboard.
        </Typography>

        <Box
          onClick={() => fileInputRef.current?.click()}
          sx={{
            minHeight: { xs: 190, md: 156 },
            borderRadius: 0,
            border: "2px solid rgba(148, 163, 184, 0.22)",
            bgcolor: "rgba(255,255,255,0.02)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            px: 2,
            cursor: "pointer",
            overflow: "hidden",
            transition: "border-color 180ms ease, box-shadow 180ms ease, background-color 180ms ease",
            "&:hover": {
              borderColor: "#22d3ee",
              bgcolor: "rgba(34, 211, 238, 0.05)",
              boxShadow: "0 0 0 2px rgba(34, 211, 238, 0.18)",
            },
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: 420 }}>
            <DescriptionOutlinedIcon sx={{ fontSize: 44, color: "text.secondary", mb: 1 }} />
            <Typography sx={{ color: "text.secondary", fontSize: { xs: "0.95rem", md: "1rem" } }}>
              Drop CSV or JSON files here
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.7 }}>
              or click to browse
            </Typography>
            <input ref={fileInputRef} type="file" accept=".csv,.json" hidden />
            <Button
              variant="contained"
              onClick={(event) => {
                event.stopPropagation();
                fileInputRef.current?.click();
              }}
              sx={{ mt: 2.2, minWidth: 140, whiteSpace: "nowrap" }}
            >
              Browse Files
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default DataIngestionPage;
