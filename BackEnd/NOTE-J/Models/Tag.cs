using System;
using System.Collections.Generic;

namespace NOTE_J.Models
{
    public partial class Tag
    {
        public Tag()
        {
            NoteTags = new HashSet<NoteTag>();
        }

        public int TagId { get; set; }
        public string TagName { get; set; } = null!;

        public virtual ICollection<NoteTag> NoteTags { get; set; }
    }
}
