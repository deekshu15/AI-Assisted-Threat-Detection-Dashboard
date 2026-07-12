import { Box, Grid } from "@mui/material";

import { PageHeader } from "../../components/ui/page-header";

import LatestCVEs from "./components/LatestCVEs";
import MitreTechniques from "./components/MitreTechniques";

function ThreatIntelligencePage(){

return(

<Box>

<PageHeader

title="Threat Intelligence"

subtitle="External threat feeds and MITRE ATT&CK knowledge base."

/>

<Grid container spacing={3}>

<Grid size={{xs:12,lg:6}}>

<LatestCVEs/>

</Grid>

<Grid size={{xs:12,lg:6}}>

<MitreTechniques/>

</Grid>

</Grid>

</Box>

);

}

export default ThreatIntelligencePage;