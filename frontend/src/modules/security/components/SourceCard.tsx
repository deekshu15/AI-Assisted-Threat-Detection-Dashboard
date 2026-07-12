import {
Card,
CardContent,
Typography,
Chip,
Stack
} from "@mui/material";

import { SecuritySource } from "../types/security";

interface Props{

source:SecuritySource;

}

function SourceCard({source}:Props){

return(

<Card>

<CardContent>

<Stack spacing={2}>

<Typography variant="h6">

{source.name}

</Typography>

<Chip

label={source.status}

color="success"

/>

<Typography>

Events

</Typography>

<Typography variant="h5">

{source.events.toLocaleString()}

</Typography>

<Typography>

Latest Threat

</Typography>

<Typography color="error">

{source.latestThreat}

</Typography>

<Typography
variant="caption"
>

{source.lastSync}

</Typography>

</Stack>

</CardContent>

</Card>

);

}

export default SourceCard;