using DeviceManager.ViewModel.ViewModel;
using Microsoft.AspNetCore.Mvc;
using DeviceManager.IService;
using System.Dynamic;



namespace DeviceManager.Controller.Controlers
{
    [Route("api/[controller]/[action]")]
    [ApiController]

    public class TrackingController : BaseController
    {
        private readonly ITrackingService _trackingService;
        public TrackingController(ITrackingService trackingService)
        {
            _trackingService = trackingService;
        }

        [HttpGet]
        public IActionResult GetAll()

        {
            return CreateResponse(() =>
            {
                var tracking = _trackingService.GetAll();
                return Ok(tracking);
            });
        }

        [HttpGet("{id}")]
        public IActionResult GetByDevice(int id)

        {
            return CreateResponse(() =>
            {
                var tracking = _trackingService.GetByDevice(id);
                return Ok(tracking);
            });
        }

        [HttpDelete("{id}")]
        public IActionResult RemoveRequest(int id)

        {
            return CreateResponse(() =>
            {
                _trackingService.RemoveRequest(id);
                return Ok();
            });
        }


        [HttpPost]
        public IActionResult ActiveDevice([FromBody] TrackingViewModel trackingVM)
        {
            return CreateResponse(() =>
            {

                _trackingService.ActiveDevice(trackingVM);
                return Ok();
            });
        }


        [HttpPost]
        public IActionResult BorrowDevice([FromBody] TrackingViewModel trackingVM)
        {
            return CreateResponse(() =>
            {
               _trackingService.BorrowDevice(trackingVM);
                return Ok();
            });
        }


        [HttpPut("{id}")]
        public IActionResult EndTask(int id)
        {
            return CreateResponse(() =>
            {
                _trackingService.InactiveDevice(id);
                return Ok();
            });
        }

        [HttpPut("{id}")]
        public IActionResult AcceptBorrow(int id, [FromBody] TrackingViewModel trackingVM)
        {
            return CreateResponse(() =>
            {
                _trackingService.AcceptBorrow(id, trackingVM);
                return Ok();
            });
        }

    }
}
