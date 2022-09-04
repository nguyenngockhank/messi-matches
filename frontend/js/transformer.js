
const matchAttrTitleMap = {
    left: 'left foot', 
    right: 'right foot', 
    'insideBox': 'inside box',
    'outsideBox': 'outside box',
    'freeKicks': 'free kicks',
    'pensMissed': 'missed pens',
    'started': 'Starting lineup',
    'minsPlayed': 'Minutes played',
    'motm': 'Man of the match',
    'season': 'Season',
    'keyPasses': 'Key passes',
    'bigChancesCreated': 'Big chances created',
}


const quotientOrdinalNumberPostfixMap = {
    '1': 'st',
    '2': 'nd',
    '3': 'rd',
}

function ordinalNumber(number) {
    // https://www.britannica.com/dictionary/eb/qa/How-To-Write-Ordinal-Numbers
    if (number >= 11 && number <= 19) {
        return number + 'th';
    }

    const postfix =  quotientOrdinalNumberPostfixMap[number % 10] || 'th'
    return number + postfix;
}


const aliasTeamNameMap = {
    'Barcelona': 'Barca',
    'Paris Saint-Germain': 'PSG',
    'Manchester City': 'Man City',
}
function teamName(name) {
    return aliasTeamNameMap[name] || name;
}

function isHome(match) {
    return ['H', 'N'].includes(match.homeAway);
}

function homeTitle(match, options) {
    const { year, team, opponent, scoreTeam, scoreOpponent } = match;
    const prefix = _.get(options, 'prefixYear') ? `[${year}] ` : '';
    return `${prefix}${teamName(team)} ${scoreTeam} - ${scoreOpponent} ${teamName(opponent)}`
}

function awayTitle(match, options) {
    const { year, team, opponent, scoreTeam, scoreOpponent } = match;
    const prefix = _.get(options, 'prefixYear') ? `[${year}] ` : '';
    return `${prefix}${teamName(opponent)} ${scoreOpponent} - ${scoreTeam} ${teamName(team)}`
}

function matchTitle(match, options) {
    return isHome(match) ? homeTitle(match, options) : awayTitle(match, options);
}

function isWin(match) {
    const { scoreTeam, scoreOpponent, penScore } = match;
    if (scoreTeam > scoreOpponent) {
        return true;
    }

    if (penScore) {
        const [first, secord] = penScore.split('-');
        return isHome(match) ? first > secord : secord > first;
    }

    return false;
}

function isDraw(match) {
    const { scoreTeam, scoreOpponent, penScore } = match;
    return scoreTeam === scoreOpponent && !penScore;
}


const gaColorMap = {
    "0": 'black',
    "1": "#f2988d",
    "2": "yellow", 
    "3": "lightgreen",
    "4": "lightblue",
    "5": "#7836a8", 
    "6": "violet", 
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
    return `${goals}G️ & ${assists}A`;
}


function goalContributionDetail(match) {
    const { goals, assists, assistsOrder, goalsOrder, xg } = match;


    const lines = [];
    if (goals > 0) {
        const xGPostfix = xg ? `/ xG:${xg}` : '';
        const goalLine = `${_.repeat('⚽', goals)}️ (${goalsOrder.map(o => ordinalNumber(o)).join(', ')}) ${xGPostfix}`;
        lines.push(goalLine)

        const typeFn = (arrTypes) => arrTypes.filter(type => match[type] > 0).map((type) => {
            return `<span class="text-warning">${match[type]} ${matchAttrTitleMap[type] || type}</span>`
        }).join(', ');

        const typeDetail = typeFn(['freeKicks', 'insideBox', 'outsideBox', 'pens'])
        lines.push(typeDetail)
        const bodyDetai = typeFn(['left', 'right', 'head', 'other'])
        lines.push(bodyDetai)
    }

    if (assists > 0) {
        const assistLine = `️${_.repeat('️🅰️️', assists)} (${assistsOrder.map(o => ordinalNumber(o)).join(', ')})`;
        lines.push(assistLine)
    }

    return lines.join('<br />');
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
    'Coupe de France': 'yellow',
}

// https://fullcalendar.io/docs/event-object
function matchToEvent(match) { 
    const { id, goals, assists, competition,  } = match;
    
    let totalGA = assists  + goals;
    if (!competitionColorMap[competition]) {
        console.warn(">>> not found color for competition", competition)
    }

    const date = new Date(id)
    const repeatOptions = matchRepeatOptions(date);

    return {
        id,
        title: matchTitle(match, { prefixYear: true }),
        constraint: competition,
        start: new Date(date).toISOString(),
        // start: new Date(match.date).toISOString(),
        borderColor: competitionColorMap[competition],
        extendedProps: {
            totalGA,
            ...match,
        },
        rrule: repeatOptions,
    }
}


function matchesToEvents() {
    const events = _.flatten(_.map(dateMatchesMap, (matches, date) => {
        const [day, month] = date.split('-')
        return _.map(matches, match => {
            match.id = `${match.year}-${month}-${day}`;
            match.videos = matchVideosMap[match.id];
            match.tweets = matchTweetsMap[match.id];
            return matchToEvent(match)
        })
    }))

    _.reduce(_.orderBy(events, 'id'), (aggregate, event) => {
        const { extendedProps: { totalGA, goals, assists }} = event;
        if (totalGA <= 0) {
            return aggregate;
        }

        if (goals > 0) {
            const nextOrder = aggregate.goalOrder + 1;
            event.extendedProps.goalsOrder = _.range(nextOrder, nextOrder + goals);
            aggregate.goalOrder += goals;
        }

        if (assists > 0) {
            const nextOrder = aggregate.assistOrder + 1;
            event.extendedProps.assistsOrder = _.range(nextOrder, nextOrder + assists);
            aggregate.assistOrder += assists;
        }

        
        return aggregate
    }, {
        goalOrder: 0,
        assistOrder: 0,
    })

    return events;
}


function matchDetailModalTitle(match) {
    const textClass = isWin(match) ? 'text-success' : 
                      isDraw(match) ? 'text-info' : 'text-danger'
    // competition
    return `<div class="${textClass}">
        [${match.competition}] ${matchTitle(match)} (${match.id})</div>`
}


function matchDetailModalBody(match) {
    const lines = [];

    // append goal contribution
    lines.push(goalContributionDetail(match));

    // append video 
    _.map(match.videos, (videoId) => {
        lines.push(`<iframe width="100%" height="315" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
        // lines.push(`<iframe width="100%" src="${videoUrl}" height="300" frameborder="0" allowfullscreen=""></iframe>`);
        lines.push(`<a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">Link video</a>`)
        lines.push('<hr />')
    });

    // append tweets
    _.map(match.tweets, (tweet) => {
        lines.push(tweet)
    });

    // round: F
    // started: 1
    // minsPlayed: 120
    // pensMissed: 0
    // shots: 8
    // shotsOnTarget: 4
    // keyPasses: 2
    // successfulDribbles: 6
    // throughballs: 1
    // aerialDuels: 0
    // motm: 1
    // rating: 10
    // freeKickAttempts: -
    // bigChancesCreated: -
    // xg: 0
    // reboundGkAssist: 1
    // allAssists: 1
    // ftScore: 4-4
    // id: 2015-08-11
    
    const pickAttrs = ['season', 'round', 'minsPlayed', 'keyPasses', 'throughballs', 'bigChancesCreated', 'motm', 'started']

    const bodyContent = pickAttrs
                        .filter(attr => match[attr])
                        .map(attr => `<tr><td><strong>${matchAttrTitleMap[attr] || attr}</strong></td><td>${match[attr]}</td></tr>`)
                        .join('')

    lines.push(`<table class="table"><tbody>${bodyContent}</tbody></table>`)

    // const omitAttrs =  [
    // 'year', 'competition', 'totalGA', 'goals', 'assists', 'team', 'opponent',
    // 'homeAway', 'scoreTeam', 'scoreOpponent', 'tweets', 'videos', 'goalsOrder', 'assistsOrder', 
    // 'hatTricks','freeKicks', 'insideBox', 'outsideBox', 'pens', 
    // 'left', 'right', 'head', 'other'
    // ];
    // _.map(_.omit(match, omitAttrs), (value, prop) => lines.push(`<div><strong>${prop}</strong>: ${value}</div>`));

    return lines.join("\n");


}
