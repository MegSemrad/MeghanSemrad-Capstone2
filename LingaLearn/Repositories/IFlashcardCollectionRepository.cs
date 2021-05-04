// function is to retrieve all collections of flashcards for a specific language and display by topic 


using LingaLearn.Models;
using System.Collections.Generic;

namespace LingaLearn.Repositories
{
    public interface IFlashcardCollectionRepository
    {
        List<FlashcardCollection> GetFlashcardCollectionsByFirebaseUserId(int FirebaseUserId);
    }
}