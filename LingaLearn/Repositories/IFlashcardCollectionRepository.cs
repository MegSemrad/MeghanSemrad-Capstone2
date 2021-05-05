using LingaLearn.Models;
using System.Collections.Generic;

namespace LingaLearn.Repositories
{
    public interface IFlashcardCollectionRepository
    {
        List<FlashcardCollection> GetFlashcardCollectionsByFirebaseUserId(string FirebaseUserId);
        void Update(FlashcardCollection flashcardCollection);
    }
}