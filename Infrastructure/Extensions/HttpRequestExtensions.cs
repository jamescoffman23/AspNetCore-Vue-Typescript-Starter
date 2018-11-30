using System;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace AspNetCoreVueTypescriptStarter.Infrastructure.Extensions
{
    public static class HttpRequestExtensions
    {

        private const string RequestedWithHeader = "X-Requested-With";
        private const string XmlHttpRequest = "XMLHttpRequest";
        /// <summary>
        /// CHecks Request to see if it is an ajax request
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static bool IsAjaxRequest(this HttpRequest request)
        {
            if (request == null) { throw new ArgumentNullException(nameof(request)); }

            if (request.Headers != null)
            {
                return string.Equals(request.Headers[RequestedWithHeader], XmlHttpRequest, StringComparison.Ordinal) ||
                       string.Equals(request.Headers[RequestedWithHeader], "Fetch", StringComparison.Ordinal) ||
                       string.Equals(request.Query[RequestedWithHeader], XmlHttpRequest, StringComparison.Ordinal);
            }

            return false;
        }

        /// <summary>
        /// Retrieve the raw body as a string from the Request.Body stream
        /// </summary>
        /// <param name="request">Request instance to apply to</param>
        /// <param name="encoding">Optional - Encoding, defaults to UTF8</param>
        /// <returns></returns>
        public static async Task<string> GetRawBodyStringAsync(this HttpRequest request, Encoding encoding = null)
        {
            if (encoding == null)
                encoding = Encoding.UTF8;

            using (StreamReader reader = new StreamReader(request.Body, encoding))
                return await reader.ReadToEndAsync();
        }

        /// <summary>
        /// Retrieves the raw body as a byte array from the Request.Body stream
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static async Task<byte[]> GetRawBodyBytesAsync(this HttpRequest request)
        {
            using (var ms = new MemoryStream(2048))
            {
                await request.Body.CopyToAsync(ms);
                return ms.ToArray();
            }
        }
    }
}
