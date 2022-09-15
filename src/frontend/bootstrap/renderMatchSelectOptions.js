import { getMatchFilter } from './matchFilter';

export function renderMatchSelectOptions(selector, dataSource, filterAttr) {
    dataSource.map((item) => {
        $(selector).append(`<option value="${item}">${item}</span>`);
    })

    $(selector).change(function() {
        const selectedValue = $(this).val();

        const gaFilter = getMatchFilter();
        gaFilter[filterAttr] = selectedValue;
    })
  
}