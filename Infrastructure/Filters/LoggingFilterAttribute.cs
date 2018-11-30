using Microsoft.AspNetCore.Mvc.Filters;
using NLog.Fluent;

namespace AspNetCoreVueTypescriptStarter.Infrastructure.Filters
{
    public class LoggingFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            Log.Info().Message("*--------------------------------------------------------------*");
            Log.Info().Message($"Entering {filterContext.ActionDescriptor.DisplayName}");

            base.OnActionExecuting(filterContext);
        }

        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            Log.Info().Message($"Exiting {filterContext.ActionDescriptor.DisplayName}");
            Log.Info().Message("*--------------------------------------------------------------*");

            base.OnActionExecuted(filterContext);
        }
    }
}
