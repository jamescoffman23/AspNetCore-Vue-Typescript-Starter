var PagedResult = (function () {
    function PagedResult(records, pageNumber, pageSize) {
        this.records = records;
        this.totalRecords = records.length;
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
    }
    return PagedResult;
}());
export { PagedResult };
//# sourceMappingURL=PagedResult.js.map