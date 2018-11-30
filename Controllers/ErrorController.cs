using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using AspNetCoreVueTypescriptStarter.Infrastructure.Extensions;
using AspNetCoreVueTypescriptStarter.Infrastructure.Filters;
using AspNetCoreVueTypescriptStarter.Infrastructure.Helpers;

namespace AspNetCoreVueTypescriptStarter.Controllers
{
    [LoggingFilter]
    public class ErrorController : BaseController
    {
        private readonly ILogger<ErrorController> _logger;

        public ErrorController(ILoggerFactory loggerFactory,
                               ILogger<ErrorController> logger,
                               ApplicationConfig applicationConfig,
                               IHttpContextAccessor ctxAccessor) : base(loggerFactory, applicationConfig, ctxAccessor)
        {
            _logger = logger;
        }

        [AllowAnonymous]
        [Route("error/{code:int?}")]
        public IActionResult Error(int code = 0)
        {
            _logger.LogError($"Error Controller Hit {code} ...");

            var exFeature = HttpContext.Features.Get<IExceptionHandlerPathFeature>();

            if (exFeature != null)
            {
                var p = exFeature.Path;
                var ex = exFeature.Error;

                _logger.LogError($"Error Controller Hit for {p} ... {ex.GetaAllMessages()}");
                _logger.LogError($" ... {ex.GetaAllMessages()}");
            }


            if (Request.IsAjaxRequest())
            {
                //error from ajax call
                var title = "Unexpected Error Occurred";
                var msg = "Unexpected Error Occurred";

                switch (code)
                {
                    case 403: //forbidden
                        title = "Unauthorized";
                        msg = "You are not authorized to perform this action.";
                        break;
                    case 401: //unauthenticated
                        title = "Unauthenticated";
                        msg = "You are not authenticated. Something went really wrong";
                        break;
                }

                ModelState.AddModelError(code.ToString(), msg);

                var errModel = JsonConvert.SerializeObject(new ApiValidationResultModel(ModelState, title),
                                                           Formatting.Indented,
                                                           new JsonSerializerSettings
                                                           {
                                                               ContractResolver = new CamelCasePropertyNamesContractResolver()
                                                           });
                return StatusCode(code, errModel);
            }

            if (code == 404)
            {
                //saving this ccode here because there is good info in some of the feature things
                //                var feets = HttpContext.Features;
                //
                //                foreach (var f in feets)
                //                {
                //                    Logger.LogError($"{f.Key.Name}");
                //
                //                    if (f.Value != null)
                //                    {
                //                        Logger.LogError($"{f.Value.GetType().FullName}");
                //                        var q = f.Value as Frame;
                //                    }
                //                }

                var req = HttpContext.Features.Get<IHttpRequestFeature>();
                _logger.LogError(req != null
                    ? $"Error - Looking for '{req.RawTarget}' - Page Not Found ..."
                    : "Error - Page Not Found ...");

                return View("NotFound");
            }

            if (code == 401 || code == 403)
            {
                _logger.LogError("Error - Unauth Page Access ... ");

                return View("UnAuthorized");
            }

            return View("Error");
        }
    }
}
