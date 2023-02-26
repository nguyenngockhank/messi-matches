export interface PlayerData {
    id:                number;
    name:              string;
    origin:            Origin;
    playerProps:       PlayerDataPlayerProp[];
    injuryInformation: null;
    lastLeague:        LastLeague;
    recentMatches:     RecentMatches;
    careerStatistics:  CareerStatistic[];
    careerHistory:     CareerHistory;
    relatedNews:       RelatedNew[];
    QAData:            QADatum[];
    isCoach:           boolean;
    meta:              Meta;
}

export interface QADatum {
    question: string;
    answer:   string;
}

export interface CareerHistory {
    fullCareer: boolean;
    careerData: CareerData;
}

export interface CareerData {
    showFootnote: boolean;
    careerItems:  CareerItems;
}

export interface CareerItems {
    senior:          NationalTeam[];
    "national team": NationalTeam[];
}

export interface NationalTeam {
    participantId:    number;
    teamId:           number;
    team:             string;
    transferType:     null | string;
    startDate:        string;
    endDate:          string;
    role:             null;
    appearances:      null | string;
    goals:            null | string;
    hasUncertainData: boolean;
}

export interface CareerStatistic {
    id:           number;
    name:         string;
    totalMatches: number;
    totalSubIn:   number;
    totalGoals:   number;
    totalAssists: number;
    totalYC:      number;
    totalRC:      number;
    isCup:        boolean;
    seasons:      Season[];
}

export interface Season {
    seasonId: number;
    name:     string;
    matches:  number;
    subIn:    number;
    goals:    number;
    assists:  number;
    yc:       number;
    rc:       number;
    stats:    Stat[];
}

export interface Stat {
    startTS:        number;
    tournamentName: string;
    statsArr:       Array<Array<StatsArrClass | number | string>>;
}

export interface StatsArrClass {
    num:     number;
    bgcolor: string;
}

export interface LastLeague {
    leagueName:  string;
    leagueId:    number;
    playerProps: LastLeaguePlayerProp[];
}

export interface LastLeaguePlayerProp {
    value:        string;
    title:        string;
    ratingProps?: PurpleRatingProps;
}

export interface PurpleRatingProps {
    num:     string;
    bgcolor: PurpleBgcolor;
}

export enum PurpleBgcolor {
    F08022 = "#f08022",
    The0E87E0 = "#0e87e0",
    The1Ec853 = "#1ec853",
}

export interface Meta {
    seopath:      string;
    pageurl:      string;
    faqJSONLD:    FAQJSONLD;
    personJSONLD: PersonJSONLD;
}

export interface FAQJSONLD {
    "@context": string;
    "@type":    string;
    mainEntity: MainEntity[];
}

export interface MainEntity {
    "@type":        string;
    name:           string;
    acceptedAnswer: AcceptedAnswer;
}

export interface AcceptedAnswer {
    "@type": string;
    text:    string;
}

export interface PersonJSONLD {
    "@context":  string;
    "@type":     string;
    name:        string;
    birthDate:   string;
    url:         string;
    nationality: Affiliation;
    affiliation: Affiliation;
    gender:      string;
    height:      string;
    weight:      string;
}

export interface Affiliation {
    "@type": string;
    name:    string;
}

export interface Origin {
    teamId:       number;
    teamName:     string;
    teamColor:    string;
    positionDesc: PositionDesc;
}

export interface PositionDesc {
    positions:           Position[];
    primaryPosition:     string;
    nonPrimaryPositions: string;
}

export interface Position {
    strPos:            string;
    strPosShort:       string;
    occurences:        number;
    position:          string;
    isMainPosition:    boolean;
    pitchPositionData: PitchPositionData;
}

export interface PitchPositionData {
    top:    number;
    right:  number;
    ratio?: number;
}

export interface PlayerDataPlayerProp {
    value:        number | string;
    title:        string;
    icon?:        Icon;
    countryCode?: string;
}

export interface Icon {
    type: string;
    id:   string;
}

export interface RecentMatches {
    "All competitions":                 Competition[];
    "Ligue 1":                          Competition[];
    "Champions League Final Stage":     Competition[];
    "Coupe de France":                  Competition[];
    "Club Friendlies":                  ClubFriendly[];
    "World Cup Final Stage":            Competition[];
    "World Cup Grp. C":                 Competition[];
    Friendlies:                         Competition[];
    "Champions League Grp. H":          Competition[];
    "Super Cup":                        Competition[];
    Finalissima:                        Competition[];
    "World Cup Qualification CONMEBOL": Competition[];
    tabs:                               string[];
    tournamentIds:                      { [key: string]: number };
}

export interface Competition {
    htName:        string;
    atName:        string;
    date:          DateClass;
    versus:        Versus;
    minutesPlayed: number;
    goals:         number;
    assists:       number;
    yellowCards:   number;
    redCards:      number;
    ratingProps:   PurpleRatingProps;
}

export interface DateClass {
    utcTime: string;
}

export interface Versus {
    matchId:           number;
    opponentName:      string;
    opponentId:        number;
    homeTeamScore:     number;
    awayTeamScore:     number;
    highLightHomeTeam: boolean;
}

export interface ClubFriendly {
    htName:        string;
    atName:        string;
    date:          DateClass;
    versus:        Versus;
    minutesPlayed: number;
    goals:         number;
    assists:       number;
    yellowCards:   number;
    redCards:      number;
    ratingProps:   ClubFriendlyRatingProps;
}

export interface ClubFriendlyRatingProps {
    num:     number | string;
    bgcolor: string;
}

export interface RelatedNew {
    imageUrl:      string;
    title:         string;
    sourceStr:     string;
    lead:          string;
    sourceIconUrl: string;
    page:          Page;
}

export interface Page {
    url: string;
}
