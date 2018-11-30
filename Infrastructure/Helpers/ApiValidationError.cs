using System.Collections.Generic;
using Newtonsoft.Json;
using AspNetCoreVueTypescriptStarter.Infrastructure.Extensions;

namespace AspNetCoreVueTypescriptStarter.Infrastructure.Helpers
{
    public class ApiValidationError
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Field { get; }

        public List<string> Messages { get; }

        public ApiValidationError(string field, List<string> messages)
        {
            Field = field.IsNotNullOrWhiteSpace() ? field : null;
            Messages = messages;
        }
    }
}