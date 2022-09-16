import { getMatchFilter } from './matchFilter';

export function bootstrapSelectListener(selector, callback) {
    $(selector).change(function() {
        const selectedValue = $(this).val();

        if (callback) {
            const gaFilter = getMatchFilter();
            callback(selectedValue, gaFilter)
        }
    })
}

export function renderMatchSelectOptions(selector, dataSource, filterAttr) {
    dataSource.map((item) => {
        $(selector).append(`<option value="${item}">${item}</span>`);
    })
    bootstrapSelectListener(selector, (selectedValue, gaFilter) => {
        gaFilter[filterAttr] = selectedValue;
    })
}