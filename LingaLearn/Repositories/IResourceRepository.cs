using LingaLearn.Models;
using System.Collections.Generic;

namespace LingaLearn.Repositories
{
    public interface IResourceRepository
    {
        void AddResource(Resource resource);
        void Delete(int resourceId);
        Resource GetResourceByResourceId(int ResourceId);
        List<Resource> GetResourcesByLanguageId(int LanguageId);
        void Update(Resource resource);
    }
}