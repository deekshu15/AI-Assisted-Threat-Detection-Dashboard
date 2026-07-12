import {
  uploadHistory,
  pipelineServices,
} from "../data/ingestionMock";

export const IngestionService = {
  getUploadHistory: () => uploadHistory,

  getPipelineStatus: () => pipelineServices,
};