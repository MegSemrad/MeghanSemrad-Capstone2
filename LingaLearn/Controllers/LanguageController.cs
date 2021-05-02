using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using LingaLearn.Models;
using LingaLearn.Repositories;


namespace LingaLearn.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class LanguageController : ControllerBase
    {
        private readonly ILanguageRepository _languageRepository;
        private readonly IUserRepository _userRepository;

        public LanguageController(ILanguageRepository languageRepository, IUserRepository userRepository)
        {
            _languageRepository = languageRepository;
            _userRepository = userRepository;
        }






        [HttpGet("GetByUser/{userId}")]
        public IActionResult GetByUser(int userId)
        {
            var userLanguages = _languageRepository.GetUserLanguages(userId);
            if (userLanguages == null)
            {
                return NotFound();
            }
            return Ok(userLanguages);
        }





        private User GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }


    }
}