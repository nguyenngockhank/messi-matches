import _ from '../lodash'

export function shouldDisplayMatch(match, filter) {
  
    return _.every(filter, (filterValue, criteria) => {
      if (_.isEmpty(filterValue)) {
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
  