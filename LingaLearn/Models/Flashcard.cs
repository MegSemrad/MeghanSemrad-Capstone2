using System.ComponentModel.DataAnnotations;

namespace LingaLearn.Models
{
    public class Flashcard
    {
        public int Id { get; set; }

        public int FlashcardCollectionId { get; set; }

        public FlashcardCollection FlashcardCollection { get; set; }

        [Required]
        public string Word { get; set; }

        [Required]
        public string TranslatedWord { get; set; }

        public bool IsStudying { get; set; }
    }
}
