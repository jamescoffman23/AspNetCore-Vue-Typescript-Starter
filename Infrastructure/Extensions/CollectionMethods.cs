using System.Collections.Generic;
using System.Linq;

namespace AspNetCoreVueTypescriptStarter.Infrastructure.Extensions
{
    public static class CollectionMethods
    {
        public static IEnumerable<T> EmptyIfNull<T>(this IEnumerable<T> source)
        {
            return source ?? Enumerable.Empty<T>();
        }
    }
}