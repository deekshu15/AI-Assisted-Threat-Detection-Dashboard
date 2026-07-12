export interface CVE {

    id:number;

    cve:string;

    severity:"Critical"|"High"|"Medium";

    description:string;

}

export interface IOC{

    id:number;

    type:string;

    value:string;

}

export interface Technique{

    id:number;

    technique:string;

    tactic:string;

}