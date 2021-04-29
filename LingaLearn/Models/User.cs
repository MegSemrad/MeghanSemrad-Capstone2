using System.ComponentModel.DataAnnotations;


namespace LingaLearn.Models
{
    public class User
    {
        public int Id { get; set; }


        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }


        [Required]
        [MaxLength(50)]
        public string UserName { get; set; }


        [Required]
        [DataType(DataType.EmailAddress)]
        [MaxLength(60)]
        public string Email { get; set; }
    }
}