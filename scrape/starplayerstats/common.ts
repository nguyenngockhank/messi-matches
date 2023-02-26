import axios from "axios";
import _ from 'lodash';
import * as cheerio from 'cheerio';
import { setupCache } from 'axios-cache-interceptor';
import { axiosLocalStorage } from "../axiosLocalStorage";
import { readJsonFromFile, writeJson } from "../fileHelpers";
import { MatchDetail } from "./types";

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

export async function fetchAllGoals() {
    const url = `https://messi.starplayerstats.com/en/goals/0/0/all/0/0/0/t/all/all/0/0/1`;
    const response = await axios.get(url, { 
        responseType: 'text',
    });
    return response.data
}

export async function fetchAllAssists() {
    const url = `http://messi.starplayerstats.com/en/assists`;
    const response = await axios.get(url, { 
        responseType: 'text',
    });
    return response.data
}


export const starplayerstatsDist = "dist/data/starplayerstats-messi.json";
export const goalsDist = "dist/data/goals-messi.json";
export const assistsDist = "dist/data/assists-messi.json";


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

export function storeGoals(goals: any) {
    return writeJson(goals, goalsDist)
}

export function storeAssists(goals: any) {
    return writeJson(goals, assistsDist)
}


export type ProcessRowCallback = ($row: cheerio.CheerioAPI) => void;
export function traverseRows($table: cheerio.Cheerio<cheerio.Element>, callback: ProcessRowCallback) {
    $table.find('tbody tr').each((index, el) => {
        const $row = cheerio.load(el);
        callback($row);
    });
}

export function extractRowData($row: cheerio.CheerioAPI, numColumns: number) : string[] {
    const result: string[] = [];
    for(let i = 1; i <= numColumns; ++i) {
        const text = $row(`td:nth-child(${i})`).text().trim();
        result.push(text);
    }
    return result;
}

export function removeDoubleSpace(text: string) {
    return text.replace(/\s+/g, ' ').trim()
}
