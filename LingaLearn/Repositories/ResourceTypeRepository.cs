using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using LingaLearn.Models;
using LingaLearn.Utils.cs;


namespace LingaLearn.Repositories
{
    public class ResourceTypeRepository : BaseRepository, IResourceTypeRepository
    {
        public ResourceTypeRepository(IConfiguration configuration) : base(configuration) { }

        public List<ResourceType> GetResourceTypes()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT rt.Id, rt.Type
                        FROM ResourceType rt";

                    var reader = cmd.ExecuteReader();

                    var resourceTypes = new List<ResourceType>();

                    while (reader.Read())
                    {
                        resourceTypes.Add(new ResourceType()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Type = DbUtils.GetString(reader, "Type"),
                        });
                    }

                    reader.Close();
                    return resourceTypes;
                }
            }
        }
    }
}
