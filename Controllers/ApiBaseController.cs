using System;
using System.DirectoryServices.AccountManagement;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using AspNetCoreVueTypescriptStarter.Models;

namespace AspNetCoreVueTypescriptStarter.Controllers
{
    [Authorize]
    public class ApiBaseController : Controller
    {
        private readonly ILogger<ApiBaseController> _logger;

        public Guid CurrentUserId { get; private set; }

        public ApiBaseController(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<ApiBaseController>();
        }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var ver = GetType().Assembly.GetName().Version;

            _logger.LogInformation($"Executing: {filterContext.ActionDescriptor.DisplayName ?? "context not found"}");
            _logger.LogInformation($"{filterContext.HttpContext?.User?.Identity?.Name} is accessing the api.");
            _logger.LogInformation($"App Version: {ver.Major}:{ver.Minor}:{ver.Build}:{ver.MinorRevision}");

            if (filterContext.HttpContext?.User?.Identity == null || !filterContext.HttpContext.User.Identity.IsAuthenticated)
            {
                _logger.LogWarning($"filterContext.HttpContext?.User?.Identity was null or {filterContext.HttpContext?.User?.Identity?.Name} was not auth'd: This should never happen!");
            }

            base.OnActionExecuting(filterContext);
        }

        public string StripDomain(string userName)
        {
            var stripped = userName.Split('\\');

            return stripped[1];
        }
    }
}