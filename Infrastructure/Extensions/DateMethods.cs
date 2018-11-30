using System;

namespace AspNetCoreVueTypescriptStarter.Infrastructure.Extensions
{
    public static class DateMethods
    {

        public static bool IsDate(this string date)
        {
            DateTime result;
            return DateTime.TryParse(date, out result);
        }

        public static DateTime LastDayOfMonth(this DateTime date)
        {
            return new DateTime(date.Year, date.Month, 1).AddMonths(1).AddDays(-1);
        }

        /// <summary>
        /// Usage: var day = DateTime.Now.OrdinalSuffix(); Returns 13th
        /// </summary>
        /// <param name="datetime"></param>
        /// <returns></returns>
        public static string OrdinalSuffix(this DateTime datetime)
        {
            var day = datetime.Day;

            if (day % 100 >= 11 && day % 100 <= 13)
                return string.Concat(day, "th");

            switch (day % 10)
            {
                case 1:
                    return string.Concat(day, "st");
                case 2:
                    return string.Concat(day, "nd");
                case 3:
                    return string.Concat(day, "rd");
                default:
                    return string.Concat(day, "th");
            }
        }
    }
}