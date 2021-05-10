using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using LingaLearn.Models;
using LingaLearn.Utils.cs;
using Microsoft.Data.SqlClient;


namespace LingaLearn.Repositories
{
    public class ResourceRepository : BaseRepository, IResourceRepository
    {

        public ResourceRepository(IConfiguration configuration) : base(configuration) { }


        public List<Resource> GetResourcesByLanguageId(int LanguageId)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT r.Id AS ResourceId, r.UserId, r.LanguageId, r.ResourceTypeId, r.Source,
                        rt.Id AS ResourceTypeId, rt.Type
                        FROM Resource r
                        LEFT JOIN ResourceType rt ON rt.Id = r.ResourceTypeId
                        WHERE r.LanguageId = @LanguageId";

                    cmd.Parameters.AddWithValue("@LanguageId", LanguageId);
                    var reader = cmd.ExecuteReader();

                    var resources = new List<Resource>();

                    while (reader.Read())
                    {
                        resources.Add(new Resource()
                        {
                            Id = DbUtils.GetInt(reader, "ResourceId"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            LanguageId = DbUtils.GetInt(reader, "LanguageId"),
                            Source = DbUtils.GetString(reader, "Source"),
                            ResourceTypeId = DbUtils.GetInt(reader, "ResourceTypeId"),
                            ResourceType = new ResourceType()
                            {
                                Id = DbUtils.GetInt(reader, "ResourceTypeId"),
                                Type = DbUtils.GetString(reader, "Type")
                            }
                        });
                    }

                    reader.Close();
                    return resources;
                }
            }
        }





             public void AddResource(Resource resource)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Resource (UserId, LanguageId, ResourceTypeId, Source)
                        OUTPUT INSERTED.ID
                        VALUES (@UserId, @LanguageId, @ResourceTypeId, @Source)";

                    DbUtils.AddParameter(cmd, "@UserId", resource.UserId);
                    DbUtils.AddParameter(cmd, "@LanguageId", resource.LanguageId);
                    DbUtils.AddParameter(cmd, "@ResourceTypeId", resource.ResourceTypeId);
                    DbUtils.AddParameter(cmd, "@Source", resource.Source);


                    resource.Id = (int)cmd.ExecuteScalar();
                }
            }
        }





        public void Update(Resource resource)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Resource
                           SET LanguageId = @LanguageId, 
                               ResourceTypeId = @ResourceTypeId
                               Source = @Source
                         WHERE id = @id";

                    DbUtils.AddParameter(cmd, "@LanguageId", resource.LanguageId);
                    DbUtils.AddParameter(cmd, "@ResourceTypeId", resource.ResourceTypeId);
                    DbUtils.AddParameter(cmd, "@Source", resource.Source);
                    DbUtils.AddParameter(cmd, "@id", resource.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }





        public void Delete(int resourceId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Resource WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", resourceId);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
