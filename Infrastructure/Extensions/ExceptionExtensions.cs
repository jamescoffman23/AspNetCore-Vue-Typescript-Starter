using System;
using System.Text;

namespace AspNetCoreVueTypescriptStarter.Infrastructure.Extensions
{
    public static class ExceptionExtensions
    {
        public static string GetaAllMessages(this Exception exception)
        {
            if (exception == null)
                throw new ArgumentNullException(nameof(exception));

            var sb = new StringBuilder();

            while (exception != null)
            {
                if (!string.IsNullOrWhiteSpace(exception.Message))
                {
                    sb.AppendLine(exception.Message.Trim());
                }

                exception = exception.InnerException;
            }

            return sb.ToString();
        }
    }
}