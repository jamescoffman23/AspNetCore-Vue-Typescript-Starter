using System;
using System.Collections.Generic;
using System.DirectoryServices.AccountManagement;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using AutoMapper;
using JSNLog;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Server.IISIntegration;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;
using AspNetCoreVueTypescriptStarter.Infrastructure.Services;

namespace AspNetCoreVueTypescriptStarter
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        private readonly ILogger _logger;

        public Startup(IConfiguration configuration,
                       ILoggerFactory loggerFactory)
        {
            Configuration = configuration;
            _logger = loggerFactory.CreateLogger<Startup>();
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var applicationConfig = new ApplicationConfig();
            Configuration.Bind("Application", applicationConfig);
            services.AddSingleton(applicationConfig);

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddTransient<IPrincipal>(provider => provider.GetService<IHttpContextAccessor>().HttpContext.User);
            services.AddAuthentication(IISDefaults.AuthenticationScheme); //win auth

            services.AddMemoryCache();
            services.AddResponseCaching();
            services.AddResponseCompression();
            services.AddAutoMapper();

            services.AddMvc(setup => { setup.ReturnHttpNotAcceptable = true; })
                .AddJsonOptions(options =>
                {
                    //options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                    options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                });

            services.AddAuthorization(options =>
            {
                //TODO add policies
            });

            services.AddAntiforgery(opt => { opt.HeaderName = "X-XSRF-TOKEN"; });

            //***********************//
            //* Database contexts
            //***********************//
            //todo add dbs
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app,
                              IHostingEnvironment env,
                              IApplicationLifetime appLifetime,
                              ILoggerFactory loggerFactory)
        {
            appLifetime.ApplicationStarted.Register(OnStarted);
            appLifetime.ApplicationStopping.Register(OnStopping);
            appLifetime.ApplicationStopped.Register(OnStopped);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    EnvironmentVariables = new Dictionary<string, string>()
                    {
                        { "env", "development" }
                    },
                    HotModuleReplacement = false,
                    ConfigFile = "webpack.dev.config.js"
                });

                app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    EnvironmentVariables = new Dictionary<string, string>()
                    {
                        { "env", "production" }
                    },
                    HotModuleReplacement = false,
                    ConfigFile = "webpack.prod.config.js"
                });

                app.UseExceptionHandler("/Error/Error");
            }

            var hostingEnvironment = app.ApplicationServices.GetService<IHostingEnvironment>();

            _logger.LogInformation("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
            _logger.LogInformation($"ApplicationName: {hostingEnvironment.ApplicationName}");
            _logger.LogInformation($"EnvironmentName: {hostingEnvironment.EnvironmentName}");
            _logger.LogInformation($"WebRootPath:     {hostingEnvironment.WebRootPath}");
            _logger.LogInformation($"ContentRootPath: {hostingEnvironment.ContentRootPath}");
            _logger.LogInformation("***********************************************************");

            var jsnlogConfig = new JsnlogConfiguration
            {
                consoleAppenders = new List<ConsoleAppender> { new ConsoleAppender { name = "consoleAppender" } },
                ajaxAppenders = new List<AjaxAppender> { new AjaxAppender { name = "ajaxAppender", maxBatchSize = 100 } },
                loggers = new List<Logger> { new Logger { appenders = "ajaxAppender;consoleAppender" } }
            };
            app.UseJSNLog(new LoggingAdapter(loggerFactory), jsnlogConfig);

            app.UseStatusCodePagesWithReExecute("/error/{0}");
            //app.UseStaticFiles();
            app.UseStaticFilesWithCache(TimeSpan.FromDays(30));
            app.UseResponseCaching();
            app.UseResponseCompression();
            app.UseAuthentication();


            //InitMapper();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Root}/{action=Index}/{id?}");
            });
        }

        private void OnStarted()
        {
            _logger.LogInformation("-----------------------");
            _logger.LogInformation("Website Rev'ing up");
            _logger.LogInformation("-----------------------");
        }

        private void OnStopping()
        {
            _logger.LogInformation("--------------------------");
            _logger.LogInformation("Website Stopping");
            _logger.LogInformation("--------------------------");
        }

        private void OnStopped()
        {
            _logger.LogInformation("***********************************************************");
            _logger.LogInformation("* Website Stopped");
            _logger.LogInformation("***********************************************************");
        }
    }
}
