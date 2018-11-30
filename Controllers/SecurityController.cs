using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using AspNetCoreVueTypescriptStarter.Infrastructure.Extensions;
using AspNetCoreVueTypescriptStarter.Infrastructure.Filters;

namespace AspNetCoreVueTypescriptStarter.Controllers
{
    [LoggingFilter]
    public class SecurityController : BaseController
    {
        private readonly ILogger<SecurityController> _logger;

        public SecurityController(ILoggerFactory loggerFactory,
                                  ILogger<SecurityController> logger,
                                  ApplicationConfig applicationConfig,
                                  IHttpContextAccessor ctxAccessor) : base(loggerFactory, applicationConfig, ctxAccessor)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("SecurityNotice")]
        public IActionResult SecurityNotice()
        {
            _logger.LogInformation("Security Notice Shown ...");

            if (Request.IsAjaxRequest())
            {
                _logger.LogError("Security Notice AJAX ...");
            }

            return View("MustAcknowledge");
        }

        [HttpPost]
        [Route("SecurityNotice")]
        [ValidateAntiForgeryToken]
        public IActionResult SecurityNotice([FromForm]string response)
        {
            _logger.LogInformation("Security Notice Response ...");

            if (response.IsNullOrWhiteSpace() || response.ToLower() != "true")
            {
                _logger.LogError($"Security Notice Response detected an invalid reponse {response} from the page. Some monkey business has been detected.");
                ModelState.AddModelError("Error", "An invalid reponse was detected. Please dont monkey with me. This has been logged and IT alerted.");
            }
            if (ModelState.IsValid)
            {
                _logger.LogInformation("Updating agree cookie ...");
                UpdateIAgreeCookie();


                var url = TempData["returnUrl"].ToStringOrDefault();
                _logger.LogInformation($"returnUrl = {url}");

                if (url == @"/") { url = ""; }

                if (url.IsNotNullOrWhiteSpace()
                  && !url.ToLower().Contains("securitynotice")
                  && !url.ToLower().Contains("error")) //paranoid bout infinite redirects
                {
                    _logger.LogInformation($"Trying to redirect to {url}");
                    return LocalRedirect(url);
                }

                _logger.LogInformation("Redirecting to Default ...");
                return RedirectToAction("Index", "Root"); //todo extract to class
            }

            ViewBag.Error = "An Error Occurred. Perhaps you shouldnt mess with the page";

            return View("MustAcknowledge");
        }

    }
}
