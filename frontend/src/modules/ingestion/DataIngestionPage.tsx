import PageHeader from "../../components/ui/PageHeader/PageHeader";

import UploadCenter from "./components/UploadCenter";

function DataIngestionPage() {
  return (
    <>
      <PageHeader
        title="Data Ingestion"
        subtitle="Upload, validate, and monitor security logs flowing through the AWS ingestion pipeline."
      />

      <UploadCenter />
    </>
  );
}

export default DataIngestionPage;