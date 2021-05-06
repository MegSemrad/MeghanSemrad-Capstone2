using LingaLearn.Models;
using System.Collections.Generic;

namespace LingaLearn.Repositories
{
    public interface IFlashcardRepository
    {
        List<Flashcard> GetFlashcardsFromCollection(int FlashcardCollectionId);
        void Add(Flashcard flashcard);
        void DeleteSingleFlashcardCollection(int id);
        Flashcard GetFlashcardByFlashcardId(int id);
        void Update(Flashcard flashcard);
    }
}