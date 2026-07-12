import { CVE, IOC, Technique } from "../types/intelligence";

export const latestCVEs:CVE[]=[

{
id:1,
cve:"CVE-2026-12345",
severity:"Critical",
description:"Remote Code Execution"
},

{
id:2,
cve:"CVE-2026-11122",
severity:"High",
description:"Authentication Bypass"
},

{
id:3,
cve:"CVE-2026-17899",
severity:"Medium",
description:"Information Disclosure"
}

];

export const iocs:IOC[]=[

{
id:1,
type:"IP",
value:"192.168.10.44"
},

{
id:2,
type:"Domain",
value:"malicious-example.com"
},

{
id:3,
type:"SHA256",
value:"a83d3b93f97..."
}

];

export const techniques:Technique[]=[

{
id:1,
technique:"T1110",
tactic:"Brute Force"
},

{
id:2,
technique:"T1498",
tactic:"Network DoS"
},

{
id:3,
technique:"T1068",
tactic:"Privilege Escalation"
}

];