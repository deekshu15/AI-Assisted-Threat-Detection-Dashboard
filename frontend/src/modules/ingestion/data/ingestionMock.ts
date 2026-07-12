import { UploadHistoryItem, PipelineService } from "../types/ingestion";

export const uploadHistory: UploadHistoryItem[] = [
  {
    id: 1,
    filename: "windows_logs.csv",
    source: "Windows",
    uploadedAt: "09:15 AM",
    status: "Completed",
  },
  {
    id: 2,
    filename: "firewall_logs.json",
    source: "Firewall",
    uploadedAt: "09:32 AM",
    status: "Processing",
  },
  {
    id: 3,
    filename: "ids_logs.csv",
    source: "IDS",
    uploadedAt: "09:48 AM",
    status: "Completed",
  },
];

export const pipelineServices: PipelineService[] = [
  { name: "API Gateway", status: "Healthy" },
  { name: "Amazon Kinesis", status: "Healthy" },
  { name: "Normalize Lambda", status: "Healthy" },
  { name: "Amazon S3", status: "Healthy" },
];