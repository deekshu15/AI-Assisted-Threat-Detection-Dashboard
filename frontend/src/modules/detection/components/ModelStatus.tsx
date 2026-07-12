import {
Grid,
Chip,
Card,
CardContent,
Typography
} from "@mui/material";

const models=[

"Isolation Forest",

"Random Forest",

"XGBoost"

];

function ModelStatus(){

return(

<Grid container spacing={2}>

{

models.map(model=>(

<Grid
size={{
xs:12,
md:4
}}
key={model}
>

<Card>

<CardContent>

<Typography
variant="h6"
>

{model}

</Typography>

<Chip

label="Running"

color="success"

sx={{mt:2}}

/>

</CardContent>

</Card>

</Grid>

))

}

</Grid>

);

}

export default ModelStatus;