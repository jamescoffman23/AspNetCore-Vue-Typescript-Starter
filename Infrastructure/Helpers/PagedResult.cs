using System.Collections.Generic;

namespace AspNetCoreVueTypescriptStarter.Infrastructure.Helpers
{
    public class PagedResult<T>
    {
        public IEnumerable<T> Records { get; }
        public int TotalRecords { get; }
        public int PageNumber { get; }
        public int PageSize { get; }

        public PagedResult(IEnumerable<T> items, int totalRecords, int pageNumber, int pageSize)
        {
            TotalRecords = totalRecords;
            PageNumber = pageNumber;
            PageSize = pageSize;
            Records = items;
        }
    }
}
