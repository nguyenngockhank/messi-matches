import _ from "../lodash";


function datesOfMatches(matches) {
    const dateMap = matches.map(match => {
        const [, m, d] = match.slug.split('-'); 
        return `${m}-${d}`;
    }) 
    return _.uniq(dateMap);
}

function datesOfMatchesCount(matches) {
    return datesOfMatches(matches).length;
}

function goalContributionOfDatesInYear(matches) {
    const assistOrGoalMatches = matches.filter(m => m.assists > 0 || m.goals > 0)
    const assistAndGoalMatches = matches.filter(m => m.assists > 0 && m.goals > 0)
    const assistOnlyMatches = matches.filter(m => m.assists > 0 && !m.goals)
    const goalOnlyMatches = matches.filter(m => m.goals > 0 && !m.assists)
    const noGAMatches = matches.filter(m => !m.goals && !m.assists)

    return {
        assistOrGoal: assistOrGoalMatches,
        assistAndGoal: assistAndGoalMatches,
        assistOnly: assistOnlyMatches,
        goalOnly: goalOnlyMatches,
        noGA: noGAMatches,
    }
}

const datesOfYearConfigs = {
    assistOrGoal: { label: 'G/A', color: 'rgb(255, 99, 132)', },
    noGa:  { label: 'No G/A', color:  'rgb(75, 192, 192)',  },
    noApp:  { label: 'N/A', color:  'grey',  },
}

export function makeGoalContributionOfDatesInYear(matches) {
    const summary = goalContributionOfDatesInYear(matches);
    const gaCounter = datesOfMatchesCount(summary.assistOrGoal);
    const allAppDates = datesOfMatchesCount(matches);
    const noAppCounter = 366 - allAppDates;
    const noGACounter =  allAppDates - gaCounter;

    return [
       { ...datesOfYearConfigs.assistOrGoal, counter: gaCounter },
       { ...datesOfYearConfigs.noApp, counter: noAppCounter },
       { ...datesOfYearConfigs.noGa, counter: noGACounter },
    ]
}


const matchGAConfigs = {
    assistOnly: { label: 'Assist(s) Only', color: 'rgb(255, 99, 132)', },
    goalOnly:  { label: 'Goal(s) Only', color: 'rgb(54, 162, 235)', },
    assistAndGoal: { label: 'Assist(s) & Goal(s)', color: 'rgb(255, 205, 86)',  },
    noGA:  { label: 'No G/A', color:  'rgb(75, 192, 192)',  },
}


export function makeGoalContributionOnMatchCounters(matches) {
    const { assistAndGoal, assistOnly, goalOnly, noGA } = goalContributionOfDatesInYear(matches);

    return [
        { ...matchGAConfigs.goalOnly, counter: goalOnly.length },
        { ...matchGAConfigs.assistOnly, counter: assistOnly.length },
        { ...matchGAConfigs.assistAndGoal, counter: assistAndGoal.length },
       { ...matchGAConfigs.noGA, counter: noGA.length },
    ]
}