using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Evice.CRM.Sample.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private static List<Product> _products = new List<Product>
        {
            new Product { Id = 1, Brand = "Samsung", Model = "S23", Price = 3.999m},
            new Product { Id = 2, Brand = "Samsung", Model = "A50", Price = 1.299m},
            new Product { Id = 3, Brand = "iPhone", Model = "13", Price = 5.999m},
            new Product { Id = 4, Brand = "iPhone", Model = "12", Price = 4.999m},
            new Product { Id = 5, Brand = "Motorola", Model = "G50", Price = 1.090m}
        };

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_products);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var product = _products.FirstOrDefault(x => x.Id == id);

            if (product == null)
                return NoContent();

            return Ok(product);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Product value)
        {
            _products.Add(value);

            return Ok();
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var product = _products.FirstOrDefault(x => x.Id == id);

            if (product == null)
                return BadRequest();

            _products.Remove(product);

            return Ok();
        }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public decimal Price { get; set; }
    }
}
