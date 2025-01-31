﻿using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using LingaLearn.Models;
using LingaLearn.Utils.cs;


namespace LingaLearn.Repositories
{
    public class FlashcardCollectionRepository : BaseRepository, IFlashcardCollectionRepository
    {
        public FlashcardCollectionRepository(IConfiguration configuration) : base(configuration) { }

        public List<FlashcardCollection> GetFlashcardCollectionsByFirebaseUserId(string FirebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT fc.Id AS FlashcardCollectionId, fc.UserId, fc.LanguageId, fc.Topic,
                        u.Id AS UserId, u.FirebaseUserId,
                        l.Id AS LanguageId, l.LanguageName
                        FROM FlashcardCollection fc
                        LEFT JOIN [User] u ON u.Id = fc.UserId
                        LEFT JOIN Language l ON l.Id = fc.LanguageId
                        WHERE u.FirebaseUserId = @FirebaseUserId";

                    cmd.Parameters.AddWithValue("@FirebaseUserId", FirebaseUserId);
                    var reader = cmd.ExecuteReader();

                    var flashcardCollections = new List<FlashcardCollection>();

                    while (reader.Read())
                    {
                        flashcardCollections.Add(new FlashcardCollection()
                        {
                            Id = DbUtils.GetInt(reader, "FlashcardCollectionId"),
                            Topic = DbUtils.GetString(reader, "Topic"),
                            LanguageId = DbUtils.GetInt(reader, "LanguageId"),
                            Language = new Language()
                            {
                                Id = DbUtils.GetInt(reader, "LanguageId"),
                                LanguageName = DbUtils.GetString(reader, "LanguageName")
                            },
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            User = new User()
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),

                            }
                        });
                    }
                    reader.Close();
                    return flashcardCollections;
                }
            }
        }

        



        public void Add(FlashcardCollection flashcardCollection)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO FlashcardCollection (UserId, LanguageId, Date, Topic)
                        OUTPUT INSERTED.ID
                        VALUES (@UserId, @LanguageId, @Date, @Topic)";

                    DbUtils.AddParameter(cmd, "@UserId", flashcardCollection.UserId);
                    DbUtils.AddParameter(cmd, "@LanguageId", flashcardCollection.LanguageId);
                    DbUtils.AddParameter(cmd, "@Date", flashcardCollection.Date);
                    DbUtils.AddParameter(cmd, "@Topic", flashcardCollection.Topic);

                    flashcardCollection.Id = (int)cmd.ExecuteScalar();
                }
            }
        }





        public void DeleteEntireCollection(int FlashcardCollectionId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Flashcard WHERE FlashcardCollectionId= @Id;
                                        DELETE FROM FlashcardCollection WHERE Id = @Id; 
                                        ";
                    DbUtils.AddParameter(cmd, "@Id", FlashcardCollectionId);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
};     