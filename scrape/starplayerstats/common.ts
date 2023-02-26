import axios from "axios";
import { setupCache } from 'axios-cache-interceptor';
import { sleep } from "../sofa/scrape";
import { axiosLocalStorage } from "../axiosLocalStorage";

setupCache(axios, {
    storage: axiosLocalStorage,
    // debug: console.log,
    cacheTakeover: false,
    interpretHeader: false,
    ttl: 1000 * 60 * 10 // 60 minute.
});


export async function fetchAllMatches() {
    const url = `https://messi.starplayerstats.com/en/locations`;
    const response = await axios.get(url, { 
        responseType: 'text',
    });
    return response.data
}

export async function fetchMatchDetail(matchHref: string) {
    // await sleep(50);
    const url = `https://messi.starplayerstats.com${matchHref}`;
    const response = await axios.get(url, { 
        responseType: 'text',
    });
    return response.data
}

export type MatchDetail = {
    href: string;
    appIndex: number;
    matchslug: string;
    date: string;
    homeTeam: string;
    awayTeam: string;
    goals: number;
    assists: number;
}

export type EnrichedMatchDetail = MatchDetail & {
    location?: string;
    visitors?: number;
    referee?: string;
}

export const starplayerstatsDist = "dist/data/starplayerstats-messi.json";
