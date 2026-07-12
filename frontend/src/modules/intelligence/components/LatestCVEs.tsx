import {
Paper,
Table,
TableBody,
TableCell,
TableContainer,
TableHead,
TableRow,
Chip
} from "@mui/material";

import DashboardWidget from "../../dashboard/components/DashboardWidget";

import { IntelligenceService } from "../services/intelligenceService";

function LatestCVEs(){

const cves=IntelligenceService.getCVEs();

return(

<DashboardWidget title="Latest CVEs">

<TableContainer component={Paper}>

<Table>

<TableHead>

<TableRow>

<TableCell>CVE</TableCell>

<TableCell>Severity</TableCell>

</TableRow>

</TableHead>

<TableBody>

{

cves.map(cve=>(

<TableRow key={cve.id}>

<TableCell>

{cve.cve}

</TableCell>

<TableCell>

<Chip

label={cve.severity}

color={
cve.severity==="Critical"
?"error"
:cve.severity==="High"
?"warning"
:"info"
}

/>

</TableCell>

</TableRow>

))

}

</TableBody>

</Table>

</TableContainer>

</DashboardWidget>

);

}

export default LatestCVEs;