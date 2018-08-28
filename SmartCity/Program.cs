using System.Net;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace SmartCity
{
    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration(config =>
                {
                    config.AddUserSecrets<Startup>();
                })
                .UseStartup<Startup>()
                .UseKestrel(options => 
                {
                    options.Listen(IPAddress.Loopback, 5000);
                })
                .Build();
    }
}
