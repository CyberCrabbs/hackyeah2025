using Microsoft.AspNetCore.Mvc;

namespace AuthServer.ViewModels.Auth
{
    public class LoginRegisterInput
    {
        public LoginRegisterInput()
        {
            LoginInput = new()
            {
            };

            RegisterInput = new()
            {
            };
        }

        public bool IsLogin { get; set; }

        public LoginInput LoginInput { get; set; } = new();
        public RegisterInput RegisterInput { get; set; } = new();

        /// <summary>
        ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
        ///     directly from your code. This API may change or be removed in future releases.
        /// </summary>
        public string ReturnUrl { get; set; }

        /// <summary>
        ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
        ///     directly from your code. This API may change or be removed in future releases.
        /// </summary>
        [TempData]
        public string ErrorMessage { get; set; }

    }
}
