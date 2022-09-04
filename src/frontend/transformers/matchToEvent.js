
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
    const { id, goals, assists, competition, } = match;
    
    let totalGA = assists  + goals;
    // if (!competitionColorMap[competition]) {
    //     console.warn(">>> not found color for competition", competition)
    // }

    const date = new Date(id)
    const repeatOptions = matchRepeatOptions(date);

    return {
        id,
        title: matchTitle(match, { prefixYear: true, shortName: true }),
        constraint: competition,
        start: new Date(date).toISOString(),
        // start: new Date(match.date).toISOString(),
        // borderColor: competitionColorMap[competition],
        extendedProps: {
            totalGA,
            ...match,
        },
        rrule: repeatOptions,
    }
}
