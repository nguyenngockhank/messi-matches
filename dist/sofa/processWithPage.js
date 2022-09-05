"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processWithPage = void 0;
async function processWithPage(options) {
    let shouldFetch = true;
    let index = 0;
    while (shouldFetch) {
        const pageData = await options.fetchPageData(index);
        await options.processPageData(pageData);
        shouldFetch = await options.hasNextPage(pageData);
        index++;
    }
}
exports.processWithPage = processWithPage;
//# sourceMappingURL=processWithPage.js.map