using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NOTE_J.Models;

namespace NOTE_J.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoteTagController : ControllerBase
    {
        private readonly NOTEJdbContext _context;

        public NoteTagController(NOTEJdbContext context)
        {
            _context = context;
        }

        // GET: api/NoteTag
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NoteTag>>> GetNoteTags()
        {
            return await _context.NoteTags.ToListAsync();
        }

        // GET: api/NoteTag/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NoteTag>> GetNoteTag(int id)
        {
            var noteTag = await _context.NoteTags.FindAsync(id);

            if (noteTag == null)
            {
                return NotFound();
            }

            return noteTag;
        }

        // PUT: api/NoteTag/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNoteTag(int id, NoteTag noteTag)
        {
            if (id != noteTag.NoteTagId)
            {
                return BadRequest();
            }

            _context.Entry(noteTag).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NoteTagExists(id))
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

        // POST: api/NoteTag
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<NoteTag>> PostNoteTag(NoteTag noteTag)
        {
            _context.NoteTags.Add(noteTag);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNoteTag", new { id = noteTag.NoteTagId }, noteTag);
        }

        // DELETE: api/NoteTag/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<NoteTag>> DeleteNoteTag(int id)
        {
            var noteTag = await _context.NoteTags.FindAsync(id);
            if (noteTag == null)
            {
                return NotFound();
            }

            _context.NoteTags.Remove(noteTag);
            await _context.SaveChangesAsync();

            return noteTag;
        }

        private bool NoteTagExists(int id)
        {
            return _context.NoteTags.Any(e => e.NoteTagId == id);
        }
    }
}
