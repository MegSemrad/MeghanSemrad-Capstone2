using LingaLearn.Models;
using System.Collections.Generic;


namespace LingaLearn.Repositories
{
    public interface IResourceTypeRepository
    {
        List<ResourceType> GetResourceTypes();
    }
}