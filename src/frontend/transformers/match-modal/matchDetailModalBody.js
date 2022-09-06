import _ from '../../lodash';
import { goalContributionDetail } from './goalContributionDetail'
import { matchAttrTitleMap } from '../../data/static'

function appendVideos(match) {
    const lines = [];
    _.map(match.videos, (videoId) => {
        lines.push(`<iframe width="100%" height="315" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
        // lines.push(`<iframe width="100%" src="${videoUrl}" height="300" frameborder="0" allowfullscreen=""></iframe>`);
        lines.push(`<a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">Link video</a>`)
        lines.push('<hr />')
    });
    return lines;
}

export function matchDetailModalBody(match) {
    const lines = [];

    // append goal contribution
    lines.push(goalContributionDetail(match));


    const { bigChancesCreated, keyPasses } = match;
    if (bigChancesCreated && _.isNumber(bigChancesCreated)) {
        lines.push(`<div>🎁 ${bigChancesCreated} big chances created</div>`);
    }

    if (bigChancesCreated && _.isNumber(bigChancesCreated)) {
        lines.push(`<div>🔑 ${keyPasses} key passes</div>`);
    }

    // 👌 41 touches
    //   💨 2/2 successful dribbles
    // ⚔️ 6/9 duels won
    // 📈 8.4 SofaScore rating
    // 🧲 2 interceptions
    //     🔭 5/5 accurate long balls
    // 👟 73/88 accurate passes

    const pickAttrs = ['season', 'round', 'minsPlayed', 'throughballs', 'motm', 'started']

    const bodyContent = pickAttrs
                        .filter(attr => match[attr])
                        .map(attr => `<tr><td><strong>${matchAttrTitleMap[attr] || attr}</strong></td><td>${match[attr]}</td></tr>`)
                        .join('')

    lines.push(`<table class="table"><tbody>${bodyContent}</tbody></table>`)


    // append video 
    lines.push(...appendVideos(match));

    // append tweets
    lines.push(...(match.tweets || []));

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
    

    // const omitAttrs =  [
    // 'year', 'competition', 'totalGA', 'goals', 'assists', 'team', 'opponent',
    // 'homeAway', 'scoreTeam', 'scoreOpponent', 'tweets', 'videos', 'goalsOrder', 'assistsOrder', 
    // 'hatTricks','freeKicks', 'insideBox', 'outsideBox', 'pens', 
    // 'left', 'right', 'head', 'other'
    // ];
    // _.map(_.omit(match, omitAttrs), (value, prop) => lines.push(`<div><strong>${prop}</strong>: ${value}</div>`));

    return lines.join("\n");
}