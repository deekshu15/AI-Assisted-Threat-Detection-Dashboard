import { Box, Grid } from "@mui/material";

import { PageHeader } from "../../components/ui/page-header";

import SourceCard from "./components/SourceCard";

import { SecurityService } from "./services/securityService";

function SecuritySourcesPage(){

const sources=SecurityService.getSources();

return(

<Box>

<PageHeader

title="Security Sources"

subtitle="Monitor every connected security log source."

/>

<Grid container spacing={3}>

{

sources.map(source=>(

<Grid

size={{
xs:12,
sm:6,
lg:4
}}

key={source.id}

>

<SourceCard

source={source}

/>

</Grid>

))

}

</Grid>

</Box>

);

}

export default SecuritySourcesPage;