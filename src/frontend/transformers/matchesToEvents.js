import _ from '../lodash';
import { matchToEvent } from './matchToEvent'
import { matchTweetsMap } from '../data/matchTweetsMap'
import { matchVideosMap } from '../data/matchVideosMap'


function enrichMatch(match, date) {
    const [day, month] = date.split('-')
    match.id = `${match.year}-${month}-${day}`;
    match.totalGA = match.assists + match.goals;
    match.started = match.started > 0;
    match.bench = !match.started;
    match.videos = matchVideosMap[match.id];
    match.tweets = matchTweetsMap[match.id];
}

function enrichEvent(event, aggregate) {

    const { extendedProps: { goals, assists, competition }} = event;
 
    function makeNewRange(currentIndex, amount) {
        const nextOrder =  currentIndex + 1;
        return _.range(nextOrder, nextOrder + amount);
    }

    event.extendedProps.appOrder = aggregate[competition].appOrder + 1;
    if (goals > 0) {
        event.extendedProps.goalsOrder = makeNewRange(aggregate.goalOrder, goals);
        event.extendedProps.goalsCompOrder = makeNewRange(aggregate[competition].goalOrder, goals);
    }

    if (assists > 0) {
        event.extendedProps.assistsOrder = makeNewRange(aggregate.assistOrder, assists);
        event.extendedProps.assistsCompOrder = makeNewRange(aggregate[competition].assistOrder, assists);
    }
}

export function matchesToEvents() {
    const events =  _.map(allmatches, match => {
        const date = match.date;
        // value to number
        const transformedMatch = _.mapValues(match, (attrVal) => { 
            const numVal = _.toNumber(attrVal); 
            return _.isNaN(numVal) ? attrVal : numVal 
        })

        enrichMatch(transformedMatch, date);
        return matchToEvent(transformedMatch)
    });

    // enrich order of goals / assists / ...
    _.reduce(_.orderBy(events, 'id'), (aggregate, event) => {
        const { extendedProps: { goals, assists, competition }} = event;
        
        if (!aggregate[competition]) {
            aggregate[competition] = {
                goalOrder: 0,
                assistOrder: 0,
                appOrder: 0,
            }
        }

  
        enrichEvent(event, aggregate);

        aggregate.goalOrder += goals || 0;
        aggregate.assistOrder += assists || 0;
        
        aggregate[competition].appOrder++;
        aggregate[competition].goalOrder += goals || 0;
        aggregate[competition].assistOrder += assists || 0;

        return aggregate
    }, {
        goalOrder: 0,
        assistOrder: 0,
    })

    return events;
}
