using System.DirectoryServices;
using AspNetCoreVueTypescriptStarter.Infrastructure.Services;

namespace AspNetCoreVueTypescriptStarter.Infrastructure.Extensions
{
    public static class AdMethods
    {
        public static string StripDomain(this string username)
        {
            if (username.IsNullOrWhiteSpace()) return string.Empty;

            var id = username.Split('\\');

            return id[1].Trim().ToLower();
        }

        public static object GetPropertyObjectValue(this SearchResult sr, string propertyName)
        {
            object ret = null;

            if (sr.Properties[propertyName].Count > 0)
            {
                ret = sr.Properties[propertyName][0];
            }

            return ret;
        }

        public static string GetPropertyStringValue(this SearchResult sr, string propertyName)
        {
            var ret = string.Empty;

            if (sr.Properties[propertyName].Count > 0)
            {
                ret = sr.Properties[propertyName][0].ToString();
            }

            return ret;
        }

    }
}