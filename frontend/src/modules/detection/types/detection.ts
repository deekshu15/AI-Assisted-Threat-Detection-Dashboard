export interface Prediction {

    id:number;

    model:string;

    attackType:string;

    confidence:number;

    riskScore:number;

    mitre:string;

    recommendation:string;

}