import { MatchIncidents, PlayerEvents, Event } from "./types";
import axios from "axios"
import _ from "lodash"


export const eventsDist = 'dist/data/sofa-messi-events.json';
export const incidentDist = 'dist/data/sofa-messi-incidents.json';
export const combinedDist = 'dist/data/sofa-messi.json';


export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchPlayerEvents(playerId: number, index: number) : Promise<PlayerEvents> {
    await sleep(200);
    console.log("fetched ", playerId, index);
    // 12994
    const response = await axios.get(`https://api.sofascore.com/api/v1/player/${playerId}/events/last/${index}`)
    return response.data
}

export async function fetchEventIncidents(eventId: number) : Promise<MatchIncidents> {
    await sleep(100);
    console.log("fetched event Incidents", eventId);
    // 12994
    const response = await axios.get(`https://api.sofascore.com/api/v1/event/${eventId}/incidents`)
    return response.data
}





