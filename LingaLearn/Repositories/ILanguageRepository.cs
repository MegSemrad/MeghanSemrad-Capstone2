using LingaLearn.Models;
using System.Collections.Generic;

namespace LingaLearn.Repositories
{
    public interface ILanguageRepository
    {
        List<Language> GetUserLanguages(int userId);
        void Add(Language language);
        void Update(Language language);
    }
}