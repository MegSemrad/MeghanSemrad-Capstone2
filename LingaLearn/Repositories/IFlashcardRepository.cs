using LingaLearn.Models;
using System.Collections.Generic;

namespace LingaLearn.Repositories
{
    public interface IFlashcardRepository
    {
        void DeleteSingleFlashcardCollection(int id);
        List<Flashcard> GetFlashcardsFromCollection(int FlashcardCollectionId);
    }
}