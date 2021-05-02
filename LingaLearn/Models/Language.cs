namespace LingaLearn.Models
{
    public class Language
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public string LanguageName { get; set; }
        public int LanguageProficiencyId { get; set; }
        public LanguageProficiency LanguageProficiency { get; set; }
    }
}
