
import { matchTitle } from './matchTitle'

// @see: https://fullcalendar.io/docs/rrule-plugin
function matchRepeatOptions(date) {
    const currentDate = new Date();
    const matchDate = new Date(date);

    const yearOffset = currentDate.getFullYear() - matchDate.getFullYear();
    if (yearOffset <= 0) {
        return;
    }

    return {
        freq: 'yearly',
        // interval: yearOffset,
        dtstart: date,
        until: new Date(currentDate.getFullYear(), 11, 31), // last date of YEAR
    }
}

// https://fullcalendar.io/docs/event-object
export function matchToEvent(match) { 
    const { slug, competition, } = match;

    const date = new Date(slug)
    const repeatOptions = matchRepeatOptions(date);

    return {
        id: slug,
        title: matchTitle(match, { prefixYear: true, shortName: true }),
        constraint: competition,
        start: new Date(date).toISOString(),
        allDay: true,
        // borderColor: competitionColorMap[competition],
        extendedProps: match,
        rrule: repeatOptions,
    }
}
