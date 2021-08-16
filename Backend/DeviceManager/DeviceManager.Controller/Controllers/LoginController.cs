using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DeviceManager.IService;
using System.Linq;
using DeviceManager.ViewModel.ViewModel;
using Data = System.Collections.Generic.KeyValuePair<string, int?>;
using System.Collections.Generic;

namespace DeviceManager.Controller.Controlers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class LoginController : BaseController
    {
        private IConfiguration _config;
        private IStaffService _staffService;

        public LoginController(IConfiguration config, IStaffService staffService)
        {
            _config = config;
            _staffService = staffService;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody] StaffViewModel staffVM)
        {
            IActionResult response = Unauthorized();
            var user = AuthenticateUser(staffVM);
            List<Data> res = new List<Data>();
            if (user != null)
            {
                var tokenString = GenerateJSONWebToken(user);
                res.Add(new Data( tokenString, user.Permission));
                res.ToArray();
                response = Ok(res);
            }

            return Ok(res);
        }

        private string GenerateJSONWebToken(StaffViewModel staffVM)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            Claim[] claims = new[]
            {
                new Claim("Fullname", staffVM.Fullname),
                new Claim("Id", staffVM.Id.ToString())
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddDays(5),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private StaffViewModel AuthenticateUser(StaffViewModel staffVM)
        {
            StaffViewModel user = _staffService.LogIn(staffVM.Username, staffVM.Password);

            if (user != null)
            {
                return user;
            }
            return null;
        }


        [HttpGet]
        [Authorize]
        public IActionResult Get()
        {
            var currentUser = HttpContext.User;

            if (currentUser.HasClaim(c => c.Type == "Id"))
            {
                int id = int.Parse(currentUser.Claims.FirstOrDefault(c => c.Type == "Id").Value);
                StaffViewModel user = _staffService.Get(id);
                return Ok(user);
            }

            return BadRequest("Not found");
        }
    }
}