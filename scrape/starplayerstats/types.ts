
export type MatchDetail = {
    href: string;
    appIndex: number;
    matchslug: string;
    date: string;
    homeTeam: string;
    awayTeam: string;
    goals: number;
    assists: number;
};

export type EnrichedMatchDetail = MatchDetail & {
    location?: string;
    visitors?: number;
    referee?: string;
};


export type Goal = {
    time: string;
    order: number;
    what: string;
    how: string; // body part
    jersey: number;
    competition: string;
    score: string;
    matchId: string;
    matchslug: string;
    result: string;
    homeTeam: string;
    awayTeam: string;
    href: string;
}

export type GoalExtra = { 
    time: string;
    assistedBy: string;
    from: string;
    where: string;
    type: string;
}

export type GoalDetail = Goal & GoalExtra;