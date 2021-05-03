using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using LingaLearn.Models;
using LingaLearn.Utils.cs;


namespace LingaLearn.Repositories
{
    public class LanguageProficiencyRepository : BaseRepository, ILanguageProficiencyRepository
    {

        public LanguageProficiencyRepository(IConfiguration configuration) : base(configuration) { }

        public List<LanguageProficiency> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Proficiency
                        FROM LanguageProficiency";

                    var reader = cmd.ExecuteReader();

                    var proficiencies = new List<LanguageProficiency>();
                    while (reader.Read())
                    {
                        proficiencies.Add(new LanguageProficiency()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Proficiency = DbUtils.GetString(reader, "Proficiency"),
                        });
                    }

                    reader.Close();

                    return proficiencies;
                }
            }
        }

    }
}
