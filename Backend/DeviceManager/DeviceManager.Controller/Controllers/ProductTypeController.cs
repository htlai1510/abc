using DeviceManager.ViewModel.ViewModel;
using Microsoft.AspNetCore.Mvc;
using DeviceManager.IService;

namespace DeviceManager.Controller.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]

    public class ProductTypeController : BaseController
    {

        private readonly IProductTypeService _productTypeService;
        public ProductTypeController(IProductTypeService productTypeService)
        {
            _productTypeService = productTypeService;
        }
        [HttpGet]
        public IActionResult GetAll()

        {
            return CreateResponse(() =>
            {
                var devices = _productTypeService.GetAll();
                return Ok(devices);
            });
        }



        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return CreateResponse(() =>
            {
                var device = _productTypeService.Get(id);
                return Ok(device);
            });
        }

        [HttpPost]
        public IActionResult Insert([FromBody] ProductTypeViewModel productTypeVM)
        {
            return CreateResponse(() =>
            {
                _productTypeService.Insert(productTypeVM);
                return Ok();
            });
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] ProductTypeViewModel productTypeVM)
        {
            return CreateResponse(() =>
            {
                _productTypeService.Update(id, productTypeVM);
                return Ok();
            });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            return CreateResponse(() =>
            {
                _productTypeService.Delete(id);
                return Ok();
            });
        }
    }
}
