import _ from '../lodash'

export function shouldDisplayMatch(match, filter) {
  
    return _.every(filter, (filterValue, criteria) => {
      console.log(">>> criteria", criteria, filterValue)
      if (_.isEmpty(filterValue) && filterValue !== true) {
        return true;
      }
      const { goals, assists}  = match;
      switch (criteria) {
        case "gaOptions":
          return filterValue.includes(goals) || filterValue.includes(assists);
        default: 
         
          return match[criteria] == filterValue;
      }
    })
  }
  