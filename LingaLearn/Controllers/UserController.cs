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





        [HttpGet("/getById/{id}")]
        public IActionResult Get(int id)
        {
            var user = _userRepository.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }


        //[HttpGet("{firebaseUserId}")]
        //public IActionResult GetUserProfile(string firebaseUserId)
        //{
        //    return Ok(_userProfileRepository.GetByFirebaseUserId(firebaseUserId));
        //}

        //[HttpPost]
        //public IActionResult Post(UserProfile userProfile)
        //{
        //    userProfile.CreateDateTime = DateTime.Now;
        //    userProfile.UserTypeId = UserType.AUTHOR_ID;
        //    _userProfileRepository.Add(userProfile);
        //    return CreatedAtAction(
        //        nameof(GetUserProfile),
        //        new { firebaseUserId = userProfile.FirebaseUserId },
        //        userProfile);
        //}
    }
}