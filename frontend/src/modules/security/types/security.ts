export interface SecuritySource {

    id:number;

    name:string;

    status:"Online" | "Offline";

    events:number;

    latestThreat:string;

    lastSync:string;

}