declare type ProcessPageOptions<T> = {
    fetchPageData(index: number): Promise<T>;
    hasNextPage(pageData: T): Promise<boolean>;
    processPageData(pageData: T): Promise<void>;
};
export declare function processWithPage<T>(options: ProcessPageOptions<T>): Promise<void>;
export {};
