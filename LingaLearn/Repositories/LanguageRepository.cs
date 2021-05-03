using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using LingaLearn.Models;
using LingaLearn.Utils.cs;

namespace LingaLearn.Repositories
{
    public class LanguageRepository : BaseRepository, ILanguageRepository
    {
        public LanguageRepository(IConfiguration configuration) : base(configuration) { }

        public List<Language> GetUserLanguages(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT l.Id AS LanguageId, l.LanguageName,
                        lp.Id AS LanguageProficiencyId, lp.Proficiency,
                        u.Id AS UserId, u.UserName
                        FROM Language l
                        LEFT JOIN LanguageProficiency lp ON lp.Id = l.LanguageProficiencyId
                        LEFT JOIN [User] u ON u.Id = l.UserId
                        WHERE u.FirebaseUserId = @FirebaseUserId";

                    cmd.Parameters.AddWithValue("@FirebaseUserId", firebaseUserId);
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

                    DbUtils.AddParameter(cmd, "@Title", language.LanguageName);
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