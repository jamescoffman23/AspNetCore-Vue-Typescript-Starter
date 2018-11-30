export interface IPagedResult {
    records?:      Array<object>;
    totalRecords?: number;
    pageNumber?:   number;
    pageSize?:     number;
}