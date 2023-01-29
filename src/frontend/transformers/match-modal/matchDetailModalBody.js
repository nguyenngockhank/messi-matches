import _ from '../../lodash';
import { goalContributionDetail } from './goalContributionDetail'
import { matchAttrTitleMap } from '../../data/static'
import { ordinalNumber } from './ordinalNumber'

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
    const { bigChancesCreated, keyPasses, appOrder } = match;
    
    lines.push(`<div>${ordinalNumber(appOrder)} APP</div>`)
    // append goal contribution
    lines.push(goalContributionDetail(match, { detail: true }));

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
    //   🔭 5/5 accurate long balls
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

    return lines.join("\n");
}