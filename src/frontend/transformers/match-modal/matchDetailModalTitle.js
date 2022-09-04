import { isWin } from '../isWin'
import { isDraw } from '../isDraw'
import { matchTitle } from '../matchTitle'

export function matchDetailModalTitle(match) {
    const textClass = isWin(match) ? 'text-success' : 
                      isDraw(match) ? 'text-info' : 'text-danger'
    // competition
    return `<div class="${textClass}">
        [${match.competition}] ${matchTitle(match)} (${match.id})</div>`
}
