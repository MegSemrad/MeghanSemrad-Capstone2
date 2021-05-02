using LingaLearn.Models;
using System.Collections.Generic;

namespace LingaLearn.Repositories
{
    public interface ILanguageRepository
    {
        void Add(Language language);
        List<Language> GetUserLanguages(int userId);
    }
}