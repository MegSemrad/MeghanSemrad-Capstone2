﻿using Microsoft.AspNetCore.Mvc;
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





        [HttpGet("GetFlashcardCollectionsByUser")]
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






        [HttpPost("Create")]
        public IActionResult FlashcardCollection(FlashcardCollection flashcardCollection)
        {
            var currentUser = GetCurrentUser();
            flashcardCollection.UserId = currentUser.Id;
            _flashcardCollectionRepository.Add(flashcardCollection);
            return CreatedAtAction("GetByUser", new { userId = flashcardCollection.UserId }, flashcardCollection);
        }





        [HttpDelete("Delete/{FlashcardCollectionId}")]
        public IActionResult Delete(int FlashcardCollectionId)
        {
            _flashcardCollectionRepository.DeleteEntireCollection(FlashcardCollectionId);
            return NoContent();
        }





        private User GetCurrentUser()
        {
            string FirebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(FirebaseUserId);
        }

    }
}
