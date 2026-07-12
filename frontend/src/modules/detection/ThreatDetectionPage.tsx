import { Box, Stack } from "@mui/material";

import { PageHeader } from "../../components/ui/page-header";

import ModelStatus from "./components/ModelStatus";

import PredictionSummary from "./components/PredictionSummary";

function ThreatDetectionPage(){

return(

<Box>

<PageHeader

title="AI Threat Detection"

subtitle="Machine Learning Threat Analysis"

 />

<Stack spacing={4}>

<ModelStatus/>

<PredictionSummary/>

</Stack>

</Box>

);

}

export default ThreatDetectionPage;