import { isWin } from '../isWin'
import { isDraw } from '../isDraw'
import { matchTitle } from '../matchTitle'

function matchLink(match) {
    return `${siteUrl}/match/${match.slug}`;
}

export function matchDetailModalTitle(match) {
    const textClass = isWin(match) ? 'text-success' : 
                      isDraw(match) ? 'text-info' : 'text-danger'
    // competition
    return `<div >
        <a href="${matchLink(match)}" target="_blank" class="${textClass}">
            [${match.competition}] ${matchTitle(match)} (${match.slug})
        </a>
    </div>`;
}
