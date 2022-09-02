type ProcessPageOptions<T> = {
    fetchPageData(index: number): Promise<T>;
    hasNextPage(pageData: T): Promise<boolean>;
    processPageData(pageData: T): Promise<void>;
}

export async function processWithPage<T>(options: ProcessPageOptions<T>) {
    let shouldFetch = true
    let index = 0 
    while(shouldFetch) {
        const pageData = await options.fetchPageData(index)
        await options.processPageData(pageData);
        shouldFetch = await options.hasNextPage(pageData)
        index++
    }
}