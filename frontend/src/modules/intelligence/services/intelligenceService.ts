import {
latestCVEs,
iocs,
techniques
} from "../data/intelligenceMock";

export const IntelligenceService={

getCVEs:()=>latestCVEs,

getIOCs:()=>iocs,

getTechniques:()=>techniques

};