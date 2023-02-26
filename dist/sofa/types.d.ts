export interface PlayerEvents {
    events: Event[];
    hasNextPage: boolean;
    playedForTeamMap: {
        [key: string]: number;
    };
    statisticsMap: {
        [key: string]: StatisticsMap;
    };
    incidentsMap: {
        [key: string]: IncidentsMap;
    };
    onBenchMap: {
        [key: string]: boolean;
    };
}
export interface Event {
    tournament: Tournament;
    roundInfo?: RoundInfo;
    customId: string;
    status: Status;
    winnerCode: number;
    homeTeam: Team;
    awayTeam: Team;
    homeScore: Score;
    awayScore: Score;
    time: Time;
    changes: Changes;
    hasGlobalHighlights: boolean;
    hasXg?: boolean;
    hasEventPlayerStatistics?: boolean;
    hasEventPlayerHeatMap?: boolean;
    detailId?: number;
    id: number;
    startTimestamp: number;
    slug: string;
    finalResultOnly: boolean;
    awayRedCards?: number;
    coverage?: number;
    homeRedCards?: number;
    aggregatedWinnerCode?: number;
    previousLegEventId?: number;
}
export interface Score {
    current?: number;
    display?: number;
    period1?: number;
    period2?: number;
    normaltime?: number;
    extra1?: number;
    extra2?: number;
    overtime?: number;
    penalties?: number;
    aggregated?: number;
}
export interface Team {
    name: string;
    slug: string;
    shortName: string;
    gender: Gender;
    sport: Sport;
    userCount: number;
    nameCode: string;
    disabled?: boolean;
    national: boolean;
    type: number;
    id: number;
    subTeams: any[];
    teamColors: TeamColors;
    ranking?: number;
}
export declare enum Gender {
    M = "M"
}
export interface Sport {
    name: SportName;
    slug: SportSlug;
    id: number;
}
export declare enum SportName {
    Football = "Football"
}
export declare enum SportSlug {
    Football = "football"
}
export interface TeamColors {
    primary: string;
    secondary: string;
    text: string;
}
export interface Changes {
    changes?: Change[];
    changeTimestamp: number;
}
export declare enum Change {
    AwayScoreAggregated = "awayScore.aggregated",
    AwayScoreCurrent = "awayScore.current",
    AwayScoreDisplay = "awayScore.display",
    AwayScoreExtra1 = "awayScore.extra1",
    AwayScoreExtra2 = "awayScore.extra2",
    AwayScoreNormaltime = "awayScore.normaltime",
    AwayScoreOvertime = "awayScore.overtime",
    AwayScorePenalties = "awayScore.penalties",
    AwayScorePeriod2 = "awayScore.period2",
    CardsCode = "cardsCode",
    HomeScoreAggregated = "homeScore.aggregated",
    HomeScoreCurrent = "homeScore.current",
    HomeScoreDisplay = "homeScore.display",
    HomeScoreExtra1 = "homeScore.extra1",
    HomeScoreExtra2 = "homeScore.extra2",
    HomeScoreNormaltime = "homeScore.normaltime",
    HomeScoreOvertime = "homeScore.overtime",
    HomeScorePenalties = "homeScore.penalties",
    HomeScorePeriod2 = "homeScore.period2",
    StatusCode = "status.code",
    StatusDescription = "status.description",
    StatusType = "status.type",
    TimeCurrentPeriodStart = "time.currentPeriodStart",
    TimeInjuryTime1 = "time.injuryTime1",
    TimeInjuryTime2 = "time.injuryTime2",
    TimeInjuryTime3 = "time.injuryTime3",
    TimeInjuryTime4 = "time.injuryTime4"
}
export interface RoundInfo {
    round: number;
    name?: RoundInfoName;
    slug?: string;
    cupRoundType?: number;
}
export declare enum RoundInfoName {
    Final = "Final",
    MatchFor3RDPlace = "Match for 3rd place",
    Quarterfinal = "Quarterfinal",
    Quarterfinals = "Quarterfinals",
    RoundOf16 = "Round of 16",
    Semifinal = "Semifinal",
    Semifinals = "Semifinals",
    The18 = "1/8"
}
export interface Status {
    code: number;
    description: Description;
    type: Type;
}
export declare enum Description {
    Aet = "AET",
    Ap = "AP",
    Canceled = "Canceled",
    Ended = "Ended",
    NotStarted = "Not started",
    Removed = "Removed"
}
export declare enum Type {
    Canceled = "canceled",
    Finished = "finished",
    Notstarted = "notstarted"
}
export interface Time {
    injuryTime1?: number;
    injuryTime2?: number;
    currentPeriodStartTimestamp?: number;
    injuryTime4?: number;
    injuryTime3?: number;
    current?: number;
}
export interface Tournament {
    name: string;
    slug: string;
    category: Category;
    uniqueTournament: UniqueTournament;
    priority: number;
    id: number;
}
export interface Category {
    name: CategoryName;
    slug: Flag;
    sport: Sport;
    id: number;
    flag: Flag;
    alpha2?: Alpha2;
}
export declare enum Alpha2 {
    Es = "ES",
    Fr = "FR"
}
export declare enum Flag {
    Europe = "europe",
    France = "france",
    International = "international",
    SouthAmerica = "south-america",
    Spain = "spain",
    World = "world"
}
export declare enum CategoryName {
    Europe = "Europe",
    France = "France",
    SouthAmerica = "South America",
    Spain = "Spain",
    World = "World"
}
export interface UniqueTournament {
    name: UniqueTournamentName;
    slug: UniqueTournamentSlug;
    category: Category;
    userCount: number;
    id: number;
    hasEventPlayerStatistics: boolean;
    crowdsourcingEnabled: boolean;
    hasPerformanceGraphFeature: boolean;
    displayInverseHomeAwayTeams: boolean;
}
export declare enum UniqueTournamentName {
    CONMEBOLUEFACupOfChampions = "CONMEBOL-UEFA Cup of Champions",
    ClubFriendlyGames = "Club Friendly Games",
    ClubWorldChampionship = "Club World Championship",
    CopaAmérica = "Copa Am\u00E9rica",
    CopaDelRey = "Copa del Rey",
    CoupeDeFrance = "Coupe de France",
    IntFriendlyGames = "Int. Friendly Games",
    InternationalChampionsCup = "International Champions Cup",
    JoanGamperTrophy = "Joan Gamper Trophy",
    LaLiga = "LaLiga",
    Ligue1 = "Ligue 1",
    OlympicGames = "Olympic Games",
    SupercopaDeEspaña = "Supercopa de Espa\u00F1a",
    TrophéeDESChampions = "Troph\u00E9e des Champions",
    UEFAChampionsLeague = "UEFA Champions League",
    UEFASuperCup = "UEFA Super Cup",
    WorldChampionship = "World Championship",
    WorldChampionshipQualCONMEBOL = "World Championship Qual. CONMEBOL"
}
export declare enum UniqueTournamentSlug {
    ClubFriendlyGames = "club-friendly-games",
    ClubWorldChampionship = "club-world-championship",
    ConmebolUefaCupOfChampions = "conmebol-uefa-cup-of-champions",
    CopaAmerica = "copa-america",
    CopaDelRey = "copa-del-rey",
    CoupeDeFrance = "coupe-de-france",
    IntFriendlyGames = "int-friendly-games",
    InternationalChampionsCup = "international-champions-cup",
    JoanGamperTrophy = "joan-gamper-trophy",
    Laliga = "laliga",
    Ligue1 = "ligue-1",
    OlympicGames = "olympic-games",
    SupercopaDeEspana = "supercopa-de-espana",
    TropheeDESChampions = "trophee-des-champions",
    UefaChampionsLeague = "uefa-champions-league",
    UefaSuperCup = "uefa-super-cup",
    WorldChampionship = "world-championship",
    WorldChampionshipQualConmebol = "world-championship-qual-conmebol"
}
export interface IncidentsMap {
    goals?: number;
    assists?: number;
    yellowCards?: number;
    penaltyGoals?: number;
    redCards?: number;
}
export interface StatisticsMap {
    rating: number;
}
export interface MatchIncidents {
    incidents: Incident[];
}
export interface Incident {
    text?: string;
    homeScore?: number;
    awayScore?: number;
    isLive?: boolean;
    time: number;
    addedTime?: number;
    incidentType: string;
    playerIn?: Player;
    playerOut?: Player;
    id?: number;
    isHome?: boolean;
    reversedPeriodTime?: number;
    length?: number;
    player?: Player;
    playerName?: string;
    reason?: string;
    rescinded?: boolean;
    incidentClass?: string;
    injury?: boolean;
    assist1?: Player;
}
export interface Player {
    name: string;
    firstName?: string;
    lastName?: string;
    slug: string;
    shortName: string;
    position: Position;
    userCount: number;
    id: number;
}
export declare enum Position {
    D = "D",
    F = "F",
    M = "M"
}
