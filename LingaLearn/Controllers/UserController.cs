using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using LingaLearn.Models;
using LingaLearn.Repositories;



namespace LingaLearn.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }





        [HttpGet("getAllUsers")]
        public IActionResult Get()
        {
            return Ok(_userRepository.GetAllUsers());
        }





        [HttpGet("getById/{id}")]
        public IActionResult Get(int id)
        {
            var user = _userRepository.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }





        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserByFirebaseId(string firebaseUserId)
        {
            return Ok(_userRepository.GetByFirebaseUserId(firebaseUserId));
        }





        [HttpPost]
        public IActionResult Post(User user)
        {
            _userRepository.Add(user);
            return CreatedAtAction(
                nameof(GetUserByFirebaseId),
                new { firebaseUserId = user.FirebaseUserId },
                user);
        }
    }
}