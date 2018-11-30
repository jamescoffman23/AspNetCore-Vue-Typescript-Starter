using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using AspNetCoreVueTypescriptStarter.Infrastructure.Extensions;

namespace AspNetCoreVueTypescriptStarter.Infrastructure.Helpers
{
    public class ApiValidationResultModel
    {
        public string Message { get; }

        public List<ApiValidationError> Errors { get; }

        public ApiValidationResultModel(ModelStateDictionary modelState, string message = "Error Occurred")
        {
            Errors = new List<ApiValidationError>();
            Message = message;
            //Errors = modelState.Keys.SelectMany(key => modelState[key].Errors.Select(x => new ApiValidationError(key, x.ErrorMessage))).ToList();


            foreach (var err in modelState.Where(elem => elem.Value.Errors.Any()))
            {
                Errors.Add(new ApiValidationError(err.Key, err.Value.Errors
                                                                    .Select(e => e.ErrorMessage.IsNullOrWhiteSpace()
                                                                    ? e.Exception.Message : e.ErrorMessage).ToList()));
            }
        }
    }
}