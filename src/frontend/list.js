import _ from './lodash';
import { matchesToEvents } from './transformers/matchesToEvents'
import { renderColorGoalNote } from './bootstrap/renderColorGoalNote'
import { renderMatchSelectOptions, } from './bootstrap/renderMatchSelectOptions'
import { createMatchFilter, getMatchFilter } from './bootstrap/matchFilter'
import { shouldDisplayMatch } from './transformers/shouldDisplayMatch';
import { matchTitle } from './transformers/matchTitle';
import { isWin } from './transformers/isWin';
import { isDraw } from './transformers/isDraw';
import { goalContributionDetail } from './transformers/match-modal/goalContributionDetail';

var events = matchesToEvents();

const competitionList = _.uniq(_.map(events, (item) => item.extendedProps.competition)).sort()
const yearList = _.uniq(_.map(events, (item) => item.extendedProps.year)).sort()
const opponentList = _.uniq(_.map(events, (item) => item.extendedProps.opponent)).sort()
const teamList = _.uniq(_.map(events, (item) => item.extendedProps.team)).sort()

renderColorGoalNote();
renderMatchSelectOptions('#tournamentSelect', competitionList, 'competition')
renderMatchSelectOptions('#opponentSelect', opponentList, 'opponent')
renderMatchSelectOptions('#teamSelect', teamList, 'team')
renderMatchSelectOptions('#yearSelect', yearList, 'year')


function matchHtml(match) {
    const textClass = isWin(match) ? 'text-success' : 
                     isDraw(match) ? 'text-info' : 'text-danger'
    const title = matchTitle(match);
    const gaDetail = goalContributionDetail(match);

    return `<a href="#" class="list-group-item list-group-item-action" aria-current="true">
    <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1 ${textClass}">${title}</h5>
        <small>${match.id}</small>
    </div>
    <p class="mb-1">${gaDetail}</p>
    <small>${match.competition}</small>
  </a>`
}

const renderMatchList = _.debounce(function() {
    const filter = getMatchFilter();
    const filteredMatches = events.filter(event => shouldDisplayMatch(event.extendedProps, filter));
    // console.log(filteredMatches, filter)
    const $container = $('#matchListGroup');
    $container.empty();

    _.sortBy(filteredMatches, "id").reverse().forEach(event => {
        $container.append(matchHtml(event.extendedProps))
    })
}, 100)


createMatchFilter(() => {
    console.log("filter updated")
    renderMatchList()
})

$('#yearSelect').val(_.last(yearList))
$("#yearSelect" ).trigger( "change" );