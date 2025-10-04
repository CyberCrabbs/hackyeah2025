using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace AuthServer.ViewModels.Auth
{
    public class LoginInput
    {
        public LoginInput()
        {

        }

        public LoginInput(IFormCollection keyValuePairs)
        {
            Microsoft.Extensions.Primitives.StringValues email = keyValuePairs["LoginInput.Email"];
            Email = email.ToString();
            Password = keyValuePairs["LoginInput.Password"].ToString();


            Microsoft.Extensions.Primitives.StringValues rememberMeValues = keyValuePairs["LoginInput.RememberMe"];
            RememberMe = rememberMeValues.Count > 0 && bool.TryParse(rememberMeValues[0], out bool result) && result;
        }

        /// <summary>
        ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
        ///     directly from your code. This API may change or be removed in future releases.
        /// </summary>
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        /// <summary>
        ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
        ///     directly from your code. This API may change or be removed in future releases.
        /// </summary>
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; } = string.Empty;





        /// <summary>
        ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
        ///     directly from your code. This API may change or be removed in future releases.
        /// </summary>
        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }

    }
}
