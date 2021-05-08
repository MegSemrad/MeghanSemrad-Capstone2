using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using LingaLearn.Models;
using LingaLearn.Utils.cs;
using Microsoft.Data.SqlClient;

namespace LingaLearn.Repositories
{
    public class LanguageRepository : BaseRepository, ILanguageRepository
    {
        public LanguageRepository(IConfiguration configuration) : base(configuration) { }

        public List<Language> GetUserLanguages(string FirebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT l.Id AS LanguageId, l.LanguageName,
                        lp.Id AS LanguageProficiencyId, lp.Proficiency,
                        u.Id AS UserId, u.UserName, u.FirebaseUserId
                        FROM Language l
                        LEFT JOIN LanguageProficiency lp ON lp.Id = l.LanguageProficiencyId
                        LEFT JOIN [User] u ON u.Id = l.UserId
                        WHERE u.FirebaseUserId = @FirebaseUserId";

                    cmd.Parameters.AddWithValue("@FirebaseUserId", FirebaseUserId);
                    var reader = cmd.ExecuteReader();

                    var languages = new List<Language>();

                    while (reader.Read())
                    {
                        languages.Add(new Language()
                        {
                            Id = DbUtils.GetInt(reader, "LanguageId"),
                            LanguageName = DbUtils.GetString(reader, "LanguageName"),
                            LanguageProficiencyId = DbUtils.GetInt(reader, "LanguageProficiencyId"),
                            LanguageProficiency = new LanguageProficiency()
                            {
                                Id = DbUtils.GetInt(reader, "LanguageProficiencyId"),
                                Proficiency = DbUtils.GetString(reader, "Proficiency")
                            },
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            User = new User()
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                UserName = DbUtils.GetString(reader, "UserName"),
                                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),

                            }
                        });
                    }

                    reader.Close();
                    return languages;
                }
            }
        }






        
public Language GetLanguageByLanguageId(int LanguageId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT  l.Id, 
                                l.UserId, 
                                l.LanguageName, 
                                l.LanguageProficiencyId
                        FROM Language l
                        WHERE l.Id = @id
                    ";

                    cmd.Parameters.AddWithValue("@id", LanguageId);

                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        Language language = new Language
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                            LanguageName = reader.GetString(reader.GetOrdinal("LanguageName")),
                            LanguageProficiencyId = reader.GetInt32(reader.GetOrdinal("LanguageProficiencyId"))
                        };

                        reader.Close();
                        return language;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }






        public void Add(Language language)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Language (LanguageName, LanguageProficiencyId, UserId)
                        OUTPUT INSERTED.ID
                        VALUES (@LanguageName, @LanguageProficicenyId, @UserId)";

                    DbUtils.AddParameter(cmd, "@LanguageName", language.LanguageName);
                    DbUtils.AddParameter(cmd, "@LanguageProficicenyId", language.LanguageProficiencyId);
                    DbUtils.AddParameter(cmd, "@UserId", language.UserId);

                    language.Id = (int)cmd.ExecuteScalar();
                }
            }
        }





        public void Update(Language language)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand()) 
                {
                    cmd.CommandText = @"
                        UPDATE Language
                           SET LanguageName = @LanguageName, 
                               LanguageProficiencyId = @LanguageProficiencyId
                         WHERE id = @id";

                    DbUtils.AddParameter(cmd, "@LanguageName", language.LanguageName);
                    DbUtils.AddParameter(cmd, "@LanguageProficiencyId", language.LanguageProficiencyId);
                    DbUtils.AddParameter(cmd, "@id", language.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }





        public void Delete(int languageId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Language WHERE Id = @Id;
                                        DELETE FROM Resource WHERE LanguageId = @Id";
                    DbUtils.AddParameter(cmd, "@Id", languageId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}