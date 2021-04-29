using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using LingaLearn.Models;
using LingaLearn.Repositories;



namespace LingaLearn.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        private readonly IUsersRepository _usersRepository;
        public UsersController(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }





        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_usersRepository.GetByFirebaseUserId(firebaseUserId));
        }





        [HttpPost]
        public IActionResult Post(User user)
        {
            user.CreateDateTime = DateTime.Now;
            _usersRepository.Add(user);
            return CreatedAtAction(
                nameof(GetUser),
                new { firebaseUserId = user.FirebaseUserId },
                user);
        }





        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUser(string firebaseUserId)
        {
            return Ok(_usersRepository.GetByFirebaseUserId(firebaseUserId));
        }





        [HttpPost]
        public IActionResult Post(User user)
        {
            user.CreateDateTime = DateTime.Now;
            _usersRepository.Add(user);
            return CreatedAtAction(
                nameof(GetUser),
                new { firebaseUserId = user.FirebaseUserId },
                user);
        }





        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_usersRepository.GetAllUsers());
        }





        [HttpGet("getById/{id}")]
        public IActionResult Get(int id)
        {
            var user = _usersRepository.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
    }
}