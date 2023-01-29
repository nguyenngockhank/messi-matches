import axios from "axios"
import _ from "lodash"
import fs from "fs"


async function fetchEvents() {
    const url = `https://www.messivsronaldo.app/page-data/match-histories/messi-match-history/page-data.json`;
    const response = await axios.get(url);
    return response.data
}

function transformForFrontEnd(apiResult) {
    const matches = _.get(apiResult, "result.data.allSheetMessiMatchHistory.edges").map(edge => edge.node);
    console.log("> Found match" , matches.length)
    const dateMatchesMap = _.groupBy(matches, "date");

    console.log("> Found match dates" , Object.keys(dateMatchesMap).length)

    return _.mapValues(dateMatchesMap, (dateMatches) => { 


        return _.map(dateMatches, (match) => {
            // trip date value
            const transformedMatch = _.omitBy(_.omit(match, "date"), v => v ===null)
            // to Number
            const transformedMatch2 = _.mapValues(transformedMatch, (attr) => { 
                const numVal = _.toNumber(attr); 
                return _.isNaN(numVal) ? attr : numVal 
            })

            return _.mapKeys(transformedMatch2, function (v, k) { return k.toLowerCase(); });
        }) 
    })
}

function transformForAnalytics(apiResult) {
    const matches = _.get(apiResult, "result.data.allSheetMessiMatchHistory.edges").map(edge => edge.node);
    return matches.map(match => {
        return _.mapValues(match, (attr) => { 
            const numVal = _.toNumber(attr); 
            return _.isNaN(numVal) ? attr : numVal 
        })
    })
}


fetchEvents().then((apiResult) => {
    const feData = transformForFrontEnd(apiResult);
    const feStoredPath = 'frontend/js/matches.js';
    fs.writeFileSync(feStoredPath, `var dateMatchesMap = ${JSON.stringify(feData)}`)

    const matchesJson = transformForAnalytics(apiResult);
    const analyticStoredPath = 'src/analytics/matches.json';
    fs.writeFileSync(analyticStoredPath, JSON.stringify(matchesJson))
})