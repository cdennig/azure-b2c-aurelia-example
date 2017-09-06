using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class PeopleController : Controller
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(SampleData.PeopleList);
        }

    }
}
