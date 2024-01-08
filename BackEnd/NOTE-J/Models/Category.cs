using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace NOTE_J.Models
{
    public partial class Category
    {
        public Category()
        {
            Notes = new HashSet<Note>();
        }

        public int CategoryId { get; set; }
        public int UserId { get; set; }
        public string CategoryName { get; set; } = null!;
        public string? CategoryImage { get; set; } = null;
        [JsonIgnore]

        public virtual User User { get; set; } = null!;
        [JsonIgnore]

        public virtual ICollection<Note> Notes { get; set; }
        [NotMapped]
        public IFormFile ImageFile { get; set; }
    }

    public class GetDefaulCatValue
    {
      public int UserId { get; set; }

    }

}
