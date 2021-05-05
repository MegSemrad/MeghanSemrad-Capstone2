using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using LingaLearn.Models;
using LingaLearn.Utils.cs;

namespace LingaLearn.Repositories
{
    public class FlashcardRepository : BaseRepository, IFlashcardRepository
    {
        public FlashcardRepository(IConfiguration configuration) : base(configuration) { }


        public List<Flashcard> GetFlashcardsFromCollection(int FlashcardCollectionId)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT f.Id AS FlashcardId, f.Word, f.TranslatedWord, f.IsStudying, f.FlashcardCollectionId,
                        fc.Id AS FlashcardCollectionId, fc.UserId, fc.LanguageId, fc.Date, fc.Topic
                        FROM Flashcard f
                        LEFT JOIN FlashcardCollection fc ON fc.Id = f.FlashcardCollectionId
                        WHERE f.FlashcardCollectionId = @FlashcardCollectionId";

                    cmd.Parameters.AddWithValue("@FlashcardCollectionId", FlashcardCollectionId);
                    var reader = cmd.ExecuteReader();

                    var flashcards = new List<Flashcard>();

                    while (reader.Read())
                    {
                        flashcards.Add(new Flashcard()
                        {
                            Id = DbUtils.GetInt(reader, "FlashcardId"),
                            Word = DbUtils.GetString(reader, "Word"),
                            TranslatedWord = DbUtils.GetString(reader, "TranslatedWord"),
                            IsStudying = reader.GetBoolean(reader.GetOrdinal("IsStudying")),
                            FlashcardCollectionId = DbUtils.GetInt(reader, "FlashcardCollectionId"),
                            FlashcardCollection = new FlashcardCollection()
                            {
                                Id = DbUtils.GetInt(reader, "FlashcardCollectionId"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                LanguageId = DbUtils.GetInt(reader, "LanguageId"),
                                Date = DbUtils.GetDateTime(reader, "Date").ToString("MM/dd/yyyy"),
                                Topic = DbUtils.GetString(reader, "Topic")
                            }
                        });
                    }

                    reader.Close();
                    return flashcards;
                }
            }
        }

        

        public void DeleteSingleFlashcardCollection(int flashcardId)
            {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = "DELETE FROM Flashcard WHERE Id = @Id";
                        DbUtils.AddParameter(cmd, "@id", flashcardId);
                        cmd.ExecuteNonQuery();
                    }
                }
            }



    }
}
