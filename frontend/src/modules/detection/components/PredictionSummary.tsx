import {
Table,
TableBody,
TableCell,
TableHead,
TableRow,
Paper,
TableContainer
} from "@mui/material";

import { DetectionService } from "../services/detectionService";

function PredictionSummary(){

const predictions=

DetectionService.getPredictions();

return(

<TableContainer component={Paper}>

<Table>

<TableHead>

<TableRow>

<TableCell>Model</TableCell>

<TableCell>Attack</TableCell>

<TableCell>Confidence</TableCell>

<TableCell>Risk</TableCell>

</TableRow>

</TableHead>

<TableBody>

{

predictions.map(item=>(

<TableRow key={item.id}>

<TableCell>

{item.model}

</TableCell>

<TableCell>

{item.attackType}

</TableCell>

<TableCell>

{item.confidence}%

</TableCell>

<TableCell>

{item.riskScore}

</TableCell>

</TableRow>

))

}

</TableBody>

</Table>

</TableContainer>

);

}

export default PredictionSummary;