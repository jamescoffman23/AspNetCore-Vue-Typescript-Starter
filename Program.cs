using System;
using System.IO;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using NLog.Web;

namespace AspNetCoreVueTypescriptStarter
{
    public class Program
    {
        public static IConfiguration Configuration { get; set; }

        public static int Main(string[] args)
        {
            var env = "Development";
#if STAGING
            env = "Staging";
#elif RELEASE
            env = "Production";
#endif

            var rootDir = Directory.GetCurrentDirectory();

            var builder = new ConfigurationBuilder()
                .SetBasePath(rootDir)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env}.json", optional: true, reloadOnChange: true);

            Configuration = builder.Build();

            var appName = Configuration["Application:Name"];
            var envName = Configuration["Application:Environment"] ?? "Unknown";

            var logger = NLogBuilder.ConfigureNLog("nlog.config").GetCurrentClassLogger();
            try
            {
                logger.Info("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
                logger.Info("***********************************************************");
                logger.Info($"* {appName}-{envName} Starting web host");
                logger.Info("***********************************************************");
                BuildWebHost(args).Run();
                return 0;
            }
            catch (Exception ex)
            {
                logger.Fatal("***********************************************************");
                logger.Fatal(ex, $"{appName}-{envName} Host terminated unexpectedly");
                logger.Fatal("***********************************************************");

                throw;
                //return 1;
            }
            finally
            {
                NLog.LogManager.Shutdown();
            }
        }

        public static IWebHost BuildWebHost(string[] args)
        {
            return WebHost.CreateDefaultBuilder(args)
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                .ConfigureLogging(logging =>
                {
                    logging.ClearProviders();
                    logging.SetMinimumLevel(LogLevel.Trace);
                })
                .UseNLog()
                .Build();
        }
    }
}
