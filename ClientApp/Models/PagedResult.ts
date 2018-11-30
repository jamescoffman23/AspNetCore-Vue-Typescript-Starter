export class PagedResult {

    records?:      Array<object>;
    totalRecords?: number;
    pageNumber?:   number;
    pageSize?:     number;

    constructor(records: Array<object>, pageNumber: number, pageSize: number) {
        this.records      = records;
        this.totalRecords = records.length;
        this.pageNumber   = pageNumber;
        this.pageSize     = pageSize;
    }
}