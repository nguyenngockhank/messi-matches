import axios from "axios";
import _ from 'lodash';
import { setupCache } from 'axios-cache-interceptor';
import { axiosLocalStorage } from "../axiosLocalStorage";
import { readJsonFromFile, writeJson } from "../fileHelpers";

setupCache(axios, {
    storage: axiosLocalStorage,
    // debug: console.log,
    cacheTakeover: false,
    interpretHeader: false,
    ttl: Number.MAX_SAFE_INTEGER,
    //  
});


export async function fetchAllMatches() {
    const url = `https://messi.starplayerstats.com/en/locations`;
    const response = await axios.get(url, { 
        responseType: 'text',
        cache: {
            ttl: 1000 * 60 * 10 * 24 // 1day. 
        }
    } as any);
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

export function getStoredMatchMap() : Record<string, MatchDetail> {
    const result = readJsonFromFile(starplayerstatsDist, []);
    if(Array.isArray(result)) {
        return _.keyBy(result, "matchslug")
    }
    return result;
}

export function storeMatches(matches: MatchDetail[] | Record<string, MatchDetail>) {
    return writeJson(matches, starplayerstatsDist)
}