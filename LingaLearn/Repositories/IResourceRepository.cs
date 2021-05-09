using LingaLearn.Models;
using System.Collections.Generic;

namespace LingaLearn.Repositories
{
    public interface IResourceRepository
    {
        void Delete(int resourceId);
        List<Resource> GetResourcesByLanguageId(int LanguageId);
    }
}