using LingaLearn.Models;
using System.Collections.Generic;

namespace LingaLearn.Repositories
{
    public interface ILanguageRepository
    {
        List<Language> GetUserLanguages(int userId);
        void AddLanguage(Language language);
        void UpdateLanguage(Language language);
        void DeleteLanguage(int languageId);
    }
}