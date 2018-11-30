using System.Linq;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json;

namespace AspNetCoreVueTypescriptStarter.Infrastructure.Extensions
{
    public static class ModelStateMethods
    {
        public static string GetErrors(this ModelStateDictionary modelState)
        {
            return JsonConvert.SerializeObject(modelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage));
        }

    }
}