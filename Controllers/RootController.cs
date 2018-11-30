using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using AspNetCoreVueTypescriptStarter.Infrastructure.Filters;

namespace AspNetCoreVueTypescriptStarter.Controllers
{
    /// <summary>
    /// The root controller is just used to define new page routes. This be one of the few MVC controllers
    /// you will need. 
    /// </summary>
    [LoggingFilter]
    public class RootController : BaseController
    {
        public RootController(ILoggerFactory loggerFactory,
                              ApplicationConfig applicationConfig,
                              IHttpContextAccessor ctxAccessor) : base(loggerFactory, applicationConfig, ctxAccessor)
        {
        }

        /// <summary>
        /// Home is Here
        /// </summary>
        /// <returns></returns>
        [Route("/")]
        //[Route("Dashboard")]
        public IActionResult Index()
        {
            return View();
        }

        // Example new page / route. For new pages create a matching View.cshtml page in the view folder.
        //[Route("Search")]
        //public IActionResult Search()           => View();

    }
}
