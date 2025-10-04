using AuthServer.Data.Models;
using AuthServer.ViewModels.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;

namespace AuthServer.Controllers
{

    public enum UserRoles
    {
        Admin,
        User,
        CloudUser,
        MessengerUser,
        ScheduleUser,

    }


    [AllowAnonymous]
    [Route("Account")]
    public class AccountController : Controller
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserStore<ApplicationUser> _userStore;
        private readonly IUserEmailStore<ApplicationUser> _emailStore;
       // private readonly IEmailSender<ApplicationUser> _emailSender;
        public AccountController(
            UserManager<ApplicationUser> userManager,
            IUserStore<ApplicationUser> userStore,
            SignInManager<ApplicationUser> signInManager//,
           // IEmailSender<ApplicationUser> emailSender
            )
        {
            _userManager = userManager;
            _userStore = userStore;
            _emailStore = GetEmailStore();
            _signInManager = signInManager;
           // _emailSender = emailSender;
        }


        [HttpGet]
        [Route("login")]
        public async Task<IActionResult> login(string returnUrl = null)
        {
            TempData["returnUrl"] = returnUrl;
            var t = new LoginRegisterInput();
            return View("~/Views/Account/Login.cshtml", t);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(string returnUrl = null)
        {
            var loginRegisterInput = new LoginRegisterInput() { IsLogin = true };
            returnUrl ??= TempData["returnUrl"] as string ?? Url.Content("~/");
            LoginInput loginInput = new LoginInput(HttpContext.Request.Form);

            if (TryValidateModel(loginInput))
            {
                var result = await _signInManager.PasswordSignInAsync(loginInput.Email, loginInput.Password, loginInput.RememberMe, lockoutOnFailure: false);

                //_emailClient.SendEmail("igor.vikram@gmail.com", "new login registered", $"user email : {loginInput.Email} logged status : {result.Succeeded}");

                if (result.Succeeded)
                {
                   // _logger.Info("User logged in.");
                    return LocalRedirect(returnUrl);
                }
                if (result.RequiresTwoFactor)
                {
                    return RedirectToPage("./LoginWith2fa", new { ReturnUrl = returnUrl, loginInput.RememberMe });
                }
                if (result.IsLockedOut)
                {
                   // _logger.Info("User account locked out.");
                    return RedirectToPage("./Lockout");
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                    return View("~/Views/Account/Login.cshtml", loginRegisterInput);
                }
            }
            else
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                foreach (var error in errors)
                {
                    ModelState.AddModelError(string.Empty, error);
                }
            }

            return View("~/Views/Account/Login.cshtml", loginRegisterInput);
        }

        [HttpPost("Logout")]
        public async Task<IActionResult> Logout(string returnUrl = null)
        {
            await _signInManager.SignOutAsync();
            //_logger.LogInformation("User logged out.");
            if (returnUrl != null)
            {
                return LocalRedirect(returnUrl);
            }
            else
            {
                // This needs to be a redirect so that the browser performs a new
                // request and the identity for the user gets updated.
                return RedirectToAction("Login", "Account");
            }
        }

        [HttpPost("Register")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(string returnUrl = null)
        {
            try
            {
                //_logger.Info("Register.");

                RegisterInput registerInput = new RegisterInput(HttpContext.Request.Form);

                returnUrl ??= Url.Content("~/");
                if (TryValidateModel(registerInput))
                {
                    var user = CreateUser();

                    await _userStore.SetUserNameAsync(user, registerInput.Email, CancellationToken.None);
                    await _emailStore.SetEmailAsync(user, registerInput.Email, CancellationToken.None);
                    var result = await _userManager.CreateAsync(user, registerInput.Password);

                    if (result.Succeeded)
                    {
                       // _logger.Info("User created a new account with password.");

                        var userId = await _userManager.GetUserIdAsync(user);
                        var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                        code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
                        var callbackUrl = Url.Page(
                            "/Account/ConfirmEmail",
                            pageHandler: null,
                            values: new { area = "Identity", userId, code, returnUrl },
                            protocol: Request.Scheme);



                        //_logger.Info("COnfirmation email to " + registerInput.Email);

                        string emailToken = $"Please confirm your account with this url {callbackUrl}.";
                        //_emailClient.SendConfirmationEmail(registerInput.Email, emailToken);

                        // send dublicated email about user regisration
                       // _emailClient.SendDublicateOfConfirmationEmail("igor.vikram@gmail.com", registerInput.Email, emailToken);

                        //await _emailSender.SendConfirmationLinkAsync(user, ,
                        //    );

                        ModelState.AddModelError(string.Empty, "Confirmation email was sent on your email");


                       // _logger.Info("SeedInitialData to " + registerInput.Email);

                        // Seed initial data 
                        //await _seedInitialDataService.SeedInitialData(Guid.Parse(userId));


                        List<string> userRoles = new(){

                            nameof(UserRoles.User),
                            nameof(UserRoles.CloudUser),
                            nameof(UserRoles.MessengerUser),
                            nameof(UserRoles.ScheduleUser),

                        };

                        //await _userManager.AddToRolesAsync(user, userRoles);


                       // _logger.Info("seed initial data end " + registerInput.Email);

                        if (_userManager.Options.SignIn.RequireConfirmedAccount)
                        {
                            //return RedirectToPage("/Account/RegisterConfirmation", new { area = "Identity", email = registerInput.Email, returnUrl = returnUrl });
                            var ts = new LoginRegisterInput() { IsLogin = false };
                            return View("~/Views/Account/Login.cshtml", ts);

                        }
                        else
                        {
                            await _signInManager.SignInAsync(user, isPersistent: false);
                            return LocalRedirect(returnUrl);
                        }
                    }
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError(string.Empty, error.Description);
                    }
                }
                else
                {
                    var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                    foreach (var error in errors)
                    {
                        ModelState.AddModelError(string.Empty, error);
                    }
                }

                var t = new LoginRegisterInput() { IsLogin = false };

                return View("~/Views/Account/Login.cshtml", t);
            }
            catch (Exception ex)
            {
               // _logger.Error(ex);

                var t = new LoginRegisterInput() { IsLogin = false };

                return View("~/Views/Account/Login.cshtml", t);
            }
        }

        private ApplicationUser CreateUser()
        {
            try
            {
                return Activator.CreateInstance<ApplicationUser>();
            }
            catch
            {
                throw new InvalidOperationException($"Can't create an instance of '{nameof(ApplicationUser)}'. " +
                    $"Ensure that '{nameof(ApplicationUser)}' is not an abstract class and has a parameterless constructor, or alternatively " +
                    $"override the register page in /Areas/Identity/Pages/Account/Register.cshtml");
            }
        }

        private IUserEmailStore<ApplicationUser> GetEmailStore()
        {
            if (!_userManager.SupportsUserEmail)
            {
                throw new NotSupportedException("The default UI requires a user store with email support.");
            }
            return (IUserEmailStore<ApplicationUser>)_userStore;
        }
    }
}

