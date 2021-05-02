using System.ComponentModel.DataAnnotations;

namespace LingaLearn.Models
{
    public class LanguageProficiency
    {
        public int Id { get; set; }

        [Required]
        public string Proficiency { get; set; }
    }
}
