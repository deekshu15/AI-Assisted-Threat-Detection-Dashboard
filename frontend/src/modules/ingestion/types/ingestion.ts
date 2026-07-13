export type PipelineStatus =
  | "Running"
  | "Idle"
  | "Warning"
  | "Offline";

export interface UploadFile {
  id: number;
  fileName: string;
  size: string;
  uploadedAt: string;
  status: "Completed" | "Processing" | "Failed";
}

export interface PipelineService {
  id: number;
  name: string;
  status: PipelineStatus;
  health: number;
}

export interface StreamMetric {
  timestamp: string;
  events: number;
}