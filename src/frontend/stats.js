import Chart from 'chart.js'
import 'chartjs-plugin-labels'

import _ from './lodash';
import { makeGoalByBodyPartData } from "./stats/makeGoalByBodyPartData"
import { makeGoalByPositionData } from './stats/makeGoalByPositionData';
import { 
    makeGoalContributeYearData,
    makeGoalContributeYearIntlData,
    makeGoalContributeSeasonData,
    makeGoalContributeSeasonClubData,
} from './stats/makeGoalContributeData';

function enrichMatch(match, date) {
    const [day, month] = date.split('-')
    match.id = `${match.year}-${month}-${day}`;
    match.totalGA = match.assists + match.goals;
    match.started = match.started > 0;
    match.bench = !match.started;
    return match;
}

const matches = _.flatten(_.map(dateMatchesMap, (matches, date) => {
    return _.map(matches, match => enrichMatch(match, date))
}))

window.matches = matches;
console.log("stored window.matches")

function drawChart(containerId, type, data) {
    // console.log("drawing", containerId, type, data)
    return new Chart(document.getElementById(containerId), {
        type,
        data
    })
}


function drawDoughnutChart(containerId, dataConfig, title) {
    return drawChart(containerId, 'doughnut', {
        labels: dataConfig.map(item => item.label),
        datasets: [{
          label: title,
          data: dataConfig.map(item => item.counter),
          backgroundColor: dataConfig.map(item => item.color),
          hoverOffset: 4
        }]
    })
}


function drawLineChart(containerId, dataConfig) {
    const { labels, datasets } = dataConfig;
    return drawChart(containerId, 'line', {
        labels,
        datasets: datasets.map(item => {
            return {
                ...item,
                fill: false,
                tension: 0.1
            }
        })
    })
}



document.addEventListener('DOMContentLoaded', function() {
    drawLineChart("goalsContributionYearChart", makeGoalContributeYearData(matches))

    drawLineChart("goalsContributionYearIntlChart", makeGoalContributeYearIntlData(matches))

    drawLineChart("goalsContributionSeasonChart", makeGoalContributeSeasonData(matches))
    drawLineChart("goalsContributionSeasonClubChart", makeGoalContributeSeasonClubData(matches))

    drawDoughnutChart("goalsBodyChart", makeGoalByBodyPartData(matches), 'Goals by body part')
    drawDoughnutChart("goalsPositionChart", makeGoalByPositionData(matches), 'Goals from position')
});