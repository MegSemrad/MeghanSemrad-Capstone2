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


        [HttpGet("GetFlashcardByFlashcardId/{id}")]
        public IActionResult GetFlashcard(int id)
        {
            return Ok(_flashcardRepository.GetFlashcardByFlashcardId(id));
        }



        [HttpPost("Create")]
        public IActionResult Flashcard(Flashcard flashcard)
        {
            _flashcardRepository.Add(flashcard);
            return CreatedAtAction("Get", new { FlashcardCollectionId = flashcard.FlashcardCollectionId }, flashcard);
        }





        [HttpPut("Edit/{FlashcardId}")]
        public IActionResult Put(int FlashcardId, Flashcard flashcard)
        {
            if (FlashcardId != flashcard.Id)
            {
                return BadRequest();
            }
            _flashcardRepository.Update(flashcard);
            return NoContent();
        }







        [HttpDelete("Delete/{flashcardId}")]
        public IActionResult Delete(int flashcardId)
        {
            _flashcardRepository.DeleteSingleFlashcardCollection(flashcardId);
            return NoContent();
        }





        private User GetCurrentUser()
        {
            string FirebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(FirebaseUserId);
        }
    }
}
