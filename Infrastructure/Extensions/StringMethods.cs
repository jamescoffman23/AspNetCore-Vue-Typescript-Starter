using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;

namespace AspNetCoreVueTypescriptStarter.Infrastructure.Extensions
{
    public static class StringMethods
    {

        public static string ToBase64String(this byte[] bytes)
        {
            return bytes == null ? string.Empty : Convert.ToBase64String(bytes);
        }

        public static bool IsEmail(this string email)
        {
            return new EmailAddressAttribute().IsValid(email);
        }
        public static bool IsNumeric(this string value)
        {
            float result;
            return float.TryParse(value, out result);
        }
        public static bool IsGuid(this string value)
        {
            if (string.IsNullOrEmpty(value)) return false;

            Guid newGuid;
            return Guid.TryParse(value, out newGuid) && newGuid != Guid.Empty;
        }
        public static bool IsAlpha(this string value)
        {
            var regex = new Regex(@"[a-zA-Z]");
            return regex.IsMatch(value);
        }
        public static T Parse<T>(this string value)
        {
            // Get default value for type so if string
            // is empty then we can return default value.
            T result = default(T);
            if (!string.IsNullOrEmpty(value))
            {
                // we are not going to handle exception here
                // if you need SafeParse then you should create
                // another method specially for that.
                TypeConverter tc = TypeDescriptor.GetConverter(typeof(T));
                result = (T)tc.ConvertFrom(value);
            }

            return result;
        }

        // Usage: var count = strCount.ToInt();
        public static int ToInt(this string input)
        {
            if (!int.TryParse(input, out var result))
            {
                result = 0;
            }
            return result;
        }

        public static string ToProperCase(this string text)
        {
            System.Globalization.CultureInfo cultureInfo = System.Threading.Thread.CurrentThread.CurrentCulture;
            System.Globalization.TextInfo textInfo = cultureInfo.TextInfo;
            return textInfo.ToTitleCase(text);
        }
        public static bool IsNotNullOrEmpty(this string input)
        {
            return !string.IsNullOrEmpty(input);
        }
        public static bool IsNotNullOrWhiteSpace(this string input)
        {
            return !string.IsNullOrWhiteSpace(input);
        }
        public static bool IsNullOrWhiteSpace(this string input)
        {
            return string.IsNullOrWhiteSpace(input);
        }
        public static string IfNullReturnEmpty(this string input)
        {
            if (string.IsNullOrEmpty(input))
            {
                return string.Empty;
            }

            return input;
        }
        public static string Format(this string format, object arg, params object[] additionalArgs)
        {
            if (additionalArgs == null || additionalArgs.Length == 0)
            {
                return string.Format(CultureInfo.InvariantCulture, format, arg);
            }
            return string.Format(CultureInfo.InvariantCulture, format, new[] { arg }.Concat(additionalArgs).ToArray());
        }
        public static string ToStringOrDefault(this object value)
        {
            return value?.ToString();
        }
        public static string ToDigits(this object value)
        {
            return value == null ? null : new string(value.ToString().Where(char.IsDigit).ToArray());
        }


        public static string Strip(this string s, char character)
        {
            if (s == null) return null;

            s = s.Replace(character.ToString(CultureInfo.InvariantCulture), "");

            return s;
        }
        public static string Strip(this string s, params char[] chars)
        {
            if (s == null) return null;

            foreach (char c in chars)
            {
                s = s.Replace(c.ToString(CultureInfo.InvariantCulture), "");
            }

            return s;
        }
        public static string Strip(this string s, string subString)
        {
            if (s == null) return null;

            s = s.Replace(subString, "");

            return s;
        }

        public static string Reduce(this string s, int count)
        {
            if (s == null) return null;

            return (count > s.Length) ? s : s.Substring(0, count);
        }
        public static string MaskLast(this string s, int minStars = 0)
        {
            if (s == null) return null;

            if (s.Length < 5) return s;

            var len = s.Length;
            var f4 = s.Trim().Substring(0, 4);
            var starLen = len - 4;

            if (minStars > 0) { starLen = minStars; }

            s = string.Concat(f4, new string('*', starLen));

            return s;
        }

        public static string Join<T>(this IEnumerable<T> self, string separator)
        {
            return string.Join(separator, self.Select(e => e.ToString()).ToArray());
        }

        public static string Join(this Array array, string separator)
        {
            return string.Join(separator, array);
        }

        public static int Occurrence(this string instr, string search)
        {
            return Regex.Matches(instr, search).Count;
        }

        //        public static string GetFirstOrMax(this string s, int maxLength)
        //        {
        //            return maxLength == 0 ? null : s?.Substring(0, Math.Min(s.Length, maxLength));
        //        }
    }
}