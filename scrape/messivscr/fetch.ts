import axios from "axios"
import _ from "lodash"
import fs from "fs"
import path from "path"


async function fetchEvents() {
    const url = `https://www.messivsronaldo.app/page-data/match-histories/messi-match-history/page-data.json`;
    const response = await axios.get(url);
    return response.data
}

function transformResult(apiResult) {
    const matches = _.get(apiResult, "result.data.allSheetMessiMatchHistory.edges").map(edge => edge.node);
    console.log("> Found match" , matches.length)
    const dateMatchesMap = _.groupBy(matches, "date");

    console.log("> Found match dates" , Object.keys(dateMatchesMap).length)

    return _.mapValues(dateMatchesMap, (dateMatches) => { 


        return _.map(dateMatches, (match) => {
            // trip date value
            const transformedMatch = _.omitBy(_.omit(match, "date"), v => v ===null)
            // to Number
            return _.mapValues(transformedMatch, (attr) => { 
                const numVal = _.toNumber(attr); 
                return _.isNaN(numVal) ? attr : numVal 
            })
        }) 
    })
}


function storeAsJsFile(data, path) {
    fs.writeFileSync(path, `var dateMatchesMap = ${JSON.stringify(data)}`)
}


fetchEvents().then((apiResult) => {
    const data = transformResult(apiResult);
    const storedPath = 'frontend/js/matches.js';
    storeAsJsFile(data, storedPath);
})