using DeviceManager.ViewModel.ViewModel;
using Microsoft.AspNetCore.Mvc;
using DeviceManager.IService;

namespace DeviceManager.Controller.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]

    public class BrandController : BaseController
    {

        private readonly IBrandService _brandService;
        public BrandController(IBrandService brandService)
        {
            _brandService = brandService;
        }
        [HttpGet]
        public IActionResult GetAll()

        {
            return CreateResponse(() =>
            {
                var devices = _brandService.GetAll();
                return Ok(devices);
            });
        }


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return CreateResponse(() =>
            {
                var device = _brandService.Get(id);
                return Ok(device);
            });
        }

        [HttpPost]
        public IActionResult Insert([FromBody] BrandViewModel brandVM)
        {
            return CreateResponse(() =>
            {
                _brandService.Insert(brandVM);
                return Ok();
            });
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] BrandViewModel brandVM)
        {
            
            return CreateResponse(() =>
            {
                _brandService.Update(id, brandVM);
                return Ok();
            });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            return CreateResponse(() =>
            {
                _brandService.Delete(id);
                return Ok();
            });
        }
    }
}
