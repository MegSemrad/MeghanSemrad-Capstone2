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
    public class FlashcardCollectionController : ControllerBase
    {
        private readonly IFlashcardCollectionRepository _flashcardCollectionRepository;
        private readonly IUserRepository _userRepository;

        public FlashcardCollectionController(IFlashcardCollectionRepository languageRepository, IUserRepository userRepository)
        {
            _flashcardCollectionRepository = languageRepository;
            _userRepository = userRepository;
        }

        [HttpGet("GetLanguagesByUser")]
        public IActionResult GetByUser()
        {
            User userObject = GetCurrentUser();
            string FirebaseUserId = userObject.FirebaseUserId;
            var userFlashcardCollections = _flashcardCollectionRepository.GetFlashcardCollectionsByFirebaseUserId(FirebaseUserId);
            if (userFlashcardCollections == null)
            {
                return NotFound();
            }
            return Ok(userFlashcardCollections);
        }

        private User GetCurrentUser()
        {
            string FirebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(FirebaseUserId);
        }

    }
}
