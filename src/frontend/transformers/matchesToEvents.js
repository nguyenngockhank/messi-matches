import { matchToEvent } from './matchToEvent'
import { matchTweetsMap } from '../data/matchTweetsMap'
import { matchVideosMap } from '../data/matchVideosMap'

function enrichMatch(match, date) {
    const [day, month] = date.split('-')
    match.id = `${match.year}-${month}-${day}`;
    match.videos = matchVideosMap[match.id];
    match.tweets = matchTweetsMap[match.id];
}

function enrichEvent(event, aggregate) {

    const { extendedProps: { goals, assists }} = event;

    if (goals > 0) {
        const nextOrder = aggregate.goalOrder + 1;
        event.extendedProps.goalsOrder = _.range(nextOrder, nextOrder + goals);
    }

    if (assists > 0) {
        const nextOrder = aggregate.assistOrder + 1;
        event.extendedProps.assistsOrder = _.range(nextOrder, nextOrder + assists);
    }
}

export function matchesToEvents() {
    const events = _.flatten(_.map(dateMatchesMap, (matches, date) => {
        return _.map(matches, match => {
            enrichMatch(match, date);
            return matchToEvent(match)
        })
    }))

    _.reduce(_.orderBy(events, 'id'), (aggregate, event) => {
        const { extendedProps: { totalGA, goals, assists }} = event;
        if (totalGA <= 0) {
            return aggregate;
        }

        enrichEvent(event, aggregate);
        aggregate.goalOrder += goals || 0;
        aggregate.assistOrder += assists || 0;
        return aggregate
    }, {
        goalOrder: 0,
        assistOrder: 0,
    })

    return events;
}
