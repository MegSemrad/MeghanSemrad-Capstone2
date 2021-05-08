using LingaLearn.Models;
using System.Collections.Generic;

namespace LingaLearn.Repositories
{
    public interface IResourceRepository
    {
        List<Resource> GetResourcesByLanguageId(int LanguageId);
    }
}