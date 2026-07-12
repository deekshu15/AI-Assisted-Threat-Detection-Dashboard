export interface UploadHistoryItem {
  id: number;
  filename: string;
  source: string;
  uploadedAt: string;
  status: "Completed" | "Processing" | "Failed";
}

export interface PipelineService {
  name: string;
  status: "Healthy" | "Offline";
}