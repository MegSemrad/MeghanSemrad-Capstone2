using System.Collections.Generic;
using LingaLearn.Models;

namespace LingaLearn.Repositories
{
    public interface ILanguageProficiencyRepository
    {
        List<LanguageProficiency> GetAll();
    }
}