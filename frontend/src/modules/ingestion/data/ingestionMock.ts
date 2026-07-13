import {
  PipelineService,
  StreamMetric,
  UploadFile,
} from "../types/ingestion";

export const uploadHistory: UploadFile[] = [
  {
    id: 1,
    fileName: "windows_security.evtx",
    size: "2.4 GB",
    uploadedAt: "09:42 AM",
    status: "Completed",
  },
  {
    id: 2,
    fileName: "firewall_logs.csv",
    size: "980 MB",
    uploadedAt: "10:16 AM",
    status: "Processing",
  },
  {
    id: 3,
    fileName: "linux_syslog.json",
    size: "1.8 GB",
    uploadedAt: "11:02 AM",
    status: "Completed",
  },
];

export const pipelineServices: PipelineService[] = [
  {
    id: 1,
    name: "API Gateway",
    status: "Running",
    health: 100,
  },
  {
    id: 2,
    name: "Amazon Kinesis",
    status: "Running",
    health: 99,
  },
  {
    id: 3,
    name: "AWS Lambda",
    status: "Running",
    health: 98,
  },
  {
    id: 4,
    name: "Amazon S3",
    status: "Running",
    health: 100,
  },
  {
    id: 5,
    name: "AWS Glue",
    status: "Running",
    health: 97,
  },
];

export const streamMetrics: StreamMetric[] = [
  { timestamp: "08:00", events: 800 },
  { timestamp: "09:00", events: 1250 },
  { timestamp: "10:00", events: 2100 },
  { timestamp: "11:00", events: 2750 },
  { timestamp: "12:00", events: 3200 },
  { timestamp: "13:00", events: 2800 },
  { timestamp: "14:00", events: 3500 },
];