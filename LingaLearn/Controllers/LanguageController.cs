using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using LingaLearn.Models;
using LingaLearn.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace LingaLearn.Controllers
{
    [Authorize]
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





        [HttpPost("Create")]
        public IActionResult Language(Language language)
        {
            var currentUser = GetCurrentUser();
            language.UserId = currentUser.Id;
            _languageRepository.AddLanguage(language);
            return CreatedAtAction("GetByUser", new { userId = language.UserId }, language);
        }





        [HttpPut("Edit/{languageId}")]
        public IActionResult Put(int languageId, Language language)
        {
            if (languageId != language.Id)
            {
                return BadRequest();
            }
            var currentUser = GetCurrentUser();
            language.UserId = currentUser.Id;
            _languageRepository.UpdateLanguage(language);
            return NoContent();
        }





        [HttpDelete("Delete/{languageId}")]
        public IActionResult Delete(int languageId)
        {
            _languageRepository.DeleteLanguage(languageId);
            return NoContent();
        }





        private User GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}