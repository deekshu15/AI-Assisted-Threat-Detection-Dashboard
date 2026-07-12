import {
List,
ListItem,
ListItemText
} from "@mui/material";

import DashboardWidget from "../../dashboard/components/DashboardWidget";

import { IntelligenceService } from "../services/intelligenceService";

function MitreTechniques(){

const techniques=
IntelligenceService.getTechniques();

return(

<DashboardWidget title="MITRE ATT&CK">

<List>

{

techniques.map(item=>(

<ListItem key={item.id}>

<ListItemText

primary={item.technique}

secondary={item.tactic}

/>

</ListItem>

))

}

</List>

</DashboardWidget>

);

}

export default MitreTechniques;