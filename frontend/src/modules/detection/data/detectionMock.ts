import { Prediction } from "../types/detection";

export const predictions:Prediction[]=[

{

id:1,

model:"Isolation Forest",

attackType:"Brute Force",

confidence:97,

riskScore:91,

mitre:"T1110",

recommendation:"Block source IP immediately."

},

{

id:2,

model:"Random Forest",

attackType:"Privilege Escalation",

confidence:94,

riskScore:88,

mitre:"T1068",

recommendation:"Review administrator accounts."

},

{

id:3,

model:"XGBoost",

attackType:"DDoS",

confidence:99,

riskScore:96,

mitre:"T1498",

recommendation:"Enable rate limiting."

}

];