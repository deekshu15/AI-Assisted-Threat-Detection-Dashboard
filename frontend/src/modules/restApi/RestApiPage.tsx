import { useMemo, useState } from "react";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";

import GlassSurface from "../../components/ui/GlassSurface";

type HeaderRow = {
  id: number;
  key: string;
  value: string;
};

type ResponseState = {
  status: number;
  statusText: string;
  durationMs: number;
  headers: Record<string, string>;
  body: string;
};

const methods = ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"];

const initialHeaders: HeaderRow[] = [{ id: 1, key: "", value: "" }];

function buildHeaders(rows: HeaderRow[]) {
  const headers: Record<string, string> = {};

  rows.forEach((row) => {
    const key = row.key.trim();
    if (key) {
      headers[key] = row.value;
    }
  });

  return headers;
}

function formatResponseBody(contentType: string | null, bodyText: string) {
  if (!bodyText) {
    return "";
  }

  if (contentType?.includes("application/json")) {
    try {
      return JSON.stringify(JSON.parse(bodyText), null, 2);
    } catch {
      return bodyText;
    }
  }

  return bodyText;
}

function RestApiPage() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("https://api.example.com/data");
  const [headers, setHeaders] = useState<HeaderRow[]>(initialHeaders);
  const [response, setResponse] = useState<ResponseState | null>(null);
  const [requestError, setRequestError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const normalizedHeaders = useMemo(() => buildHeaders(headers), [headers]);

  const updateHeaderRow = (id: number, field: keyof Pick<HeaderRow, "key" | "value">, value: string) => {
    setHeaders((current) => current.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  };

  const addHeaderRow = () => {
    setHeaders((current) => [...current, { id: Date.now(), key: "", value: "" }]);
  };

  const removeHeaderRow = (id: number) => {
    setHeaders((current) => (current.length > 1 ? current.filter((row) => row.id !== id) : initialHeaders));
  };

  const sendRequest = async () => {
    const targetUrl = url.trim();

    if (!targetUrl) {
      setRequestError("Enter a request URL before sending.");
      return;
    }

    try {
      const parsedUrl = new URL(targetUrl);
      if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
        setRequestError("Use an http or https URL.");
        return;
      }
    } catch {
      setRequestError("Enter a valid URL.");
      return;
    }

    setIsLoading(true);
    setRequestError("");

    const startedAt = performance.now();

    try {
      const requestHeaders = new Headers(normalizedHeaders);
      const requestInit: RequestInit = {
        method,
        headers: requestHeaders,
      };

      const response = await fetch(targetUrl, requestInit);
      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      const responseText = await response.text();

      setResponse({
        status: response.status,
        statusText: response.statusText,
        durationMs: Math.round(performance.now() - startedAt),
        headers: responseHeaders,
        body: formatResponseBody(response.headers.get("content-type"), responseText),
      });
    } catch (error) {
      setRequestError(error instanceof Error ? error.message : "Request failed.");
      setResponse(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 180px)",
        px: { xs: 0, md: 1 },
        pb: { xs: 3, md: 5 },
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 980, mx: "auto", pt: { xs: 1, md: 2 } }}>
        <Typography variant="h4" sx={{ fontWeight: 800, fontSize: { xs: "1.75rem", md: "2rem" } }}>
          REST API Tester
        </Typography>

        <Typography sx={{ mt: 2, color: "text.secondary", maxWidth: 760, lineHeight: 1.7, fontSize: { xs: "0.97rem", md: "1.02rem" } }}>
          Send HTTP requests to APIs and inspect responses.
        </Typography>
      </Box>

      <GlassSurface
        sx={{
          width: "100%",
          maxWidth: 980,
          mx: "auto",
          mt: 4,
          p: { xs: 2.4, md: 4 },
          borderRadius: 4,
          background: "rgba(8, 14, 28, 0.82)",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 28px 70px rgba(0, 0, 0, 0.34)",
        }}
      >
        <Box sx={{ display: "grid", gap: 2.2 }}>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "120px 1fr" }, gap: 1 }}>
            <TextField
              select
              value={method}
              onChange={(event) => setMethod(event.target.value)}
              hiddenLabel
              variant="outlined"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  minHeight: 42,
                  borderRadius: 3,
                  bgcolor: "rgba(255,255,255,0.04)",
                  color: "#22c55e",
                  fontWeight: 700,
                  "& fieldset": { borderColor: "rgba(255,255,255,0.06)" },
                  "&:hover fieldset": { borderColor: "rgba(255,255,255,0.12)" },
                  "&.Mui-focused fieldset": { borderColor: "rgba(168, 85, 247, 0.45)" },
                },
              }}
            >
              {methods.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              hiddenLabel
              value={url}
              onChange={(event) => {
                setUrl(event.target.value);
                if (requestError) {
                  setRequestError("");
                }
              }}
              placeholder="https://api.example.com/data"
              variant="outlined"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  minHeight: 42,
                  borderRadius: 3,
                  bgcolor: "rgba(255,255,255,0.04)",
                  color: "text.primary",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.06)" },
                  "&:hover fieldset": { borderColor: "rgba(255,255,255,0.12)" },
                  "&.Mui-focused fieldset": { borderColor: "rgba(168, 85, 247, 0.45)" },
                },
                "& .MuiInputBase-input": {
                  fontWeight: 500,
                  "&::placeholder": {
                    color: "rgba(148, 163, 184, 0.78)",
                    opacity: 1,
                  },
                },
              }}
            />
          </Box>

          <Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, mb: 1.2 }}>
              <Typography variant="caption" sx={{ letterSpacing: 1, color: "#6f87a8" }}>
                HEADERS
              </Typography>

              <Button onClick={addHeaderRow} sx={{ minWidth: 0, px: 1, py: 0.2, color: "#38bdf8" }}>
                <AddRoundedIcon />
              </Button>
            </Box>

            <Box sx={{ display: "grid", gap: 1.2 }}>
              {headers.map((row) => (
                <Box key={row.id} sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr auto" }, gap: 1 }}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    value={row.key}
                    onChange={(event) => updateHeaderRow(row.id, "key", event.target.value)}
                    placeholder="Key"
                    variant="outlined"
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        minHeight: 36,
                        borderRadius: 1.5,
                        bgcolor: "rgba(255,255,255,0.035)",
                        "& fieldset": { borderColor: "rgba(255,255,255,0.05)" },
                      },
                      "& .MuiInputBase-input": {
                        py: 1.05,
                        px: 1.6,
                        fontSize: "0.93rem",
                        "&::placeholder": { color: "rgba(148, 163, 184, 0.72)", opacity: 1 },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    hiddenLabel
                    value={row.value}
                    onChange={(event) => updateHeaderRow(row.id, "value", event.target.value)}
                    placeholder="Value"
                    variant="outlined"
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        minHeight: 36,
                        borderRadius: 1.5,
                        bgcolor: "rgba(255,255,255,0.035)",
                        "& fieldset": { borderColor: "rgba(255,255,255,0.05)" },
                      },
                      "& .MuiInputBase-input": {
                        py: 1.05,
                        px: 1.6,
                        fontSize: "0.93rem",
                        "&::placeholder": { color: "rgba(148, 163, 184, 0.72)", opacity: 1 },
                      },
                    }}
                  />

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button
                      onClick={() => removeHeaderRow(row.id)}
                      sx={{ minWidth: 36, px: 0, color: "#7dd3fc" }}
                      aria-label="Remove header"
                    >
                      <DeleteOutlineRoundedIcon fontSize="small" />
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {requestError && (
            <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.18)" }}>
              <Typography variant="body2" sx={{ color: "#fca5a5" }}>
                {requestError}
              </Typography>
            </Box>
          )}

          <Button
            onClick={sendRequest}
            disabled={isLoading}
            fullWidth
            startIcon={<SendOutlinedIcon />}
            sx={{
              minHeight: 42,
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 700,
              fontSize: "0.98rem",
              color: "#e5e7eb",
              bgcolor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.07)",
                borderColor: "rgba(255,255,255,0.12)",
              },
            }}
          >
            {isLoading ? "Sending..." : "Send Request"}
          </Button>
        </Box>
      </GlassSurface>

      {response && (
        <GlassSurface
          sx={{
            width: "100%",
            maxWidth: 980,
            mx: "auto",
            mt: 3,
            p: { xs: 2.2, md: 3 },
            borderRadius: 4,
            background: "rgba(8, 14, 28, 0.68)",
          }}
        >
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, alignItems: "center", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="subtitle1" fontWeight={700}>
              Response
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {response.status} {response.statusText} • {response.durationMs} ms
            </Typography>
          </Box>

          <Box sx={{ display: "grid", gap: 2 }}>
            <Box>
              <Typography variant="caption" sx={{ display: "block", mb: 1, letterSpacing: 1, color: "#6f87a8" }}>
                BODY
              </Typography>
              <Box
                component="pre"
                sx={{
                  m: 0,
                  p: 2,
                  borderRadius: 3,
                  overflow: "auto",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  bgcolor: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  color: "text.primary",
                  fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace",
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                  minHeight: 140,
                }}
              >
                {response.body || "No response body returned."}
              </Box>
            </Box>

            <Box>
              <Typography variant="caption" sx={{ display: "block", mb: 1, letterSpacing: 1, color: "#6f87a8" }}>
                RESPONSE HEADERS
              </Typography>
              <Box sx={{ display: "grid", gap: 1, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
                {Object.entries(response.headers).length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    No response headers available.
                  </Typography>
                ) : (
                  Object.entries(response.headers).map(([key, value]) => (
                    <Box key={key} sx={{ p: 1.4, borderRadius: 2, bgcolor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <Typography variant="caption" color="text.secondary">
                        {key}
                      </Typography>
                      <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
                        {value}
                      </Typography>
                    </Box>
                  ))
                )}
              </Box>
            </Box>
          </Box>
        </GlassSurface>
      )}
    </Box>
  );
}

export default RestApiPage;
