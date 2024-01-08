using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace NOTE_J.Models
{
    public partial class Note
    {
        public Note()
        {
            NoteTags = new HashSet<NoteTag>();
        }

        public int NoteId { get; set; }
        public int UserId { get; set; }
        public int? CategoryId { get; set; }
        public string Title { get; set; } = null!;
        public string? Content { get; set; }
        public DateTime CreatedAt { get; set; }

        public virtual Category? Category { get; set; }
        [JsonIgnore]
        public virtual User User { get; set; } = null!;
        public virtual ICollection<NoteTag> NoteTags { get; set; }
    }

    public class UserNote
    {
        public int NoteId { get; set; }
        public int UserId { get; set; }
        public int? CategoryId { get; set; }
        public string Title { get; set; } = null!;
        public string? Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public UserNote()
        {
            // Parameterless constructor
        }

    }
}

