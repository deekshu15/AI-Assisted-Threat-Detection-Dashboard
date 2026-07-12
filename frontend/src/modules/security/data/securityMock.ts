import { SecuritySource } from "../types/security";

export const securitySources: SecuritySource[] = [

{
id:1,
name:"Windows",
status:"Online",
events:52341,
latestThreat:"Brute Force",
lastSync:"1 min ago"
},

{
id:2,
name:"Linux",
status:"Online",
events:28754,
latestThreat:"Privilege Escalation",
lastSync:"2 min ago"
},

{
id:3,
name:"Firewall",
status:"Online",
events:11873,
latestThreat:"Port Scan",
lastSync:"Just now"
},

{
id:4,
name:"IDS",
status:"Online",
events:17332,
latestThreat:"DDoS",
lastSync:"30 sec ago"
},

{
id:5,
name:"Threat Feed",
status:"Online",
events:543,
latestThreat:"IOC Updated",
lastSync:"5 min ago"
},

{
id:6,
name:"CVE Feed",
status:"Online",
events:102,
latestThreat:"CVE-2026-12345",
lastSync:"10 min ago"
}

];