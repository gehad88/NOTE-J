using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace NOTE_J.Models
{
    public partial class User
    {
        public User()
        {
            Categories = new HashSet<Category>();
            Notes = new HashSet<Note>();
        }

        public int UserId { get; set; }
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;
        public string ?UserImage { get; set; } = null;

        public virtual ICollection<Category> Categories { get; set; }
        [JsonIgnore]

        public virtual ICollection<Note> Notes { get; set; }
    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
    public class EmailRequest
    {
        public string Email { get; set; }
    }


}
