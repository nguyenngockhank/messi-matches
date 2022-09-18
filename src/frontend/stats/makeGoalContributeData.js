import _ from "../lodash"

const configItems = {
    goals: { label: 'Goals', borderColor: 'rgb(255, 99, 132)', },
    assists:  { label: 'Assists', borderColor: 'rgb(54, 162, 235)', },
    successfulDribbles: { label: "Dribbles", borderColor: 'rgb(255, 205, 86)', hidden: true, },
    // playmakings
    keyPasses: { label: "Key passes", borderColor: '#2994cf', hidden: true, },
    throughballs: { label: "Throughballs", borderColor: 'rgb(75, 192, 192)', hidden: true, },
    bigChancesCreated: { label: "B/Chances Created", borderColor: 'grey', hidden: true, },
    // goals
    freeKicks: { label: "Freekicks", borderColor: 'black', hidden: true, },
    outsideBox: { label: "Outside the box (open play)", borderColor: '#881bb1', hidden: true, },
    insideBox: { label: "Inside the box", borderColor: '#fa9b00', hidden: true, },
    // body parts
    pens: { label: "Penaties", borderColor: '#fefe30', hidden: true, },
    head: { label: "Header", borderColor: '#3a12a6', hidden: true, },
    right: { label: 'Right foot', borderColor: '#2045fe', hidden: true, },
    left: { label: 'Left foot', borderColor: '#66b22f',  hidden: true, },
}

function isIntl(match) {
    return match.team === "Argentina"
}

function createStatItem () {
    return _.mapValues(configItems, () => {
        return 0;
    })
}

function makeGoalContributeData(matches, keyFromMatchFn) {
    const summary = matches.reduce((result, match) => {
        const key = keyFromMatchFn(match);

        if (!key) {
            return result;
        }

        if (!result[key]) {
            result[key] = createStatItem();
        }

        result[key] = _.mapValues(result[key], (v, k) => {
            const increasement = Number(match[k]) || 0;
            return v + increasement;
        })

        return result;
    }, {})

    const sortedKeys = Object.keys(summary).sort();

    return {
        labels: sortedKeys.map(l => l.toString()),
        datasets: Object.keys(configItems).map(attr => {
            return {
                ...configItems[attr],
                data: sortedKeys.map(key => summary[key][attr]),
            }
        })
        
        // [
        //     {
        //         ...configs.goals,
        //         data: sortedKeys.map(key => summary[key].goals),
        //     },
        //     {
        //         ...configs.assists,
        //         data: sortedKeys.map(key => summary[key].assists),
        //     },
        //     {
        //         ...configs.successfulDribbles,
        //         data: sortedKeys.map(key => summary[key].successfulDribbles),
        //     }
        // ]
    }
}

// @see: https://www.chartjs.org/docs/latest/charts/line.html
export function makeGoalContributeYearData(matches) {
    return makeGoalContributeData(matches, (match) => {
        return match.year;
    })
}

export function makeGoalContributeYearIntlData(matches) {
    return makeGoalContributeData(matches, (match) => {
        return isIntl(match) && match.year;
    })
}

export function makeGoalContributeSeasonData(matches) {
    return makeGoalContributeData(matches, (match) => {
        return match.season;
    })
}

export function makeGoalContributeSeasonClubData(matches) {
    return makeGoalContributeData(matches, (match) => {
        return !isIntl(match) && match.season;
    })
}