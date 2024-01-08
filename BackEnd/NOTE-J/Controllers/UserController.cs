using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using NOTE_J.Models;

namespace NOTE_J.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly NOTEJdbContext _context;

        public UserController(NOTEJdbContext context)
        {
            _context = context;
        }

        // GET: api/User
        [HttpGet] //admin
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id,[FromBody] User user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        [HttpPost]
        public async Task<ActionResult<User>> PostUser([FromBody]User user)
        {
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.UserId }, user);
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }

        [HttpPost("Login")]
        public async Task<ActionResult<User>> Login([FromBody] LoginRequest request)
        {
            

            User user = _context.Users.FirstOrDefault(u => u.Email == request.Email);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return Unauthorized("Incorrect password.");
            }

            return Ok(new
            {
                UserId = user.UserId,
                Email = user.Email,
            });
        }

        [HttpPost("EmailExist")]
        public bool EmailExist([FromBody] EmailRequest request)
        {
            Console.WriteLine("hi");
            return _context.Users.Any(e => e.Email == request.Email);
        }


        //[HttpGet("Login2/{Email}")]
        //public async Task<ActionResult<User>> Login2(string Email)
        //{
        //    User Account = _context.Users.Where(s => s.Email == Email).FirstOrDefault();

        //    var user = await _context.Users.FindAsync(Account.UserId);

        //    if (user == null)
        //    {
        //        return NotFound();
        //    }

        //    return user;
        //}
    }
}
