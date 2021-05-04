﻿using LingaLearn.Models;
using System.Collections.Generic;

namespace LingaLearn.Repositories
{
    public interface IFlashcardRepository
    {
        List<Flashcard> GetFlashcardsFromCollection(int FlashcardCollectionId);
    }
}