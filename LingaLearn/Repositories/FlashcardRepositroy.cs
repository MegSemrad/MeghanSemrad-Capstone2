using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using LingaLearn.Models;
using LingaLearn.Utils.cs;
using Microsoft.Data.SqlClient;

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


     


        public Flashcard GetFlashcardByFlashcardId(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT  f.Id, 
                                f.FlashcardCollectionId, 
                                f.Word, 
                                f.TranslatedWord, 
                                f.IsStudying
                        FROM Flashcard f
                        WHERE f.Id = @id
                    ";

                    cmd.Parameters.AddWithValue("@id", id);

                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        Flashcard flashcard = new Flashcard
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            FlashcardCollectionId = reader.GetInt32(reader.GetOrdinal("FlashcardCollectionId")),
                            Word = reader.GetString(reader.GetOrdinal("Word")),
                            TranslatedWord = reader.GetString(reader.GetOrdinal("TranslatedWord")),
                            IsStudying = reader.GetBoolean(reader.GetOrdinal("IsStudying"))
                        };

                        reader.Close();
                        return flashcard;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }





        public void Add(Flashcard flashcard)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Flashcard (FlashcardCollectionId, Word, TranslatedWord, IsStudying)
                        OUTPUT INSERTED.ID
                        VALUES (@FlashcardCollectionId, @Word, @TranslatedWord, @IsStudying)";

                    DbUtils.AddParameter(cmd, "@FlashcardCollectionId", flashcard.FlashcardCollectionId);
                    DbUtils.AddParameter(cmd, "@Word", flashcard.Word);
                    DbUtils.AddParameter(cmd, "@TranslatedWord", flashcard.TranslatedWord);
                    DbUtils.AddParameter(cmd, "@IsStudying", flashcard.IsStudying);

                    flashcard.Id = (int)cmd.ExecuteScalar();
                }
            }
        }






        public void Update(Flashcard flashcard)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Flashcard
                           SET FlashcardCollectionId = @FlashcardCollectionId,
                               Word = @Word,
                               TranslatedWord = @TranslatedWord,
                               IsStudying = @IsStudying
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@FlashcardCollectionId", flashcard.FlashcardCollectionId);
                    DbUtils.AddParameter(cmd, "@Word", flashcard.Word);
                    DbUtils.AddParameter(cmd, "@TranslatedWord", flashcard.TranslatedWord);
                    DbUtils.AddParameter(cmd, "@IsStudying", flashcard.IsStudying);
                    DbUtils.AddParameter(cmd, "@Id", flashcard.Id);

                    cmd.ExecuteNonQuery();
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
