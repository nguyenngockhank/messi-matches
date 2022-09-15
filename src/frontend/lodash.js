import first  from 'lodash/first';
import last from 'lodash/last';
import range from 'lodash/range';
import flatten from 'lodash/flatten';
import map from 'lodash/map';
import get from 'lodash/get';
import orderBy from 'lodash/orderBy';
import repeat from 'lodash/repeat';
import reduce from 'lodash/reduce';
import every from 'lodash/every';
import pickBy from 'lodash/pickBy';
import isNumber from 'lodash/isNumber';
import uniq from 'lodash/uniq';
import some from 'lodash/some';
import isEmpty from 'lodash/isEmpty';

export const _ = {
    isEmpty,
    every,
    some,
    uniq,
    first,
    last,
    range,
    map,
    flatten,
    get,
    orderBy,
    repeat,
    reduce,
    pickBy,
    isNumber,
}

export default _;