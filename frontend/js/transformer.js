
const aliasTeamNameMap = {
    'Barcelona': 'Barca',
    'Paris Saint-Germain': 'PSG',
    'Manchester City': 'Man City',
}

function teamName(name) {
    return aliasTeamNameMap[name] || name;
}


function homeTitle(match) {
    const { team, opponent, scoreTeam, scoreOpponent } = match;
    return `${teamName(team)} ${scoreTeam} - ${scoreOpponent} ${teamName(opponent)}`
}


function awayTitle(match) {
    const { team, opponent, scoreTeam, scoreOpponent } = match;
    return `${teamName(opponent)} ${scoreOpponent} - ${scoreTeam} ${teamName(team)}`
}


const gaColorMap = {
    "0": 'black',
    "1": "yellow",
    "2": "#ff00ff", // pink
    "3": "red", // pink
    "4": "#dd7e6b",
    "5": "blue", 
    "6": "grey", 
    // "7": "black", 
}


function goalContributrionBackgroundColor(match)  {
    const { goals, assists } = match;

    let totalGA = assists  + goals;
    if (totalGA <= 0) {
        return undefined;
    }
    const goalColor = gaColorMap[goals];
    const assistColor = gaColorMap[assists];


    const delimiter = 1; 
    const delimiterColor = 'black';
    const defaultPercent = 0;

    function calculatePercent(count, totalGA) {
        return count === 0 ? defaultPercent : Math.floor((count / totalGA) * (100 - delimiter));
    }

    const goalPercent = calculatePercent(goals, totalGA);
    const assistPercent = calculatePercent(assists, totalGA);



    // https://stackoverflow.com/questions/45097591/generate-solid-colors-using-css-linear-gradient-not-smooth-colors
    const colorStack = [];
    colorStack.push(`${goalColor} ${goalPercent}%`)
    colorStack.push(`${delimiterColor} ${delimiter}%`)
    colorStack.push(`${delimiterColor} ${delimiter + goalPercent}%`)
    colorStack.push(`${assistColor} ${delimiter + goalPercent}%`)
    colorStack.push(`${assistColor} ${delimiter + goalPercent + assistPercent}%`)

    const bgColor = `linear-gradient(to right, ${colorStack.join(',')})`;
    return bgColor;
}


function goalContributionTitle(match) {
    const { goals, assists } = match;
    return `${goals}G & ${assists}A`
}

// @see: https://fullcalendar.io/docs/rrule-plugin
function matchRepeatOptions(date) {
    const currentDate = new Date();
    const matchDate = new Date(date);

    const yearOffset = currentDate.getFullYear() - matchDate.getFullYear();
    if (yearOffset <= 0) {
        return;
    }


    return {
        freq: 'yearly',
        // interval: yearOffset,
        dtstart: date,
        until: new Date(currentDate.getFullYear(), 11, 31), // last date of YEAR
    }
}


const competitionColorMap = {
    'World Cup Qualifier': 'lightred',
    'World Cup': 'red',
    'Copa America': 'green',
    'La Liga': 'purple',
    'Champions League': 'blue',
    'UEFA Super Cup': `darkblue`,
    'Ligue 1': 'brown',
    'International Friendly': `lightblue`,
    'Copa del Rey': 'silver',
    'Supercopa de Espana': 'orange',
    'Trophée des Champions': 'yellow',
    'Finalissima': 'darkblue',
    'Club World Cup': 'yellow',
}

// https://fullcalendar.io/docs/event-object
function matchToEvent(match, date) {
    const { homeAway, team, goals, allAssists, assists, competition, year } = match;
    const  isHome = homeAway === 'H';

    let totalGA = assists  + goals;
    const title = isHome ? homeTitle(match) : awayTitle(match);

    if (!competitionColorMap[competition]) {
        console.warn(">>> not found color for competition", competition)
    }

    const repeatOptions = matchRepeatOptions(date);

    const preTitle = _.isEmpty(repeatOptions) ? "" : `[${year}] `
    // console.log(repeatOptions)

    return {
        id: date,
        title: `${preTitle}${title}`,
        constraint: competition,
        start: new Date(date).toISOString(),
        // start: new Date(match.date).toISOString(),
        borderColor: competitionColorMap[competition],
        extendedProps: {
            totalGA,
            ...match,
        },
        rrule: repeatOptions,
        // backgroundColor: goalContributrionBackgroundColor(match),
        // backgroundColor: 'pink',
        // description: `${goals}G ${assists}A`,
        // eventContent: (info) => {
        //     console.log("^^", info)
        // }
        // eventName: `[${year}] ${title}`,
        // date: date,
        // dateColor,
        // className: `ga${GA} ${goals > 3 ? 'hattrick': ''}`,
        // onclick: (e) => {
        //     console.log(match)
        //     alert(JSON.stringify(match, null, 2))
        // }
    }
}

function matchesToEventsSameDay() {
    return _.flatten(_.map(dateMatchesMap, (matches, date) => {
        const [day, month] = date.split('-')
        // ${match.year}
        const year = new Date().getFullYear()
        return _.map(matches, match => matchToEvent(match, new Date(`${year}-${month}-${day}`)))
    }))
}


function matchesToEvents() {
    return _.flatten(_.map(dateMatchesMap, (matches, date) => {
        const [day, month] = date.split('-')
        return _.map(matches, match => matchToEvent(match, new Date(`${match.year}-${month}-${day}`)))
    }))
}



// function getTodayMatches() {
//     const currentDate = new Date();
//     const todayKey = currentDate.getDate().toString().padStart(2, '0') 
//                     + '-' 
//                     + (currentDate.getMonth() + 1).toString().padStart(2, '0');
//     const todayMatches = dateMatchesMap[todayKey]
//     return todayMatches || []
// }

// console.log("Today matches:", JSON.stringify(todayMatches))
// var calendar = $("#calendar").calendarGC({
//     // events: _.map(getTodayMatches(), match => matchToEvent(match, new Date()))
//     events: _.flatten(_.map(dateMatchesMap, (matches, date) => {
//         const [day, month] = date.split('-')
//         // ${match.year}
//         const year = new Date().getFullYear()
//         return _.map(matches, match => matchToEvent(match, new Date(`${year}-${month}-${day}`)))
//     }))
// });