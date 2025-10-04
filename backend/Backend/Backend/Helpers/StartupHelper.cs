using Backend.Interface;
using Backend.Services;
using Microsoft.OpenApi.Models;
using OpenIddict.Validation.AspNetCore;

namespace Backend.Helpers
{
    internal static class StartupHelper
    {
        internal static void RegisterAuth(IServiceCollection serviceCollection)
        {
            // Register the OpenIddict validation components.
            serviceCollection.AddOpenIddict()
                .AddValidation(options =>
                {
                    // Note: the validation handler uses OpenID Connect discovery
                    // to retrieve the address of the introspection endpoint.
#if DEBUG
                    options.SetIssuer("https://localhost:7261/");
#else
                    options.SetIssuer("https://auth.metacloud.network/");
#endif

                    options.AddAudiences("resource_server_1");

                    // Configure the validation handler to use introspection and register the client
                    // credentials used when communicating with the remote introspection endpoint.
                    options.UseIntrospection()
                           .SetClientId("resource_server_1")
                           .SetClientSecret("846B62D0-DEF9-4215-A99D-86E6B8DAB342");

                    // Register the System.Net.Http integration.
                    options.UseSystemNetHttp();

                    // Register the ASP.NET Core host.
                    options.UseAspNetCore();
                });

            serviceCollection.AddAuthentication(OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme);
            serviceCollection.AddAuthorization();
            serviceCollection.AddHttpContextAccessor();
            //serviceCollection.AddScoped<IUserInfoService, UserInfoService>();

        }

        /// <summary>
        /// Configure Swagger
        /// </summary>
        internal static void RegisterSwagger(IServiceCollection serviceCollection)
        {
            serviceCollection.AddEndpointsApiExplorer();
            serviceCollection.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API v1", Version = "v1" });
                c.SwaggerDoc("v2", new OpenApiInfo { Title = "API v2", Version = "v2" });

                // Add version filtering logic
                c.DocInclusionPredicate((docName, apiDesc) =>
                {
                    var pathSegments = apiDesc.RelativePath?.Split('/');
                    var version = pathSegments?.Length >= 2 ? pathSegments[1] : null;
                    return version?.ToLower() == docName.ToLower();
                });
            });
        }

        internal static void RegisterServices(IServiceCollection serviceCollection)
        {
            serviceCollection.AddScoped<IEventService, MockEventService>();
        }
    }
}