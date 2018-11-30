using System;
using System.Collections.Generic;
using System.DirectoryServices.AccountManagement;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using AspNetCoreVueTypescriptStarter.Infrastructure.Extensions;
using AspNetCoreVueTypescriptStarter.Infrastructure.Services;
using AspNetCoreVueTypescriptStarter.Models;

namespace AspNetCoreVueTypescriptStarter.Controllers
{
    /// <summary>
    /// Global Viewbag properties:
    ///     ViewBag.AppName  = _applicationConfig.Name
    ///     ViewBag.UserInfo = new UserVm
    ///     ViewBag.Version  = GetType().Assembly.GetName().Version;
    /// </summary>
    [Authorize]
    public class BaseController : Controller
    {
        private readonly ILogger<BaseController> _logger;
        private readonly ApplicationConfig _applicationConfig;

        private const string AgreeCookieName = "_puccpagree";

        private const string ClaimTypeAppAccess = "grant_app_access";
        private const string ClaimTypePermission = "app_claim";
        private const string ClaimTypeHistorical = "historical_claim";

        public BaseController(ILoggerFactory loggerFactory,
                              ApplicationConfig applicationConfig,
                              IHttpContextAccessor ctxAccessor)
        {
            var ctx = ctxAccessor.HttpContext;

            _applicationConfig = applicationConfig;

            _logger = loggerFactory.CreateLogger<BaseController>();
        }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            _logger.LogInformation($"Executing: {filterContext.ActionDescriptor.DisplayName ?? "context not found"}");

            //******************************************
            //* viewbag global
            ViewBag.AppName = _applicationConfig.Name;
            //******************************************


            _logger.LogInformation($"{filterContext.HttpContext?.User?.Identity?.Name} is accessing the app.");

            //******************************************
            //* viewbag global
            ViewBag.Version = GetType().Assembly.GetName().Version;
            //******************************************

            _logger.LogInformation($"App Version: {ViewBag.Version.Major}:{ViewBag.Version.Minor}:{ViewBag.Version.Build}:{ViewBag.Version.MinorRevision}");

            //skip cookie check on ajax calls
            if (filterContext.HttpContext != null && !filterContext.HttpContext.Request.IsAjaxRequest())
            {
                //if no cookie then didnt agree so redirect
                var bannerCookie = GetIAgreeCookie();
                if (bannerCookie.IsNullOrWhiteSpace())
                {
                    //var x = Url;
                    var url = $"{filterContext.HttpContext.Request.PathBase}{filterContext.HttpContext.Request.Path}";
                    var cont = filterContext.RouteData.Values["Controller"]?.ToString().ToLower();
                    var act = filterContext.RouteData.Values["Action"]?.ToString().ToLower();

                    _logger.LogInformation($"BASE Controller = {cont} action = {act}");
                    _logger.LogInformation($"BASE Redirect url = {url}");

                    //dont redirect to the same page - doh! infinity loop
                    //                    if (cont != "error" || act != "error")
                    if (act != null && (cont != null && (!cont.Equals("Security", StringComparison.InvariantCultureIgnoreCase) &&
                                                         !act.Equals("SecurityNotice", StringComparison.InvariantCultureIgnoreCase))))
                    {
                        _logger.LogInformation("BASE Redirecting to Security Notice Page.");
                        TempData["returnUrl"] = url;
                        filterContext.Result = RedirectToAction("SecurityNotice", "Security");
                        return;
                    }
                }
                else //if they have a cookie means they agree so reupdate it to keep a moving window. if they are in active for > x mins then cookie will expire and they will have to re-agree
                {
                    UpdateIAgreeCookie();
                }
            }

            base.OnActionExecuting(filterContext);
        }

        public string GetIAgreeCookie()
        {
            return Request.Cookies[AgreeCookieName];
        }
        public void UpdateIAgreeCookie()
        {
            try
            {
                //                var dm = string.Empty;
                //                if (Request.Host.HasValue) { dm = Request.Host.Host; }
                var options = new CookieOptions
                {
                    SameSite = SameSiteMode.Strict,
                    //Domain   = dm, //setting this will make IE, and EDGE not able to create the cookie
                    HttpOnly = true,
                    Expires = DateTime.Now.AddMinutes(_applicationConfig.IAgreeCookieExpire) //todo put this in the config
                };
                Response.Cookies.Append(AgreeCookieName, "true", options);
            }
            catch (Exception e)
            {
                _logger.LogError($"Error creating iagreecookie {e.GetaAllMessages()}");
            }
        }
        public void DeleteCookie(string name)
        {
            Response.Cookies.Delete(name);
        }
    }
}