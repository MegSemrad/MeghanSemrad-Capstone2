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
    public class FlashcardController : ControllerBase
    {
        private readonly IFlashcardRepository _flashcardRepository;
        private readonly IUserRepository _userRepository;

        public FlashcardController(IFlashcardRepository languageRepository, IUserRepository userRepository)
        {
            _flashcardRepository = languageRepository;
            _userRepository = userRepository;
        }



        [HttpGet("GetFlashcardsByCollection/{FlashcardCollectionId}")]
        public IActionResult Get(int FlashcardCollectionId)
        {
            return Ok(_flashcardRepository.GetFlashcardsFromCollection(FlashcardCollectionId));
        }
      



        private User GetCurrentUser()
        {
            string FirebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(FirebaseUserId);
        }
    }
}
