export declare function fetchAllMatches(): Promise<any>;
export declare function fetchMatchDetail(matchHref: string): Promise<any>;
export declare type MatchDetail = {
    href: string;
    appIndex: number;
    matchslug: string;
    date: string;
    homeTeam: string;
    awayTeam: string;
    goals: number;
    assists: number;
};
export declare type EnrichedMatchDetail = MatchDetail & {
    location?: string;
    visitors?: number;
    referee?: string;
};
export declare const starplayerstatsDist = "dist/data/starplayerstats-messi.json";
export declare function getStoredMatchMap(): Record<string, MatchDetail>;
export declare function storeMatches(matches: MatchDetail[] | Record<string, MatchDetail>): void;
