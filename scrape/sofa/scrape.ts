import Datastore  from "nedb-promises"
import axios from "axios"
import _ from "lodash"
import { processWithPage } from "./processWithPage"


async function execute() {
    let datastore = Datastore.create('./storage/messi.db')

    await processWithPage<any>({
        fetchPageData(index) {
            console.log("> fetch page index", index)
            return fetchPlayerEvents(12994, index)
        },
        async hasNextPage(pageData) {
            return _.get(pageData, "hasNextPage") || false;
        },
        async processPageData(pageData) {
            const events = _.get(pageData, "events") || [];
            const docs = events.map(e => {
                const key = e.id.toString()
                const incidents = _.get(pageData, `incidentsMap.${key}`)
                const statistics = _.get(pageData, `statisticsMap.${key}.rating`)
                const playedForTeam = _.get(pageData, `playedForTeamMap.${key}`)
                const onBench = _.get(pageData, `onBenchMap.${key}`)
                return {...e, _id: key, incidents, statistics, playedForTeam, onBench }
            })
            await datastore.insert(docs);
        }
    })
}


async function fetchPlayerEvents(playerId: number, index: number) {
    // 12994
    const response = await axios.get(`https://api.sofascore.com/api/v1/player/${playerId}/events/last/${index}`)
    return response.data
}

execute();