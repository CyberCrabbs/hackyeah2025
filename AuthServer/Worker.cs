using OpenIddict.Abstractions;
using static OpenIddict.Abstractions.OpenIddictConstants;
using System.Globalization;

namespace AuthServer
{
    public class Worker : IHostedService
    {
        private readonly IServiceProvider _serviceProvider;

        public Worker(IServiceProvider serviceProvider)
            => _serviceProvider = serviceProvider;

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using var scope = _serviceProvider.CreateScope();

            await RegisterApplicationsAsync(scope.ServiceProvider);
            await RegisterScopesAsync(scope.ServiceProvider);

            static async Task RegisterApplicationsAsync(IServiceProvider provider)
            {
                var manager = provider.GetRequiredService<IOpenIddictApplicationManager>();

                // API
                if (await manager.FindByClientIdAsync("resource_server_1") == null)
                {
                    var descriptor = new OpenIddictApplicationDescriptor
                    {
                        ClientId = "resource_server_1",
                        ClientSecret = "846B62D0-DEF9-4215-A99D-86E6B8DAB342",
                        Permissions =
                    {
                        Permissions.Endpoints.Introspection
                    }
                    };

                    await manager.CreateAsync(descriptor);
                }

                var tmp2 = await manager.FindByClientIdAsync("aichatcodeflowpkceclient");
                if (tmp2 != null)
                {
                    await manager.DeleteAsync(tmp2);
                    tmp2 = await manager.FindByClientIdAsync("aichatcodeflowpkceclient");
                }

                if (await manager.FindByClientIdAsync("aichatcodeflowpkceclient") is null)
                {
                    var aiChat = new OpenIddictApplicationDescriptor
                    {
                        ClientId = "aichatcodeflowpkceclient",
                        ConsentType = ConsentTypes.Explicit,
                        DisplayName = "aiChat code PKCE",

#if DEBUG
                        RedirectUris =
                        {
                            new Uri("https://localhost:7195/callback/login/local")
                        },
                        PostLogoutRedirectUris =
                        {
                            new Uri("https://localhost:7195/callback/logout/local")
                        },
#else
                        RedirectUris =
                        {
                            new Uri("https://ai-chat-web.metacloud.network/callback/login/local")
                        },
                        PostLogoutRedirectUris =
                        {
                            new Uri("https://ai-chat-web.metacloud.network/callback/logout/local")
                        },
#endif
                        ClientSecret = "codeflow_pkce_client_secret",
                        Permissions =
                        {
                            Permissions.Endpoints.Authorization,
                            Permissions.Endpoints.EndSession,
                            Permissions.Endpoints.Token,
                            Permissions.GrantTypes.AuthorizationCode,
                            Permissions.GrantTypes.RefreshToken,
                            Permissions.ResponseTypes.Code,
                            Permissions.Scopes.Email,
                            Permissions.Scopes.Profile,
                            Permissions.Scopes.Roles,
                            Permissions.Prefixes.Scope + "api1"
                        },
                        Requirements =
                        {
                            Requirements.Features.ProofKeyForCodeExchange
                        }
                    };

                    await manager.CreateAsync(aiChat);
                }
            }


            static async Task RegisterScopesAsync(IServiceProvider provider)
            {
                var manager = provider.GetRequiredService<IOpenIddictScopeManager>();

                if (await manager.FindByNameAsync("api1") is null)
                {
                    await manager.CreateAsync(new OpenIddictScopeDescriptor
                    {
                        DisplayName = "Dantooine API access",
                        DisplayNames =
                    {
                        [CultureInfo.GetCultureInfo("en-US")] = "Access API Demo"
                    },
                        Name = "api1",
                        Resources =
                    {
                        "resource_server_1"
                    }
                    });
                }
            }
        }

        public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;

    }
}
