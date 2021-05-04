using System.ComponentModel.DataAnnotations;


namespace LingaLearn.Models
{
    public class FlashcardCollection
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }

        [Required]
        public int LanguageId { get; set; }

        [Required]
        public Language Language { get; set; }

        [Required]
        public string Date { get; set; }

        [Required]
        public string Topic { get; set; }
    }
}
