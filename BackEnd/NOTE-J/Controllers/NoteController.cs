using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NOTE_J.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NOTE_J.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        private readonly NOTEJdbContext _context;

        public NoteController(NOTEJdbContext context)
        {
            _context = context;
        }

        // GET: api/Note
        [HttpGet]  //admin
        public async Task<ActionResult<IEnumerable<Note>>> GetNotes()
        {
            return await _context.Notes.ToListAsync();
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<List<Note>>> GetNotesByUserId(int userId)
        {
            var user = await _context.Users
                .Include(u => u.Notes)
                .FirstOrDefaultAsync(u => u.UserId == userId);

            if (user == null)
            {
                return NotFound();
            }

            var notes = user.Notes.ToList();

            return notes;
        }

        [HttpGet("ById/{catId}")]
        public async Task<ActionResult<IEnumerable<Note>>> GetNotesByCatId(int catId)
        {
            var notes = await _context.Notes
                .Where(u => u.CategoryId == catId)
                .ToListAsync();

            if (notes == null || !notes.Any())
            {
                return NotFound("No notes found for the given category.");
            }

            return Ok(notes);
        }

        [HttpGet("ById/{catId}/Length")]
        public int GetNotesByCatIdLength(int catId)
        {
            var notesLen =  _context.Notes
                .Where(u => u.CategoryId == catId).Count();

            if (notesLen == 0)
            {
                return (0);
            }

            return notesLen;
        }
       

        // PUT: api/Note/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNote(int id, [FromBody] Note note)
        {
            if (id != note.NoteId)
            {
                return BadRequest();
            }

            _context.Entry(note).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NoteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Note
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Note>> PostNote([FromBody] Note note)
        {
            _context.Notes.Add(note);
            await _context.SaveChangesAsync();

            return NoContent();

        }

        // DELETE: api/Note/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Note>> DeleteNote(int id)
        {
            var note = await _context.Notes.FindAsync(id);
            if (note == null)
            {
                return NotFound();
            }

            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();

            return note;
        }

        private bool NoteExists(int id)
        {
            return _context.Notes.Any(e => e.NoteId == id);
        }
    }
}
