import Datastore  from "nedb-promises"
import _ from "lodash"


let db = Datastore.create('./storage/messi.db')

db.find({}).sort({ startTimestamp: -1 }).then((events) => {
    const officialEvents = _.filter(events, (event: any) => !event.tournament.name.includes('Club Friendly'));
    console.log(">>> first match", _.minBy(events, 'startTimestamp'))
    console.log(">>> last match", _.maxBy(events, 'startTimestamp'))
    console.log({ officialEvents: officialEvents.length })

    const incidents = incidentsAllTime(officialEvents);
    console.log(" >>> incidents", incidents)
    const incidentsYears = incidentsByYears(officialEvents);
    console.log(" >>> incidentsYears", incidentsYears)
 
})

function mergeIncidentFn(sumAll: any, event: any) {
    const step = _.mergeWith(sumAll, event.incidents, (objValue, srcValue) => {
        return _.sum([objValue, srcValue])
    })
    return step;
}

function incidentsByYears(events) {
    return _(events).groupBy((event: any) => {
        return  new Date(event.startTimestamp * 1000).getUTCFullYear() + "";
    }).mapValues((eventsByYear) => {
        return _.reduce(eventsByYear, mergeIncidentFn, {});
    }).value()
}

function incidentsAllTime(events) {
    return _.reduce(events, mergeIncidentFn, {});
}