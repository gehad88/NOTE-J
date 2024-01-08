using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NOTE_J.Models;

namespace NOTE_J.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly NOTEJdbContext _context;
        private readonly IWebHostEnvironment _hostEnviroment;
        private const long MaxFileSizeInBytes = 2 * 1024 * 1024; // 2 MB


        public CategoryController(NOTEJdbContext context , IWebHostEnvironment hostEnviroment)
        {
            _context = context;
            _hostEnviroment = hostEnviroment;
        }

        // GET: api/Category
        [HttpGet("GetCat/{id}")] //admin
        public async Task<ActionResult<IEnumerable<Category>>> GetCat(int id)
        {
            var cat = await _context.Categories.FindAsync(id);
            if(cat == null) 
                 return NotFound();

            return Ok(cat);
        }

        // GET: api/Category/5
        [HttpGet("{id}")]
        public async Task<ActionResult<List<Category>>> GetCategory(int id)
        {
            var user = await _context.Users
                 .Include(u => u.Categories) // Include the Categories navigation property
                 .FirstOrDefaultAsync(u => u.UserId == id);

            if (user == null)
            {
                return NotFound();
            }

            var categories = user.Categories.ToList();
            return categories;
        }

        [HttpPost("GETDEFAULTCATEGORY")]
        public ActionResult<int> GETDEFAULTCATEGORY([FromBody] GetDefaulCatValue userId)
        {
            var user = _context.Users
                .Include(u => u.Categories)
                .FirstOrDefault(u => u.UserId == userId.UserId);

            if (user == null)
            {
                return NotFound();
            }

            var firstCategory = user.Categories.FirstOrDefault();

            if (firstCategory == null)
            {
                return NotFound("User has no categories.");
            }
            var catId = firstCategory.CategoryId;

            return Ok(catId);
        }

        [HttpPost("AddCatImage")]
        [HttpPost("AddCatImage/{categoryId}")]
        public IActionResult AddCatImage(int categoryId, IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("Invalid file");
            }

            // Check if the category with the specified categoryId exists and is associated with the user
            var category = _context.Categories.FirstOrDefault(c => c.CategoryId == categoryId);
            if (category == null)
            {
                return NotFound("Category not found or unauthorized.");
            }

            if (!IsImageFile(file))
            {
                return BadRequest("Invalid file type. Only image files are allowed.");
            }

            if (file.Length > MaxFileSizeInBytes)
            {
                return BadRequest($"File size exceeds the maximum allowed size of {MaxFileSizeInBytes / (1024 * 1024)} MB.");
            }

            string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Images");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            string uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
            string filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            // Save the image path/reference in the category
            category.CategoryImage = uniqueFileName;
            _context.SaveChanges();

            return Ok(uniqueFileName);
        }

        private bool IsImageFile(IFormFile file)
        {
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
            var fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();
            return allowedExtensions.Contains(fileExtension);
        }
        [NonAction]
        public async Task<string> SaveImages(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ' , '-');
            imageName = imageName+DateTime.Now.ToString("yymmssfff")+Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnviroment.ContentRootPath,"Images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
        return imageName;
    }


        //[HttpGet("byId/{id}")]     Admin 
        //public async Task<IActionResult> AdminGetAllCategories(int id)
        //{

        //    var category = await _context.Categories.FindAsync(id);

        //    if (category == null)
        //    {
        //        return NotFound();
        //    }

        //    return (IActionResult)category;
        //}



        // PUT: api/Category/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(int id, Category category)
        {
            if (id != category.CategoryId)
            {
                return BadRequest();
            }

            _context.Entry(category).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
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

        // POST: api/Category
        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory([FromForm]Category category)
        {
            if (category.ImageFile != null)
                category.CategoryImage = await SaveImages(category.ImageFile);
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return Ok("nice");
        }

        // DELETE: api/Category/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Category>> DeleteCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return category;
        }

        private bool CategoryExists(int id)
        {
            return _context.Categories.Any(e => e.CategoryId == id);
        }
    }
}
