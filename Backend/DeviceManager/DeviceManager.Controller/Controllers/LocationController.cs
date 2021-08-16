using Microsoft.AspNetCore.Mvc;
using DeviceManager.IService;
using DeviceManager.ViewModel.ViewModel;

namespace DeviceManager.Controller.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class LocationController : BaseController
    {
        private readonly ILocationService _locationService;

        public LocationController(ILocationService locationService)
        {
            _locationService = locationService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return CreateResponse(() =>
            {
                var locations = _locationService.GetAll();
                return Ok(locations);
            });
        }

        [HttpGet]
        public IActionResult GetLocation()
        {
            return CreateResponse(() =>
            {
                var locations = _locationService.GetLocation();
                return Ok(locations);
            });
        }

        /*
        [HttpGet]
        public IActionResult GetFloor()
        {
            return CreateResponse(() =>
            {
                var locations = _locationService.GetFloor();
                return Ok(locations);
            });
        }

        [HttpGet]
        public IActionResult GetRoom()
        {
            return CreateResponse(() =>
            {
                var locations = _locationService.GetRoom();
                return Ok(locations);
            });
        }
        */

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return CreateResponse(() =>
            {
                var locations = _locationService.Get(id);
                return Ok(locations);
            });
        }

        [HttpPost]
        public IActionResult Insert([FromBody] LocationViewModel locationVM)
        {
            return CreateResponse(() =>
            {
                _locationService.Insert(locationVM);
                return Ok();
            });
        }


        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] LocationViewModel locationVM)
        {
            return CreateResponse(() =>
            {
                _locationService.Update(id, locationVM);
                return Ok();
            });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            return CreateResponse(() =>
            {
                _locationService.Delete(id);
                return Ok();
            });
        }
    }
}
