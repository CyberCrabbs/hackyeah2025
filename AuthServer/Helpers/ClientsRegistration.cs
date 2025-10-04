using OpenIddict.Abstractions;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace AuthServer.Helpers
{
    public static class ClientsRegistration
    {
        public static async Task RegisterAiChat(IOpenIddictApplicationManager manager)
        {
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

        public static async Task RegisterCloudDrive(IOpenIddictApplicationManager manager)
        {
            var tmp2 = await manager.FindByClientIdAsync("drivecodeflowpkceclient");
            if (tmp2 != null)
            {
                await manager.DeleteAsync(tmp2);
                tmp2 = await manager.FindByClientIdAsync("drivecodeflowpkceclient");
            }

            if (await manager.FindByClientIdAsync("drivecodeflowpkceclient") is null)
            {
                var aiChat = new OpenIddictApplicationDescriptor
                {
                    ClientId = "drivecodeflowpkceclient",
                    ConsentType = ConsentTypes.Explicit,
                    DisplayName = "drive code PKCE",

#if DEBUG
                    RedirectUris =
                        {
                            new Uri("https://localhost:55764/callback/login/local")
                        },
                    PostLogoutRedirectUris =
                        {
                            new Uri("https://localhost:55764/callback/logout/local")
                        },
#else
                        RedirectUris =
                        {
                            new Uri("https://drive-web.metacloud.network/callback/login/local")
                        },
                        PostLogoutRedirectUris =
                        {
                            new Uri("https://drive-web.metacloud.network/callback/logout/local")
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

        public static async Task RegisterScheduler(IOpenIddictApplicationManager manager)
        {
            var tmp2 = await manager.FindByClientIdAsync("schedulercodeflowpkceclient");
            if (tmp2 != null)
            {
                await manager.DeleteAsync(tmp2);
                tmp2 = await manager.FindByClientIdAsync("schedulercodeflowpkceclient");
            }

            // Blazor Hosted
            if (await manager.FindByClientIdAsync("schedulercodeflowpkceclient") is null)
            {
                var scheduler = new OpenIddictApplicationDescriptor
                {
                    ClientId = "schedulercodeflowpkceclient",
                    ConsentType = ConsentTypes.Explicit,
                    DisplayName = "Blazor code PKCE",

#if DEBUG
                    RedirectUris =
                        {
                            new Uri("https://localhost:7194/callback/login/local")
                        },
                    PostLogoutRedirectUris =
                        {
                            new Uri("https://localhost:7194/callback/logout/local")
                        },
#else
                        RedirectUris =
                        {
                            new Uri("https://scheduler-web.metacloud.network/callback/login/local")
                        },
                        PostLogoutRedirectUris =
                        {
                            new Uri("https://scheduler-web.metacloud.network/callback/logout/local")
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
                await manager.CreateAsync(scheduler);
            }
        }
    }
}