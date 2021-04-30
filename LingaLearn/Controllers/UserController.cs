using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using LingaLearn.Models;
using LingaLearn.Repositories;



namespace LingaLearn.Controllers
{
    // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }





        [HttpGet("/users")]
        public IActionResult Get()
        {
            return Ok(_userRepository.GetAllUsers());
        }
    }
}