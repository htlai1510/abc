using Microsoft.AspNetCore.Mvc;
using DeviceManager.IService;
using DeviceManager.ViewModel.ViewModel;

namespace DeviceManager.Controller.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PositionController : BaseController
    {
        private readonly IPositionService _positionService;
        public PositionController(IPositionService positionService)
        {
            _positionService = positionService;
        }
        [HttpGet]
        public IActionResult GetAll()

        {
            return CreateResponse(() =>
            {
                var devices = _positionService.GetAll();
                return Ok(devices);
            });
        }




        [HttpPost]
        public IActionResult Insert([FromBody] PositionViewModel positionVM)
        {
            return CreateResponse(() =>
            {
                _positionService.Insert(positionVM);
                return Ok();
            });
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] PositionViewModel positionVM)
        {
            return CreateResponse(() =>
            {
                _positionService.Update(id, positionVM);
                return Ok();
            });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            return CreateResponse(() =>
            {
                _positionService.Delete(id);
                return Ok();
            });
        }
    }
}
