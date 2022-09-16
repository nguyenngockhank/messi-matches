
import { matchesToEvents } from './transformers/matchesToEvents'
import { bootstrapCalendar } from './bootstrap/bootstrapCalendar'
import { renderColorGoalNote } from './bootstrap/renderColorGoalNote'
import { renderMatchSelectOptions, bootstrapSelectListener } from './bootstrap/renderMatchSelectOptions'
import _ from './lodash';

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

bootstrapSelectListener("#lineupSelect", (selectedValue, gaFilter) => {
    const newVal = {
        bench: false,
        started: false,
    }
    if (selectedValue) {
        newVal[selectedValue] = true;
    }
    Object.assign(gaFilter, newVal)
})

bootstrapCalendar(events);
