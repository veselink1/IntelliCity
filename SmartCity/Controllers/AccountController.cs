using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SmartCity.Models;
using SmartCity.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace SmartCity.Controllers
{
    [Route("api/account")]
    [Authorize]
    public class AccountController : Controller
    {
        private readonly SmartDBManager _db;
        private readonly FacebookClient _fb;

        public AccountController(SmartDBManager db, FacebookClient fb)
        {
            _db = db;
            _fb = fb;
        }

        public class FacebookLoginData
        {
            public string AccessToken { get; set; }
        }

        [HttpGet("status")]
        [AllowAnonymous]
        public IActionResult Status()
        {
            string email = HttpContext.User?.Claims.FirstOrDefault(x => x.Type == "Email")?.Value;
            if (email != null)
            {
                return new JsonResult(new { authenticated = true, email = email });
            }
            else
            {
                return new JsonResult(new { authenticated = false });
            }
        }

        [HttpPost("logout")]
        public async Task<IActionResult> LogOutAsync()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return new JsonResult(new { success = true });
        }

        [HttpPost("facebook/login")]
        [AllowAnonymous]
        public async Task<IActionResult> LogInAsync([FromBody] FacebookLoginData data)
        {
            var account = await _fb.GetAccountAsync(data.AccessToken, "email");
            if (account.ContainsKey("error") || !account.ContainsKey("email"))
            {
                return StatusCode(StatusCodes.Status401Unauthorized);
            }

            string email = (string)account["email"];
            User user = await _db.GetUserAsync(email, registerIfMissing: true);

            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim("Email", email)
            });

            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity));
            return new JsonResult(new { success = true });
        }
    }
}
