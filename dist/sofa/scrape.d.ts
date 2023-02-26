import { MatchIncidents, PlayerEvents } from "./types";
export declare const eventsDist = "dist/data/sofa-messi-events.json";
export declare const incidentDist = "dist/data/sofa-messi-incidents.json";
export declare const combinedDist = "dist/data/sofa-messi.json";
export declare function readJsonFromFile<T>(path: string): T;
export declare function writeJson(data: any, path: string): void;
export declare function sleep(ms: any): Promise<unknown>;
export declare function fetchPlayerEvents(playerId: number, index: number): Promise<PlayerEvents>;
export declare function fetchEventIncidents(eventId: number): Promise<MatchIncidents>;
