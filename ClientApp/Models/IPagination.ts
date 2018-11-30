export interface IPagination {
    page?:        number,
    rowsPerPage?: number,
    totalItems?:  number,
    sortBy?:      string,
    descending?:  boolean;
}