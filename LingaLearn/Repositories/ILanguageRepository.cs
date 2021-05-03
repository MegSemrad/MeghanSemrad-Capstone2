using LingaLearn.Models;
using System.Collections.Generic;

namespace LingaLearn.Repositories
{
    public interface ILanguageRepository
    {
        List<Language> GetUserLanguages(string firebaseUserId);
        void Add(Language language);
        void Update(Language language);
        void Delete(int languageId);
    }
}