export enum TeamEnum {
    Barcelona = "Barcelona",
    PSG = "Paris Saint-Germain",
    Argentina = "Argentina",
}

export interface Match {
    date: string; // 03-02'
    year: number;
    season: string; // 2020-2021
    competition: string; // Copa del Rey
    homeAway: 'H' | 'N' | 'A';
    round: string; // QF
    team: 'Paris Saint-Germain' | 'Barcelona' ; // Barcelona, 'Paris Saint-Germain', 'Argentina'
    opponent: string;
    scoreTeam: number;
    scoreOpponent: number;
    goals: number;
    assists: number;
    started: 0 | 1;
    minsPlayed: number;
    pens: number;
    pensMissed: number;
    hatTricks: number;
    freeKicks: number;
    insideBox: number;
    outsideBox: number;
    left: number;
    right: number;
    head: number;
    other: number;
    shots: number;
    shotsOnTarget: number;
    keyPasses: number;
    successfulDribbles: number;
    throughballs: number;
    aerialDuels: number;
    motm: number;
    rating: number;
    freeKickAttempts: number;
    bigChancesCreated: number;
    xg: number;
    xa: number;
    reboundGkAssist: number;
    reboundPostAssist: number;
    deflectedAssist: number;
    penWonAssist: number;
    ownGoalAssist: number;
    allAssists: number;
    ftScore: string;
    shootout: number;
    h2H: number;
    opponentLeaguePosition: number;
    notes: string;
    penScore?:  string;
}

export interface EnrichedMatch extends Match {
    id: string;
    dateDB: string;
    order: number;
    benched: boolean;
}